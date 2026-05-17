<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
     protected $fillable = [
        'name',
        'code',
        'description',
        'category_id',
        'shape_id',
        'tags',
        'design_colors',
        'artistic_type',
        'place',
        'pieces_count',
        'main_image',
        'is_active',
        'featured',
    ];
     protected $casts = [
        'tags' => 'array',
        'design_colors' => 'array',
        'is_active' => 'boolean',
        'featured' => 'boolean',
    ];
     public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function shape()
    {
        return $this->belongsTo(Shape::class);
    }
     public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function variants()
{
    return $this->hasMany(ProductVariant::class);
}
}
