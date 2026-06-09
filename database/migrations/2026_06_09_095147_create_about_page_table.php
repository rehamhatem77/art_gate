<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('about_page', function (Blueprint $table) {
            $table->id();
             // ================= HERO SECTION =================
            $table->string('hero_title')->nullable();
            $table->string('hero_subtitle')->nullable();
            $table->text('hero_description')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('footer')->nullable();


            // ================= VISION & MISSION =================
            $table->string('vision_mission_section_title')->nullable();
            $table->string('vision_title')->nullable();
            $table->text('vision_description')->nullable();

            $table->string('mission_title')->nullable();
            $table->text('mission_description')->nullable();

            // ================= ABOUT / STORY SECTION =================
            $table->string('story_title')->nullable();
            $table->string('story_subtitle')->nullable();
            $table->text('story_description')->nullable();

            // ================= VIDEO SECTION =================
            $table->string('video_title')->nullable();
            $table->string('video_subtitle')->nullable();
            $table->string('video_cover')->nullable();
            $table->string('video_url')->nullable();

            // ================= TEAM =================
            $table->json('team')->nullable();

            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_page');
    }
};
