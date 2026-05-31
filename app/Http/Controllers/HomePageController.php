<?php

namespace App\Http\Controllers;

use App\Models\Admin\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class HomePageController extends Controller
{
    
    public function index(Request $request)
    {
       $categories = Category::query()
            ->select('id', 'name', 'image', 'icon')
            ->withCount('products')
            ->latest()
            ->get();
        
        return Inertia::render('Welcome', [
            'canLogin'       => Route::has('login'),
            'canRegister'    => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion'     => PHP_VERSION,
            'categories'     => $categories,
        ]);
    }
}
