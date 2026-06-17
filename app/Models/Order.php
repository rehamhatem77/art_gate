<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $fillable = [

        'user_id',

        'name',

        'email',

        'phone',

        'second_phone',

        'country',

        'governorate',

        'area',

        'address',

        'notes',

        'subtotal',

        'shipping',

        'total',

        'payment_method',

        'status',
        'cancelled_at',

        'items',

    ];

    protected $casts = [

        'items' => 'array',

    ];

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }
}
