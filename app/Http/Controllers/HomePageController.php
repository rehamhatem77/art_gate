<?php

namespace App\Http\Controllers;

use App\Models\Admin\Category;
use App\Models\Admin\HomePage;
use App\Models\Admin\Product;
use App\Models\Admin\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class HomePageController extends Controller
{

    public function index(Request $request)
    {
        $announcementData = HomePage::query()->select('announcement')->first();
        $sliderData = HomePage::query()->select('slider')->first();
        $productIds = collect($sliderData?->slider ?? [])
            ->pluck('product_id')
            ->filter()
            ->unique();

        $products = Product::with('variants')
            ->select('id', 'name', 'main_image')
            ->whereIn('id', $productIds)
            ->get()
            ->mapWithKeys(function ($product) {

                return [
                    $product->id => [
                        'id' => $product->id,
                        'name' => $product->name,
                        'main_image' => $product->main_image,
                        'price' => $product->variants->min('price'),
                    ],
                ];
            });

        $slider = collect($sliderData?->slider ?? [])
            ->map(function ($slide) use ($products) {

                $slide['product'] =
                    $products[$slide['product_id']] ?? null;

                return $slide;
            })
            ->values()
            ->toArray();
        $aboutSectionData = HomePage::query()->select('about_section_title', 'about_section_subtitle', 'about_section_description', 'about_section_image', 'about_section_video')->first();
        $specialSectionData = HomePage::query()->select('special_section_title', 'special_section_subtitle', 'special_section_description', 'special_section_button_text')->first();
        $categorySectionData = HomePage::query()->select('category_section_title', 'category_section_subtitle', 'category_section_description')->first();
        $categories = Category::query()
            ->select('id', 'name', 'image', 'icon')
            ->withCount('products')
            ->latest()
            ->get();
        $services = Service::query()->select('id', 'name', 'description', 'icon', 'flag')->where('flag', false)->latest()->get();
        $featuredServices = Service::query()->select('id', 'name', 'description', 'icon', 'flag')->where('flag', true)->latest()->get();




        $tab = $request->get('tab', 'latest'); // default tab

        // -----------------------------
        // Latest Products
        // -----------------------------
        $latestProducts = Product::with('variants', 'category:id,name', 'images')

            ->latest()
            ->take(4)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'main_image' => $product->main_image,
                    'price' => $product->variants->min('price'),
                    'category' => $product->category,
                    'tags' => $product->tags,
                    'images' => $product->images->map(function ($image) {
                        return [
                            'id' => $image->id,
                            'image' => $image->image,
                        ];
                    }),
                ];
            });

        // -----------------------------
        // Top 2 Categories with most products
        // -----------------------------
        $topCategories = Category::query()
            ->select('id', 'name', 'image', 'icon')
            ->withCount('products')
            ->orderByDesc('products_count')
            ->take(2)
            ->get();

        $categoryTabs = $topCategories->map(function ($cat) {
            return [
                'id' => $cat->id,
                'name' => $cat->name,
                'key' => 'category_' . $cat->id,
            ];
        });

        // (optional) products per top category
        $categoryProducts = Category::with([
            'products' => function ($q) {
                $q->with([
                    'category:id,name',
                    'images',
                    'variants:id,product_id,price',
                ])
                    ->latest()
                    ->take(4);
            }
        ])
            ->whereIn('id', $topCategories->pluck('id'))
            ->get()
            ->map(function ($cat) {
                return [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'key' => 'category_' . $cat->id,
                    'products' => $cat->products->map(function ($product) {
                        return [
                            'id' => $product->id,
                            'name' => $product->name,
                            'main_image' => $product->main_image,

                            'category' => $product->category
                                ? [
                                    'id' => $product->category->id,
                                    'name' => $product->category->name,
                                ]
                                : null,

                            'images' => $product->images->map(function ($image) {
                                return [
                                    'id' => $image->id,
                                    'image' => $image->image,
                                ];
                            }),

                            'tags' => $product->tags,

                            'price' => $product->variants->min('price'),
                        ];
                    }),
                ];
            });


        return Inertia::render('Welcome', [
            'canLogin'       => Route::has('login'),
            'canRegister'    => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion'     => PHP_VERSION,
            'categories'     => $categories,
            'services'       => $services,
            'featuredServices' => $featuredServices,
            'homePageData' => [
                'announcement' => $announcementData ? $announcementData->announcement : null,
                'slider' => $slider,
                'aboutSection' => $aboutSectionData,
                'specialSection' => $specialSectionData,
                'categorySection' => $categorySectionData,
            ],


            'tab' => $tab,

            'latestProducts' => $latestProducts,
            'topCategories' => $topCategories,
            'categoryProducts' => $categoryProducts,
            'categoryTabs'  => $categoryTabs,
        ]);
    }
}
