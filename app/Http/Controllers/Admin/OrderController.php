<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Order;

use App\Models\Admin\Product;

use App\Models\Admin\ProductVariant;

use Illuminate\Http\Request;

use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::query()->with([
            'user.profile',
        ])->latest();

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where(
                    'id',
                    $request->search
                )->orWhere('phone', 'like', "%{$request->search}%")
                    ->orWhere('address', 'like', "%{$request->search}%")
                    ->orWhere('name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%")
                    ->orWhereHas(
                        'user',
                        function ($q) use ($request) {
                            $q->where(
                                'name',
                                'like',
                                "%{$request->search}%"
                            )->orWhere(
                                'email',
                                'like',
                                "%{$request->search}%"
                            );
                        }
                    );
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Status Filter
        |--------------------------------------------------------------------------
        */

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        /*
        |--------------------------------------------------------------------------
        | Orders
        |--------------------------------------------------------------------------
        */

        $orders = $query
            ->paginate(6)
            ->withQueryString()
            ->through(function ($order) {
                $customer = $order->user ? [
                    'authenticated' => true,
                    'id' => $order->user->id,
                    'name' => $order->user->name,
                    'email' => $order->user->email,
                    'phone' => $order->user->profile?->phone,
                    'avatar' => $order->user->profile?->avatar,
                    'second_phone' => $order->user->profile?->second_phone,
                    'country' => $order->user->profile?->country,
                    'governorate' => $order->user->profile?->governorate,
                    'city' => $order->user->profile?->city,
                    'address' => $order->user->profile?->address,
                    'zip_code' => $order->user->profile?->zip_code,
                ]

                    : [

                        'authenticated' => false,
                        'id' => null,
                        'name' => $order->name,
                        'email' => $order->email,
                        'phone' => $order->phone,
                        'second_phone' => $order->second_phone,
                        'country' => $order->country,
                        'governorate' => $order->governorate,
                        'city' => $order->area,
                        'address' => $order->address,
                        'zip_code' => null,
                    ];

                $items = collect($order->items)
                    ->map(function ($item) {
                        $product = Product::find(
                            $item['product_id']
                        );
                        $variant = ProductVariant::find(
                            $item['variant_id']
                        );
                        return [
                            'product_id' => $item['product_id'],
                            'variant_id' => $item['variant_id'],
                            'name' => $product?->name,
                            'image' => $product?->main_image,
                            'quantity' => (int)
                            $item['quantity'],
                            'price' => (float)
                            $item['price'],
                            'total' => (float)$item['price'] * (int)$item['quantity'],
                            'frame_color_name' => $item['frame_color_name'] ?? null,
                            'frame_color_code' => $item['frame_color_code'] ?? null,
                            'variant' => $variant
                                ? [
                                    'id' => $variant->id,
                                    'size' => [
                                        'width' => $variant->size?->width,
                                        'height' => $variant->size?->height,
                                    ],
                                    'frame_type' => $variant->frameType?->type,
                                ] : null,

                        ];
                    });

                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('Y-m-d H:i'),
                    'cancelled_at' => $order->cancelled_at
                        ? \Carbon\Carbon::parse($order->cancelled_at)->format('Y-m-d H:i')
                        : null,
                    'updated_at' => $order->updated_at
                        ? \Carbon\Carbon::parse($order->updated_at)->format('Y-m-d H:i')
                        : null,
                    'subtotal' => $order->subtotal,
                    'shipping' => $order->shipping,
                    'total' => $order->total,
                    'address' => $order->address,
                    'phone' => $order->phone,
                    'payment_method' => $order->payment_method,
                    'notes' => $order->notes,
                    'customer' => $customer,
                    'items' => $items,
                ];
            });

        /*
        |--------------------------------------------------------------------------
        | Statistics
        |--------------------------------------------------------------------------
        */

        $statistics = [

            'total' => Order::count(),
            'pending' => Order::where('status', 'pending')->count(),
            'shipping' => Order::where('status', 'shipping')->count(),
            'completed' => Order::where('status', 'completed')->count(),
            'revenue' => Order::where('status', 'completed')->sum('total'),
        ];
        return Inertia::render(
            'Admin/Orders/Index',
            [
                'orders' => $orders,
                'filters' => [
                    'search' =>
                    $request->search,
                    'status' =>
                    $request->status ?? 'all',
                ],
                'statistics' => $statistics,
            ]

        );
    }

    public function updateStatus(
        Request $request,
        Order $order
    ) {
        $request->validate([
            'status' => [
                'required',
                'in:pending,confirmed,processing,shipping,completed,cancelled',
            ],
        ]);

        $order->update([
            'status' => $request->status,
        ]);
        return back()->with('success', 'تم تحديث حالة الطلب');
    }
}
