<?php

namespace App\Models\Admin;

use App\Models\Wishlist;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
use SoftDeletes;
    //
    protected $fillable = [
        'name',
        'code',
        'slug',
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
        'place' => 'array',
    ];
public function getTagsAttribute($value)
{
    $ids = json_decode($value, true);

    if (!$ids || !is_array($ids)) {
        return [];
    }

    return Tag::whereIn('id', $ids)
        ->select('id', 'name')
        ->get()
        ->toArray();
}
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
    public function wishlists()
{
    return $this->hasMany(Wishlist::class);
}
}
