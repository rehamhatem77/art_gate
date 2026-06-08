<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

class AboutUsControllter extends Controller
{
function index(){
     return Inertia::render('Site/AboutUs/About', []);
}
}
