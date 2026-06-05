<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class HomePage extends Model
{
    //
protected $table = 'home_page';
    protected $fillable = [
        'announcement',
        'slider',

        'about_section_title',
        'about_section_subtitle',
        'about_section_description',
        'about_section_image',
        'about_section_video',

        'special_section_title',
        'special_section_subtitle',
        'special_section_description',
        'special_section_button_text',

        'category_section_title',
        'category_section_subtitle',
        'category_section_description',
    ];

    protected $casts = [
        'slider' => 'array',
    ];

    public static function getValue($key)
{
    return self::query()->first()?->$key;
}
}
