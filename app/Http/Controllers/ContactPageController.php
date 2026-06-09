<?php

namespace App\Http\Controllers;

use App\Models\Admin\ContactPage;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactPageController extends Controller
{
    //
   public function index(){
  
         $contactPage = ContactPage::first();

        return Inertia::render('Site/ContactUs/Contact', [

            'hero' => [
                'title' => $contactPage?->hero_title,
                'subtitle' => $contactPage?->hero_subtitle,
                'description' => $contactPage?->hero_description,
                'image' => $contactPage?->hero_image,
                'whatsapp' => $contactPage?->whatsapp,
            ],

            'contactInfo' => [
                'title' => $contactPage?->contact_title,
                'description' => $contactPage?->contact_description,

                'phone' => $contactPage?->phone,
                'email' => $contactPage?->email,
                'whatsapp' => $contactPage?->whatsapp,
                'address' => $contactPage?->address,

                'facebook' => $contactPage?->facebook,
                'instagram' => $contactPage?->instagram,
                'pinterest' => $contactPage?->pinterest,
                'tiktok' => $contactPage?->tiktok,
                'x' => $contactPage?->x,
            ],

            'map' => [
                'image' => $contactPage?->map_image,
                'link' => $contactPage?->map_link,
            ],

            // 'footer' => [
            //     'description' => $contactPage?->footer_description,
            //     'facebook' => $contactPage?->facebook,
            //     'instagram' => $contactPage?->instagram,
            //     'pinterest' => $contactPage?->pinterest,
            //     'tiktok' => $contactPage?->tiktok,
            //     'x' => $contactPage?->x,
            //     'phone' => $contactPage?->phone,
            //     'email' => $contactPage?->email,
            //     'whatsapp' => $contactPage?->whatsapp,
            //     'address' => $contactPage?->address,

            // ],
        ]);
    }

     public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'phone'   => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return redirect()->back();
    }
}
