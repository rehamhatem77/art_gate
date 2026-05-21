<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Product;
use App\Models\Admin\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagsController extends Controller
{


   public function index(Request $request)
{
    $query = Tag::query();

    if ($request->filled('search')) {
        $search = $request->search;

        $query->where('name', 'like', "%{$search}%");
    }

    $tags = $query->latest()->get();

    return Inertia::render('Admin/Tags/Index', [
        'tags' => $tags,
        'filters' => [
            'search' => $request->search,
        ],
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        try {
            Tag::create([
                'name' => $request->name,
            ]);

            return back()->with('success', 'تم اضافة تصنيف جديد بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء إضافة التصنيف: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Tag $tag)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);


        try {

            $tag->update([
                'name' => $request->name,
            ]);

            return back()->with('success', 'تم تحديث التصنيف بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث التصنيف: ' . $e->getMessage());
        }
    }

    public function destroy(Tag $tag)
    {
        try {
            $hasProducts = Product::whereJsonContains(
                'tags',
                $tag->id
            )->exists();

            if ($hasProducts) {

                return back()->with(
                    'error',
                    'لا يمكن حذف التصنيف لأن هناك لوحات مرتبطة به'
                );
            }

            $tag->delete();

            return back()->with('success', 'تم حذف التصنيف بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء حذف التصنيف');
        }
    }
}
