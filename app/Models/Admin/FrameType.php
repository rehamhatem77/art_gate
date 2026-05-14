<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class FrameType extends Model
{
    protected $fillable = ['type', 'colors'];
  
    protected $casts = [
        'colors' => 'array',
    ];

}
