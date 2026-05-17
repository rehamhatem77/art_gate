<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
     protected $fillable = [
        'product_id',
        'size_id',
        'frame_type_id',
        'price',
        'stock',
        'image',
    ];

    public function product()
{
    return $this->belongsTo(Product::class);
}

public function size()
{
    return $this->belongsTo(Size::class);
}

public function frameType()
{
    return $this->belongsTo(FrameType::class);
}
}
