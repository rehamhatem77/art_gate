<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    //
    protected $fillable = ['width', 'height'];
public function productVariants()
{
    return $this->hasMany(ProductVariant::class);
}

}
