<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\TableauNumber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableauNumbersController extends Controller
{
         public function index(Request $request)
    {
        $tableauNumbers = TableauNumber::latest()->get();

        return Inertia::render('Admin/TableauNumbers/Index', [
            'tableauNumbers' => $tableauNumbers,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tableau_number' => 'required|string|max:255',     
        ]);

try{
        TableauNumber::create([
            'tableau_number' => $request->tableau_number,
        ]);

        return back()->with('success', 'تم اضافة عدد القطع جديد بنجاح');
}
        catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء إضافة عدد القطع: ' . $e->getMessage());
        }
    }

    public function update(Request $request, TableauNumber $tableauNumber)
    {
        $request->validate([
            'tableau_number' => 'required|string|max:255',
        ]);

       
try{

        $tableauNumber->update([
            'tableau_number' => $request->tableau_number,
        ]);

        return back()->with('success', 'تم تحديث عدد القطع بنجاح');
}
        catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث عدد القطع: ' . $e->getMessage());
        }
    }

    public function destroy(TableauNumber $tableauNumber)
    {
try{
if ($tableauNumber->products()->exists()) {

            return back()->with(
                'error',
                'لا يمكن حذف عدد القطع لأن هناك لوحات مرتبطة به'
            );
        }
        

        $tableauNumber->delete();

        return back()->with('success', 'تم حذف عدد القطع بنجاح');
}
        catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء حذف عدد القطع: ' . $e->getMessage());
        }
    }
}
