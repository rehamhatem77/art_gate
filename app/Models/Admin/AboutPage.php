<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class AboutPage extends Model
{
    //
        protected $table = 'about_page';

    protected $fillable = [
        // HERO
        'hero_title',
        'hero_subtitle',
        'hero_description',
        'hero_image',
        'footer',

        // VISION & MISSION
        'vision_mission_section_title',
        'vision_title',
        'vision_description',
        'mission_title',
        'mission_description',

        // STORY
        'story_title',
        'story_subtitle',
        'story_description',

        // VIDEO
        'video_title',
        'video_subtitle',
        'video_cover',
        'video_url',

        // TEAM
        'team',
    ];

    protected $casts = [
        'team' => 'array',
    ];
}
