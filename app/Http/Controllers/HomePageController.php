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
$announcementData=HomePage::query()->select('announcement')->first();
$sliderData=HomePage::query()->select('slider')->first();
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
$aboutSectionData=HomePage::query()->select('about_section_title', 'about_section_subtitle', 'about_section_description', 'about_section_image', 'about_section_video')->first();
$specialSectionData=HomePage::query()->select('special_section_title', 'special_section_subtitle', 'special_section_description', 'special_section_button_text')->first();
$categorySectionData=HomePage::query()->select('category_section_title', 'category_section_subtitle', 'category_section_description')->first();
       $categories = Category::query()
            ->select('id', 'name', 'image', 'icon')
            ->withCount('products')
            ->latest()
            ->get();
            $services = Service::query()->select('id', 'name', 'description', 'icon', 'flag')->where('flag', false)->latest()->get();
        $featuredServices = Service::query()->select('id', 'name', 'description', 'icon', 'flag')->where('flag', true)->latest()->get();
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
        ]);
    }
}
