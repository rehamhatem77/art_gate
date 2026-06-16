<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    //
  protected $fillable = [

        'user_id',

        'phone',

        'second_phone',

        'birth_date',

        'gender',

        'country',

        'governorate',

        'city',

        'zip_code',

        'company',

        'address',

        'avatar',

        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }
}
