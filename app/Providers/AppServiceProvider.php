<?php

namespace App\Providers;

use App\Models\Admin\HomePage;
use App\Models\Admin\Service;
use App\Models\Cart;
use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            'auth' => fn() => [
                'user' => Auth::check()
                    ? User::with('profile')->find(Auth::id())
                    : null,
            ],
            'flash' => fn() => [
                'success' => session('success'),
                'error' => session('error'),
            ],
            'announcement' => fn() => HomePage::getValue('announcement'),

            'services' => fn() => cache()->remember('global_services', 3600, function () {
                return HomePage::getValue('services')
                    ?? Service::where('flag', false)
                    ->select('id', 'name', 'description', 'icon', 'flag')
                    ->get();
            }),
            'footer' => fn() => cache()->remember('global_footer', 3600, function () {
                $contact = \App\Models\Admin\ContactPage::first();

                return [
                    'description' => $contact?->footer_description,
                    'facebook'    => $contact?->facebook,
                    'instagram'   => $contact?->instagram,
                    'pinterest'   => $contact?->pinterest,
                    'tiktok'      => $contact?->tiktok,
                    'x'            => $contact?->x,
                    'phone'       => $contact?->phone,
                    'email'       => $contact?->email,
                    'whatsapp'    => $contact?->whatsapp,
                    'address'     => $contact?->address,
                ];
            }),
            'wishlistCount' => fn() =>
            Auth::check()
                ? Wishlist::where('user_id', Auth::id())->count()
                : 0,

            'cartCount' => fn() => Auth::check()
                ? Cart::where('user_id', Auth::id())
                ->sum('quantity')
                : 0,
        ]);
    }
}
