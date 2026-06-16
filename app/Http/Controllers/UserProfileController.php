<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Admin\Product;
use App\Models\Admin\ProductVariant;
use App\Models\Order;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

use Inertia\Inertia;
use Inertia\Response;

class UserProfileController extends Controller
{
    public function edit(
        Request $request
    ): Response {

        $user = User::find(Auth::id());
        $user->load('profile');

        $orders = Order::where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(function ($order) {

                $items = collect($order->items)->map(function ($item) {

                    $product = Product::find($item['product_id']);
                    $variant = ProductVariant::find($item['variant_id']);

                    return [
                        'product_id' => $item['product_id'],
                        'variant_id' => $item['variant_id'],

                        'name' => $product?->name,
                        'image' => $product?->main_image,
                        'variant' => $variant ? [
                            'id' => $variant->id,
                            'price' => $variant->price,
                            'stock' => $variant->stock,
                            'size' => $variant->size ?? null,
                            'frame_type' => $variant->frameType?->type ?? null,
                        ] : null,

                        'price' => (float) $item['price'],
                        'quantity' => (int) $item['quantity'],
                        'frame_color_name' => $item['frame_color_name'] ?? null,
                        'frame_color_code' => $item['frame_color_code'] ?? null,

                        // OPTIONAL (better UX)
                        'total' => (float) $item['price'] * (int) $item['quantity'],
                    ];
                });

                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('Y-m-d'),

                    'subtotal' => $order->subtotal,
                    'shipping' => $order->shipping,
                    'total' => $order->total,

                    'payment_method' => $order->payment_method,

                    'address' => $order->address,
                    'phone' => $order->phone,

                    'items' => $items,
                ];
            });

        return Inertia::render(

            'Site/Profile/Profile',

            [

                'user' => $user,
                'profile' => $user->profile,

                'orders' => $orders,

                'mustVerifyEmail'

                => $user

                    instanceof MustVerifyEmail,

                'status'

                => session('status'),

            ]

        );
    }
    public function updateSection(Request $request)
    {
        try {
            $user = $request->user();
            $profile = $user->profile;

            $request->validate([
                'section' => ['required', 'string'],
            ]);

            $section = $request->input('section');

            $allowed = ['personal', 'contact', 'address', 'security'];

            if (!in_array($section, $allowed)) {
                abort(422, 'Invalid section');
            }

            if (!$profile) {
                $profile = $user->profile()->create([]);
            }

            switch ($section) {

                case 'personal':

                    $user->update(
                        $request->validate([
                            'name' => ['required', 'string', 'max:255'],
                        ])
                    );

                    $profile->update(
                        $request->validate([
                            'birth_date' => ['nullable', 'date'],
                            'gender' => ['nullable', 'in:male,female'],
                        ])
                    );

                    if ($request->hasFile('avatar')) {
                        $path = $request->file('avatar')->store('avatars', 'public');

                        $profile->update([
                            'avatar' => $path,
                        ]);
                    }

                    break;

                case 'contact':

                    $profile->update(
                        $request->validate([
                            'phone' => ['required', 'string'],
                            'second_phone' => ['nullable', 'string'],
                            'whatsapp' => ['nullable', 'string'],
                        ])
                    );

                    break;

                case 'address':

                    $profile->update(
                        $request->validate([
                            'country' => ['nullable', 'string'],
                            'governorate' => ['nullable', 'string'],
                            'city' => ['nullable', 'string'],
                            'address' => ['nullable', 'string'],
                            'zip_code' => ['nullable', 'string'],
                        ])
                    );

                    break;

                case 'security':

                    $request->validate([
                        'current_password' => ['required', 'current_password'],
                        'password' => ['required', 'min:8', 'confirmed'],
                    ]);

                    $user->update([
                        'password' => \Illuminate\Support\Facades\Hash::make($request->password),
                    ]);

                    break;
            }

            return back()->with('success', 'تم تحديث البيانات');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ');
        }
    }

    public function destroy(
        Request $request
    ): RedirectResponse {

        $request->validate([

            'password' => [

                'required',

                'current_password',

            ],

        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()
            ->invalidate();

        $request->session()
            ->regenerateToken();

        return Redirect::to('/');
    }
}
