<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactPage extends Model
{
    //
       use HasFactory;

    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'hero_description',
        'hero_image',

        'contact_title',
        'contact_description',

        'phone',
        'email',
        'whatsapp',
        'address',

        'facebook',
        'instagram',
        'pinterest',
        'tiktok',
        'x',

        'map_link',
        'map_image',

        'footer_description',
    ];
}
