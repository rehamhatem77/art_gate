<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\FrameType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrameTypesController extends Controller
{
            public function index(Request $request)
    {
        $frameTypes = FrameType::latest()->get();

        return Inertia::render('Admin/FrameTypes/Index', [
            'frameTypes' => $frameTypes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|max:255',
            'colors' => 'nullable|array',
        ]);

try{
        FrameType::create([
             'type' => $request->type,
                'colors' => $request->colors,
        ]);

        return back()->with('success', 'تم اضافة نوع إطار جديد بنجاح');
}
        catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء إضافة نوع الإطار: ' . $e->getMessage());
        }
    }

    public function update(Request $request, FrameType $frameType)
    {
        $request->validate([
             'type' => 'required|string|max:255',
            'colors' => 'nullable|array',
        ]);

       
try{

        $frameType->update([
                'type' => $request->type,
                'colors' => $request->colors,
            ]);

        return back()->with('success', 'تم تحديث نوع الإطار بنجاح');
}
        catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث نوع الإطار: ' . $e->getMessage());
        }
    }

    public function destroy(FrameType $frameType)
    {
try{
        if ($frameType->productVariants()->exists()) {

            return back()->with(
                'error',
                'لا يمكن حذف نوع الإطار لأن هناك لوحات مرتبطة به'
            );
        }

        $frameType->delete();

        return back()->with('success', 'تم حذف نوع الإطار بنجاح');
}
        catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء حذف نوع الإطار' );
        }
    }
}
