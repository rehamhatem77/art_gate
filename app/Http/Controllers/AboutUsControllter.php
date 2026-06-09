<?php

namespace App\Http\Controllers;

use App\Models\Admin\AboutPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutUsControllter extends Controller
{
    public function index()
    {
        $about = AboutPage::first();

        return Inertia::render('Site/AboutUs/About', [
            'aboutPage' => [
                // ================= HERO =================
                'hero' => [
                    'title' => $about?->hero_title,
                    'subtitle' => $about?->hero_subtitle,
                    'description' => $about?->hero_description,
                    'image' => $about?->hero_image,
                    'footer' => $about?->footer,
                ],

                // ================= VISION & MISSION =================
                'visionMission' => [
                    'section_title' => $about?->vision_mission_section_title,

                    'vision' => [
                        'title' => $about?->vision_title,
                        'description' => $about?->vision_description,
                    ],

                    'mission' => [
                        'title' => $about?->mission_title,
                        'description' => $about?->mission_description,
                    ],
                ],

                // ================= STORY =================
                'story' => [
                    'title' => $about?->story_title,
                    'subtitle' => $about?->story_subtitle,
                    'description' => $about?->story_description,
                ],

                // ================= VIDEO =================
                'video' => [
                    'title' => $about?->video_title,
                    'subtitle' => $about?->video_subtitle,
                    'cover' => $about?->video_cover,
                    'url' => $about?->video_url,
                ],

                // ================= TEAM =================
                'team' => collect($about?->team ?? [])->map(function ($member) {
                    return [
                        'name' => $member['name'] ?? null,
                        'role' => $member['role'] ?? null,
                        'img'  => $member['img'] ?? null,
                    ];
                })->values(),

            ],
        ]);
    }
}