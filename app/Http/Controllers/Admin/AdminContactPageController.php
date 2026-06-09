<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\ContactPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminContactPageController extends Controller
{
    private function contact()
    {
        return ContactPage::firstOrCreate([]);
    }

    public function index()
    {
        return Inertia::render(
            'Admin/ContactPage/Index',
            [
                'contact' => $this->contact(),
            ]
        );
    }

    // ================= HERO =================

    public function updateHero(Request $request)
    {
        $data = $request->validate([
            'hero_title' => ['nullable', 'string'],
            'hero_subtitle' => ['nullable', 'string'],
            'hero_description' => ['nullable', 'string'],
        ]);

        $contact = $this->contact();

        if ($request->hasFile('hero_image')) {

            if ($contact->hero_image) {
                Storage::disk('public')
                    ->delete($contact->hero_image);
            }

            $data['hero_image'] =
                $request->file('hero_image')
                    ->store('contact', 'public');
        }

        $contact->update($data);

        return back();
    }

    // ================= CONTACT INFO =================

    public function updateInfo(Request $request)
    {
        $data = $request->validate([
            'contact_title' => ['nullable', 'string'],
            'contact_description' => ['nullable', 'string'],

            'phone' => ['nullable', 'string'],
            'email' => ['nullable', 'string'],
            'whatsapp' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],

            'facebook' => ['nullable', 'string'],
            'instagram' => ['nullable', 'string'],
            'pinterest' => ['nullable', 'string'],
            'tiktok' => ['nullable', 'string'],
            'x' => ['nullable', 'string'],

            'footer_description' => ['nullable', 'string'],
        ]);

        $this->contact()->update($data);

        return back();
    }

    // ================= MAP =================

    public function updateMap(Request $request)
    {
        $data = $request->validate([
            'map_link' => ['nullable', 'string'],
        ]);

        $contact = $this->contact();

        if ($request->hasFile('map_image')) {

            if ($contact->map_image) {
                Storage::disk('public')
                    ->delete($contact->map_image);
            }

            $data['map_image'] =
                $request->file('map_image')
                    ->store('contact', 'public');
        }

        $contact->update($data);

        return back();
    }
}