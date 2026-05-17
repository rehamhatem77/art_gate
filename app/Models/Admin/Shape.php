<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Shape extends Model
{
    //
    protected $fillable = [
        'shape',
    ];
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
