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
        Schema::create('contact_pages', function (Blueprint $table) {
            $table->id();
            // Hero
    $table->string('hero_title')->nullable();
    $table->string('hero_subtitle')->nullable();
    $table->text('hero_description')->nullable();
    $table->string('hero_image')->nullable();

    // Contact Section
    $table->string('contact_title')->nullable();
    $table->text('contact_description')->nullable();

    // Contact Info
    $table->string('phone')->nullable();
    $table->string('email')->nullable();
    $table->string('whatsapp')->nullable();
    $table->string('address')->nullable();

    // Socials
    $table->string('facebook')->nullable();
    $table->string('instagram')->nullable();
    $table->string('pinterest')->nullable();
    $table->string('tiktok')->nullable();
    $table->string('x')->nullable();


    // Map
    $table->string('map_link')->nullable();
    $table->string('map_image')->nullable();

    // Footer Quote
    $table->text('footer_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_pages');
    }
};
