<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Category;
use App\Models\Admin\Product;
use App\Models\Admin\ProductVariant;
use App\Models\Admin\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /*
        |--------------------------------------------------------------------------
        | MAIN STATS
        |--------------------------------------------------------------------------
        */

        $productsCount = Product::count();

        $activeProducts = Product::where('is_active', true)->count();

        $featuredProducts = Product::where('featured', true)->count();

        $categoriesCount = Category::count();

        $tagsCount = Tag::count();

        $variantsCount = ProductVariant::count();

        /*
        |--------------------------------------------------------------------------
        | LOW STOCK PRODUCTS
        |--------------------------------------------------------------------------
        */

        $lowStockProducts = ProductVariant::with([
            'product',
            'size',
            'frameType',
        ])
            ->where('stock', '<=', 5)
            ->orderBy('stock')
            ->take(5)
            ->get();

        /*
        |--------------------------------------------------------------------------
        | LATEST PRODUCTS
        |--------------------------------------------------------------------------
        */

        $latestProducts = Product::with([
            'category',
            'images',
        ])
            ->latest()
            ->take(4)
            ->get();

        /*
        |--------------------------------------------------------------------------
        | CATEGORY ANALYTICS
        |--------------------------------------------------------------------------
        */

        $categoryAnalytics = Category::withCount('products')
            ->orderByDesc('products_count')
            ->take(6)
            ->get()
            ->map(function ($category) {
                return [
                    'name' => $category->name,
                    'count' => $category->products_count,
                ];
            });

        /*
        |--------------------------------------------------------------------------
        |  USERS
        |--------------------------------------------------------------------------
        */

        $users = User::latest()

            ->take(20)

            ->get()

            ->map(function ($user) {

                return [

                    'id' => $user->id,

                    'name' => $user->name,

                    'email' => $user->email,

                    'role' => $user->role,

                    'joined_at' =>

                    $user->created_at->format(
                        'd M Y'
                    ),

                    'joined_since' =>

                    $user->created_at
                        ->diffForHumans(),
                ];
            });

        /*
        |--------------------------------------------------------------------------
        | RECENT ACTIVITY
        |--------------------------------------------------------------------------
        */

        $recentProducts = Product::latest()
            ->take(5)
            ->get()
            ->map(function ($product) {
                return [
                    'title' => 'تم إضافة لوحة جديدة',
                    'description' => $product->name,
                    'date' => $product->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => [
                'productsCount' => $productsCount,
                'activeProducts' => $activeProducts,
                'featuredProducts' => $featuredProducts,
                'categoriesCount' => $categoriesCount,
                'tagsCount' => $tagsCount,
                'variantsCount' => $variantsCount,
            ],

            'latestProducts' => $latestProducts,

            'lowStockProducts' => $lowStockProducts,

            'categoryAnalytics' => $categoryAnalytics,

            'users' => $users,

            'recentActivities' => $recentProducts,
        ]);
    }
    public function changeRole(
        Request $request,

        User $user
    ) {

        $request->validate([

            'role' => [

                'required',

                'in:user,admin',
            ],
        ]);

        $user->update([

            'role' => $request->role,
        ]);

        return back()->with([

            'success' =>

            'تم تحديث الصلاحية',
        ]);
    }
}
