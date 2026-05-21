<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Shape;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShapesController extends Controller
{
    public function index(Request $request)
    {
        $query = Shape::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where('shape', 'like', "%{$search}%");
        }
        $shapes = $query->latest()->get();

        return Inertia::render('Admin/Shapes/Index', [
            'shapes' => $shapes,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shape' => 'required|string|max:255',
        ]);

        try {
            Shape::create([
                'shape' => $request->shape,
            ]);

            return back()->with('success', 'تم اضافة شكل تابلوه جديد بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء إضافة الشكل: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Shape $shape)
    {
        $request->validate([
            'shape' => 'required|string|max:255',
        ]);


        try {

            $shape->update([
                'shape' => $request->shape,
            ]);

            return back()->with('success', 'تم تحديث الشكل بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث الشكل: ' . $e->getMessage());
        }
    }

    public function destroy(Shape $shape)
    {
        try {

            if ($shape->products()->exists()) {

                return back()->with(
                    'error',
                    'لا يمكن حذف الشكل لأن هناك لوحات مرتبطة به'
                );
            }

            $shape->delete();

            return back()->with('success', 'تم حذف الشكل بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء حذف الشكل');
        }
    }
}
