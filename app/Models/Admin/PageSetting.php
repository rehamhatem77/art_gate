<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class PageSetting extends Model
{
    //
    protected $fillable = [
        'page_key',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
    ];
}
