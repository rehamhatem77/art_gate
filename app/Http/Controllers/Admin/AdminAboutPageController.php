<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\AboutPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminAboutPageController extends Controller
{
    private function about()
    {
        return AboutPage::firstOrCreate([]);
    }

    // ================= INDEX =================
    public function index()
    {
        return Inertia::render('Admin/AboutPage/Index', [
            'about' => $this->about(),
        ]);
    }

    // ================= HERO =================
    public function updateHero(Request $request)
    {
        $data = $request->validate([
            'hero_title' => ['nullable', 'string'],
            'hero_subtitle' => ['nullable', 'string'],
            'hero_description' => ['nullable', 'string'],
            'footer' => ['nullable', 'string'],
        ]);

        $about = $this->about();

        if ($request->hasFile('hero_image')) {
            if ($about->hero_image) {
                Storage::disk('public')->delete($about->hero_image);
            }

            $data['hero_image'] = $request->file('hero_image')
                ->store('about', 'public');
        }

        $about->update($data);

        return back()->with('success', 'تم تحديث الهيرو');
    }

    // ================= VISION & MISSION =================
    public function updateVisionMission(Request $request)
    {
        $data = $request->validate([
             'vision_mission_section_title' => ['nullable', 'string'],
            'vision_title' => ['nullable', 'string'],
            'vision_description' => ['nullable', 'string'],
            'mission_title' => ['nullable', 'string'],
            'mission_description' => ['nullable', 'string'],
        ]);

        $this->about()->update($data);

        return back()->with('success', 'تم تحديث الرؤية والرسالة');
    }

    // ================= STORY =================
    public function updateStory(Request $request)
    {
        $data = $request->validate([
            'story_title' => ['nullable', 'string'],
            'story_subtitle' => ['nullable', 'string'],
            'story_description' => ['nullable', 'string'],
        ]);

        $this->about()->update($data);

        return back()->with('success', 'تم تحديث القصة');
    }

    // ================= VIDEO =================
    public function updateVideo(Request $request)
    {
        $data = $request->validate([
            'video_title' => ['nullable', 'string'],
            'video_subtitle' => ['nullable', 'string'],
            'video_url' => ['nullable', 'string'],
        ]);

        $about = $this->about();

        if ($request->hasFile('video_cover')) {
            if ($about->video_cover) {
                Storage::disk('public')->delete($about->video_cover);
            }

            $data['video_cover'] = $request->file('video_cover')
                ->store('about', 'public');
        }

        $about->update($data);

        return back()->with('success', 'تم تحديث الفيديو');
    }

    // ================= TEAM =================
public function updateTeam(Request $request)
{
    $data = $request->validate([
        'team' => ['nullable', 'string'], // JSON string from frontend
    ]);

    $team = json_decode($data['team'], true) ?? [];

    $finalTeam = [];

    foreach ($team as $index => $member) {

        $imagePath = $member['img'] ?? null;

        // check uploaded file for this member
        if ($request->hasFile("team_images_$index")) {
            $imagePath = $request
                ->file("team_images_$index")
                ->store('about/team', 'public');
        }

        $finalTeam[] = [
            'name' => $member['name'] ?? '',
            'role' => $member['role'] ?? '',
            'img' => $imagePath,
        ];
    }

    $this->about()->update([
        'team' => $finalTeam,
    ]);

    return back()->with('success', 'تم تحديث الفريق');
}


}
