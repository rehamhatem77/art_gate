<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Category;
use App\Models\Admin\Product;
use App\Models\Admin\ProductVariant;
use App\Models\Admin\Tag;
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
        | PRODUCTS CREATED PER MONTH
        |--------------------------------------------------------------------------
        */

        $productsPerMonth = Product::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(*) as total')
            )
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $months = [
            1 => 'يناير',
            2 => 'فبراير',
            3 => 'مارس',
            4 => 'أبريل',
            5 => 'مايو',
            6 => 'يونيو',
            7 => 'يوليو',
            8 => 'أغسطس',
            9 => 'سبتمبر',
            10 => 'أكتوبر',
            11 => 'نوفمبر',
            12 => 'ديسمبر',
        ];

        $chartData = collect(range(1, 12))->map(function ($month) use (
            $productsPerMonth,
            $months
        ) {
            $found = $productsPerMonth->firstWhere('month', $month);

            return [
                'month' => $months[$month],
                'total' => $found ? $found->total : 0,
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

            'chartData' => $chartData,

            'recentActivities' => $recentProducts,
        ]);
    }
}