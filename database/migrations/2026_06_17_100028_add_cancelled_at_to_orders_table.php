<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('orders', function ($table) {

        $table->timestamp('cancelled_at')
              ->nullable()
              ->after('status');

    });
}

public function down()
{
    Schema::table('orders', function ($table) {

        $table->dropColumn('cancelled_at');

    });
}
};
