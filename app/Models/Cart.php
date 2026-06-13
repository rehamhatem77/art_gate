<?php

namespace App\Models;

use App\Models\Admin\Product;
use App\Models\Admin\ProductVariant;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'variant_id',
        'quantity',
        'frame_color_name' ,
    'frame_color_code'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function variant()
{
    return $this->belongsTo(ProductVariant::class);
}
}
