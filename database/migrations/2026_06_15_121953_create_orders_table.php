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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('name');

            $table->string('email')
                ->nullable();

            $table->string('phone');

            $table->string('second_phone')
                ->nullable();

            $table->string('country');

            $table->string('governorate');

            $table->string('area');

            $table->text('address');

            $table->text('notes')
                ->nullable();

            $table->decimal(
                'subtotal',
                10,
                2
            );

            $table->decimal(
                'shipping',
                10,
                2
            );

            $table->decimal(
                'total',
                10,
                2
            );

            $table->string('payment_method')
                ->default('cod');

            $table->string('status')
                ->default('pending');

            $table->json('items');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
