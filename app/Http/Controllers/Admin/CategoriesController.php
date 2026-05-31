<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoriesController extends Controller
{

    public function index(Request $request)
    {
        $categories = Category::query()
            ->when($request->search, function ($q, $search) {
                $q->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp',
            'icon' => 'nullable|string',
            'icon_file' => 'nullable|image|mimes:jpg,jpeg,png,webp,svg',
        ]);

        try {

            $imagePath = $request->file('image')->store('categories', 'public');
            if (!$request->icon && !$request->hasFile('icon_file')) {
                return back()->withErrors([
                    'icon' => 'اختر أيقونة أو قم برفع صورة'
                ]);
            }
            if ($request->hasFile('icon_file')) {
                $icon = $request->file('icon_file')
                    ->store('category-icons', 'public');
            } else {
                $icon = $request->icon;
            }

            Category::create([
                'name' => $request->name,
                'image' => $imagePath,
                'icon' => $icon,
            ]);

            return back()->with('success', 'تم اضافة مجموعة تصاميم جديدة بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء إضافة المجموعة: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp',
            'icon' => 'nullable|string',
            'icon_file' => 'nullable|image|mimes:jpg,jpeg,png,webp,svg',
        ]);

        $imagePath = $category->image;
        $icon = $category->icon;
        try {


            if ($request->hasFile('image')) {

                if ($category->image && Storage::disk('public')->exists($category->image)) {
                    Storage::disk('public')->delete($category->image);
                }

                $imagePath = $request->file('image')->store('categories', 'public');
            }


            if (!$request->icon && !$request->hasFile('icon_file') && !$category->icon) {
                return back()->withErrors([
                    'icon' => 'اختر أيقونة أو قم برفع صورة'
                ]);
            }
            if ($request->hasFile('icon_file')) {

                // delete old uploaded icon if it was a file
                if (
                    $category->icon &&
                    !str_contains($category->icon, 'Fi') &&
                    Storage::disk('public')->exists($category->icon)
                ) {
                    Storage::disk('public')->delete($category->icon);
                }

                $icon = $request->file('icon_file')
                    ->store('category-icons', 'public');
            } elseif ($request->filled('icon')) {

                $icon = $request->icon;
            }

            $category->update([
                'name' => $request->name,
                'image' => $imagePath,
                'icon' => $icon,
            ]);

            return back()->with('success', 'تم تحديث المجموعة بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث المجموعة: ' . $e->getMessage());
        }
    }

    public function destroy(Category $category)
    {

        try {
            if ($category->products()->exists()) {

                return back()->with(
                    'error',
                    'لا يمكن حذف المجموعة لأن هناك لوحات مرتبطة بها'
                );
            }
            if ($category->image && Storage::disk('public')->exists($category->image)) {
                Storage::disk('public')->delete($category->image);
            }

            $category->delete();

            return back()->with('success', 'تم حذف المجموعة بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء حذف المجموعة');
        }
    }
}
