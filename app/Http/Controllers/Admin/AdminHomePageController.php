<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\HomePage;
use App\Models\Admin\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminHomePageController extends Controller
{
    private function homepage()
    {
        return HomePage::firstOrCreate([]);
    }

    public function index()
    {
        $products = Product::with('variants')
            ->select(
                'id',
                'name',
                'main_image'
            )
            ->get()
            ->map(function ($product) {

                $minPrice = $product->variants
                    ->min('price');

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'image' => $product->main_image,
                    'price' => $minPrice,
                ];
            });
        return Inertia::render('Admin/HomePage/Index', [
            'homepage' => $this->homepage(),
            'products' => $products,
        ]);
    }

    public function updateAnnouncement(Request $request)
    {
        $data = $request->validate([
            'announcement' => ['nullable', 'string'],
        ]);

        $this->homepage()->update($data);

        return back()->with('success', 'تم تحديث الإعلان');
    }

    public function updateAbout(Request $request)
    {
        $data = $request->validate([
            'about_section_title' => ['nullable', 'string'],
            'about_section_subtitle' => ['nullable', 'string'],
            'about_section_description' => ['nullable', 'string'],
            'about_section_video' => ['nullable', 'string'],
        ]);

        $homepage = $this->homepage();

        if ($request->hasFile('about_section_image')) {
            $homepage->about_section_image && Storage::disk('public')->delete($homepage->about_section_image);
            $data['about_section_image'] = $request
                ->file('about_section_image')
                ->store('homepage', 'public');
        }

        $homepage->update($data);

        return back()->with('success', 'تم تحديث قسم من نحن');
    }

    public function updateSpecial(Request $request)
    {
        $data = $request->validate([
            'special_section_title' => ['nullable', 'string'],
            'special_section_subtitle' => ['nullable', 'string'],
            'special_section_description' => ['nullable', 'string'],
            'special_section_button_text' => ['nullable', 'string'],
        ]);

        $this->homepage()->update($data);

        return back()->with('success', 'تم تحديث القسم المميز');
    }

    public function updateCategory(Request $request)
    {
        $data = $request->validate([
            'category_section_title' => ['nullable', 'string'],
            'category_section_subtitle' => ['nullable', 'string'],
            'category_section_description' => ['nullable', 'string'],
        ]);

        $this->homepage()->update($data);

        return back()->with('success', 'تم تحديث قسم التصنيفات');
    }

    public function updateSlider(Request $request)
    {
        $homepage = $this->homepage();

        $slides = [];

        if ($request->has('slider')) {
            foreach ($request->slider as $index => $slide) {

                $imagePath = $slide['existing_image'] ?? null;

                if ($request->hasFile("slider.$index.image")) {
$homepage->slider && isset($homepage->slider[$index]['image']) && Storage::disk('public')->delete($homepage->slider[$index]['image']);
                    $imagePath = $request
                        ->file("slider.$index.image")
                        ->store('homepage/slides', 'public');
                }

                $slides[] = [
                    'title' => $slide['title'] ?? '',
                    'order' => $slide['order'] ?? 0,
                    'product_id' => $slide['product_id'] ?? null,
                    'image' => $imagePath,
                ];
            }
        }

        $homepage->update([
            'slider' => $slides,
        ]);

        return back()->with('success', 'تم تحديث السلايدر');
    }
}
