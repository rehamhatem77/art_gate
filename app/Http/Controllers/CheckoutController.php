<?php

namespace App\Http\Controllers;

use App\Models\Admin\ProductVariant;
use App\Models\Cart;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller


{
    public function index(Request $request)
    {
        if (Auth::check()) {

            $cartItems = Cart::with([
                'product',
                'variant',
            ])
                ->where(
                    'user_id',
                    Auth::id()
                )
                ->get()
                ->map(function ($item) {

                    return [

                        'product_id' => $item->product_id,

                        'variant_id' => $item->variant_id,

                        'name' => $item->product->name,

                        'image' => $item->product->main_image,

                        'price' => $item->variant->price,

                        'quantity' => $item->quantity,

                        'size' => $item->variant->size?->label,

                        'frame' => $item->variant->frame?->type,

                        'frame_color_name'
                        => $item->frame_color_name,

                        'frame_color_code'
                        => $item->frame_color_code,

                    ];
                });
        } else {

            $cartItems = collect(
                session(
                    'checkout_items',
                    []
                )
            );
        }

        $subtotal = $cartItems->sum(

            fn($item)

            => $item['price']

                * $item['quantity']

        );

        $shipping = 100;
        $user = User::find(Auth::id());
if (Auth::check()) {
        $user->load('profile');}

        return Inertia::render(

            'Site/Checkout/Index',

            [

                // 'user' => Auth::user(),
                'user' => $user,
                'cartItems'
                => $cartItems,

                'subtotal'
                => $subtotal,

                'shipping'
                => $shipping,

            ]

        );
    }

    public function sync(Request $request)
    {
        session([

            'checkout_items'

            => $request->items

        ]);

        return back();
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|string|max:20',
            'second_phone' => 'nullable|string|max:20',
            'country' => 'required',
            'governorate' => 'required',
            'area' => 'required',
            'address' => 'required',
            'notes' => 'nullable',
            'payment' => 'required',
        ]);

        $items = Auth::check()
            ? Cart::with(['product', 'variant'])
            ->where('user_id', Auth::id())
            ->get()
            ->map(fn($item) => [
                'product_id' => $item->product_id,
                'variant_id' => $item->variant_id,
                'name' => $item->product->name,
                'price' => $item->variant->price,
                'quantity' => $item->quantity,
                'frame_color_name'
                => $item->frame_color_name,

                'frame_color_code'
                => $item->frame_color_code,
            ])
            : collect(session('checkout_items', []));

        if ($items->isEmpty()) {
            return back()->with([
                'error',
                'السلة فارغة'
            ]);
        }

        return DB::transaction(function () use ($items, $validated) {

            $stockErrors = [];

            // =========================
            // 1. STOCK VALIDATION
            // =========================
            foreach ($items as $item) {

                $variant = ProductVariant::where('id', $item['variant_id'])
                    ->lockForUpdate()
                    ->first();

                if (!$variant) {
                    $stockErrors[] = "المنتج غير موجود";
                    continue;
                }

                if ($variant->stock < $item['quantity']) {
                    $stockErrors[] = "الكمية غير متوفرة للمنتج: {$item['name']} (المتاح: {$variant->stock})";
                }
            }

            if (!empty($stockErrors)) {
                return back()->with([
                    'error' => $stockErrors
                ]);
            }

            // =========================
            // 2. CREATE ORDER
            // =========================
            $subtotal = $items->sum(
                fn($item) =>
                $item['price'] * $item['quantity']
            );

            $shipping = 100;
            $total = $subtotal + $shipping;

            $order = Order::create([
                'user_id' => Auth::id(),
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'second_phone' => $validated['second_phone'],
                'country' => $validated['country'],
                'governorate' => $validated['governorate'],
                'area' => $validated['area'],
                'address' => $validated['address'],
                'notes' => $validated['notes'],
                'subtotal' => $subtotal,
                'shipping' => $shipping,
                'total' => $total,
                'payment_method' => 'cod',
                'status' => 'pending',
                'items' => $items,
            ]);

            // =========================
            // 3. REDUCE STOCK
            // =========================
            foreach ($items as $item) {

                $variant = ProductVariant::where('id', $item['variant_id'])
                    ->lockForUpdate()
                    ->first();

                $variant->decrement('stock', $item['quantity']);
            }

            // =========================
            // 4. CLEAR CART
            // =========================
            if (Auth::check()) {
                Cart::where('user_id', Auth::id())->delete();
            }

            session()->forget('checkout_items');

            return redirect()
                ->route('order.success', $order->id);
        });
    }

    public function success(Order $order)
    {
        return Inertia::render('Site/Checkout/Success', [
            'order' => $order
        ]);
    }
}
