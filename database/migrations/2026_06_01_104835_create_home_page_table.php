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
        Schema::create('home_page', function (Blueprint $table) {
            $table->id();
            $table->string('announcement')->nullable();
            $table->json('slider')->nullable();

            $table->string('about_section_title')->nullable();
            $table->string('about_section_subtitle')->nullable();
            $table->text('about_section_description')->nullable();
            $table->string('about_section_image')->nullable();
            $table->string('about_section_video')->nullable();

            $table->string('special_section_title')->nullable();
            $table->string('special_section_subtitle')->nullable();
            $table->text('special_section_description')->nullable();
            $table->string('special_section_button_text')->nullable();

            $table->string('category_section_title')->nullable();
            $table->string('category_section_subtitle')->nullable();
            $table->text('category_section_description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_page');
    }
};
