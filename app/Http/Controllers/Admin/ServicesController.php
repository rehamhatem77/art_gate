<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServicesController extends Controller
{
    /**
     * Display all services
     */
    public function index(Request $request)
    {
        $services = Service::query()
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->get();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Store a new service
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'flag' => ['boolean'],
            'icon' => ['nullable', 'string'],
            'icon_file' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp'
            ],
        ]);

        if (!$request->icon && !$request->hasFile('icon_file')) {
            return back()->withErrors([
                'icon' => 'يرجى اختيار أيقونة أو رفع صورة'
            ]);
        }
        if ($request->flag && !$request->filled('description')) {
    return back()->withErrors([
        'description' => 'وصف الخدمة مطلوب عند تفعيل العرض في الصفحة الرئيسية'
    ]);
}
        

        try {

            if ($request->hasFile('icon_file')) {
                $icon = $request->file('icon_file')
                    ->store('service-icons', 'public');
            } else {
                $icon = $request->icon;
            }

            Service::create([
                'name' => $request->name,
                'description' => $request->description,
                'icon' => $icon,
                'flag' => $request->flag,
            ]);

            return back()->with(
                'success',
                'تم إضافة الخدمة بنجاح'
            );
        } catch (\Exception $e) {

            return back()->with(
                'error',
                'حدث خطأ أثناء إضافة الخدمة'
            );
        }
    }

    /**
     * Update a service
     */
    public function update(Request $request, Service $service)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'flag' => ['boolean'],
            'icon' => ['nullable', 'string'],
            'icon_file' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp'
            ],
        ]);

        $icon = $service->icon;

        try {

            if ($request->hasFile('icon_file')) {

                if (
                    $service->icon &&
                    Storage::disk('public')->exists($service->icon)
                ) {
                    Storage::disk('public')
                        ->delete($service->icon);
                }

                $icon = $request->file('icon_file')
                    ->store('service-icons', 'public');
            } elseif ($request->filled('icon')) {

                if (
                    $service->icon &&
                    Storage::disk('public')->exists($service->icon)
                ) {
                    Storage::disk('public')
                        ->delete($service->icon);
                }

                $icon = $request->icon;
            }
            if ($request->flag && !$request->filled('description')) {
    return back()->withErrors([
        'description' => 'وصف الخدمة مطلوب عند تفعيل العرض في الصفحة الرئيسية'
    ]);
}

            $service->update([
                'name' => $request->name,
                'description' => $request->description,
                'icon' => $icon,
                'flag' => $request->flag,
            ]);

            return back()->with(
                'success',
                'تم تحديث الخدمة بنجاح'
            );
        } catch (\Exception $e) {

            return back()->with(
                'error',
                'حدث خطأ أثناء تحديث الخدمة'
            );
        }
    }

    /**
     * Delete a service
     */
    public function destroy(Service $service)
    {
        try {

            if (
                $service->icon &&
                Storage::disk('public')->exists($service->icon)
            ) {
                Storage::disk('public')
                    ->delete($service->icon);
            }

            $service->delete();

            return back()->with(
                'success',
                'تم حذف الخدمة بنجاح'
            );
        } catch (\Exception $e) {

            return back()->with(
                'error',
                'حدث خطأ أثناء حذف الخدمة'
            );
        }
    }
}