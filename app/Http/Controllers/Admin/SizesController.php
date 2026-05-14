<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Size;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SizesController extends Controller
{
        public function index(Request $request)
    {
        $sizes = Size::latest()->get();

        return Inertia::render('Admin/Sizes/Index', [
            'sizes' => $sizes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'width' => 'required|integer|min:1',
            'height' => 'required|integer|min:1',  
        ]);

try{
        Size::create([
             'width' => $request->width,
                'height' => $request->height,
        ]);

        return back()->with('success', 'تم اضافة مقاس جديد بنجاح');
}
        catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء إضافة المقاس: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Size $size)
    {
        $request->validate([
             'width' => 'required|integer|min:1',
            'height' => 'required|integer|min:1',
        ]);

       
try{

        $size->update([
                'width' => $request->width,
                'height' => $request->height,
            ]);

        return back()->with('success', 'تم تحديث المقاس بنجاح');
}
        catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث المقاس: ' . $e->getMessage());
        }
    }

    public function destroy(Size $size)
    {
try{
        

        $size->delete();

        return back()->with('success', 'تم حذف المقاس بنجاح');
}
        catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء حذف المقاس: ' . $e->getMessage());
        }
    }
}
