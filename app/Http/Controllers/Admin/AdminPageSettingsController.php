<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\PageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminPageSettingsController extends Controller
{
    //
    private function page($key)
    {
        return PageSetting::firstOrCreate([
            'page_key' => $key,
        ]);
    }

    public function index()
    {
        return Inertia::render('Admin/PageSettings/Index', [
            'pages' => [
                $this->page('shop'),
                $this->page('cart'),
                $this->page('wishlist'),
                $this->page('account'),
                $this->page('search'),
                $this->page('shipping'),
            ],
        ]);
    }

    public function update(Request $request, $key)
    {
        $page = $this->page($key);

        $data = $request->all();

        // handle bg image upload
        if ($request->hasFile('bg_image')) {
            if (!empty($page->data['bg_image'])) {
                Storage::disk('public')->delete($page->data['bg_image']);
            }

            $data['bg_image'] = $request->file('bg_image')->store("pages/$key", 'public');
        }

        // merge existing JSON
        $page->update([
            'data' => array_merge($page->data ?? [], $data),
        ]);

        return back()->with('success', 'تم التحديث بنجاح');
    }
}
