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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
             $table->string('name');

    $table->string('code')->unique();

    $table->text('description')->nullable();

    $table->foreignId('category_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();

        $table->string('main_image')->nullable();

        $table->string('slug')->unique();

        $table->foreignId('shape_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();

        $table->json('tags')->nullable();

        $table->json('design_colors')->nullable();




         $table->enum('artistic_type', [
        'مودرن',
        'كلاسيك',
        'إسلامي',
        'فاخر',
        'مينيمال',
        'تجريدي',
    ])->nullable();

     $table->json('place')->nullable();

     $table->enum('pieces_count', [
        'تابلوه واحد',
        '2 تابلوه',
        '3 تابلوه',
        '4 تابلوه',
        '5 تابلوه',
    ])->default('تابلوه واحد');

     $table->boolean('is_active')->default(true);

    $table->boolean('featured')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
