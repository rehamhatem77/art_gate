<?php

namespace App\Http\Controllers;

use App\Models\Admin\Product;
use App\Models\Admin\ProductVariant;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    //
    public function index()
    {
        $cartItems = Cart::with([
            'product.images',
            'variant.size',
            'variant.frameType'
        ])
            ->where('user_id', Auth::id())
            ->get()
            ->map(function ($item) {

                return [
                    'id' => $item->id,

                    'quantity' => $item->quantity,
                    'frame_color' => [
                        'name' => $item->frame_color_name,
                        'code' => $item->frame_color_code,
                    ],

                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'slug' => $item->product->slug,
                        'image' => $item->product->main_image,
                    ],

                    'variant' => [
                        'id' => $item->variant->id,

                        'price' => $item->variant->price,

                        'stock' => $item->variant->stock,

                        'size' => [
                            'id' => $item->variant->size->id,

                            'label' =>
                            $item->variant->size->width .
                                ' × ' .
                                $item->variant->size->height,
                        ],

                        'frame' => [
                            'id' => $item->variant->frameType->id,

                            'type' =>
                            $item->variant->frameType->type,
                        ],

                    ],
                ];
            });

        return Inertia::render(
            'Site/Cart/Index',
            [
                'cartItems' => $cartItems,
            ]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'variant_id' => ['required', 'exists:product_variants,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'frame_color_name' => ['nullable', 'string'],
            'frame_color_code' => ['nullable', 'string'],
        ]);

        $variant = ProductVariant::findOrFail(
            $request->variant_id
        );

        $cartItem = Cart::firstOrNew([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
            'variant_id' => $request->variant_id,
            'frame_color_name' => $request->frame_color_name,
            'frame_color_code' => $request->frame_color_code,
        ]);

        $newQuantity =
            ($cartItem->quantity ?? 0)
            + $request->quantity;

        if ($newQuantity > $variant->stock) {
            return back()->withErrors([
                'message' =>
                "المتاح فقط {$variant->stock} قطعة"
            ]);
        }

        $cartItem->quantity = $newQuantity;

        $cartItem->save();

        return back()->with([
            'success' =>
            'تمت إضافة المنتج إلى السلة'
        ]);
    }
    public function update(Request $request, Cart $cart)
    {
        $request->validate([
            'quantity' => ['required', 'integer', 'min:1']
        ]);

        if ($cart->user_id !== Auth::id()) {
            abort(403);
        }

        if (
            $request->quantity >
            $cart->variant->stock
        ) {
            return back()->withErrors([
                'message' =>
                "المتاح فقط {$cart->variant->stock} قطعة"
            ]);
        }

        $cart->update([
            'quantity' => $request->quantity
        ]);

        return back();
    }
    public function destroy(Cart $cart)
    {
        if ($cart->user_id !== Auth::id()) {
            abort(403);
        }

        $cart->delete();

        return back()->with([
            'success' =>
            'تم حذف المنتج من السلة'
        ]);
    }

    public function mergeCart(array $guestCart)
    {
        foreach ($guestCart as $item) {

            $product = Product::find($item['id']);

            if (!$product) {
                continue;
            }

            $quantity = min(
                $item['quantity'],
                $product->quantity
            );

            Cart::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'product_id' => $product->id
                ],
                [
                    'quantity' => $quantity
                ]
            );
        }
    }
}
