<?php

return [

    'required' => 'حقل :attribute مطلوب.',
    'string' => 'يجب أن يكون :attribute نصًا.',
    'image' => 'يجب أن يكون :attribute صورة.',
    'mimes' => 'يجب أن تكون :attribute من نوع: :values.',

    'email' => 'يجب أن يكون :attribute بريدًا إلكترونيًا صالحًا.',
    'min' => [
        'string' => 'يجب ألا يقل :attribute عن :min أحرف.',
    ],
    'confirmed' => 'تأكيد :attribute غير متطابق.',
    'unique' => ':attribute مستخدم بالفعل.',
    'max' => [
        'string' => 'يجب ألا يزيد :attribute عن :max أحرف.',
        'file' => 'يجب ألا يزيد حجم :attribute عن :max كيلوبايت.',

    ],


    'attributes' => [
        'name' => 'الاسم',
        'email' => 'البريد الإلكتروني',
        'password' => 'كلمة المرور',
        'password_confirmation' => 'تأكيد كلمة المرور',
    ],

];