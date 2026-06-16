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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->unique()
                ->constrained()
                ->cascadeOnDelete();

            $table->string('phone')->nullable();

            $table->string('second_phone')->nullable();

            $table->date('birth_date')->nullable();

            $table->enum(
                'gender',

                [
                    'male',

                    'female',
                ]

            )->nullable();

            $table->string('country')
                ->default('مصر');

            $table->string('governorate')
                ->nullable();

            $table->string('city')
                ->nullable();

            $table->string('zip_code')
                ->nullable();

            $table->string('company')
                ->nullable();

            $table->text('address')
                ->nullable();

            $table->string('avatar')
                ->nullable();

            $table->text('notes')
                ->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
