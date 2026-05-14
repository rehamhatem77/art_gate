<?php

use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TagsController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', [HomePageController::class, 'index'])->name('home');


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
Route::middleware('admin.only')->group(function () {
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
     Route::get('/categories', [CategoriesController::class, 'index'])
        ->name('categories.index');
    Route::post('/categories', [CategoriesController::class, 'store'])
        ->name('categories.store');
    Route::put('/categories/{category}', [CategoriesController::class, 'update'])
        ->name('categories.update');
    Route::delete('/categories/{category}', [CategoriesController::class, 'destroy'])
        ->name('categories.destroy');

Route::get('/tags', [TagsController::class, 'index'])
        ->name('tags.index');
    Route::post('/tags', [TagsController::class, 'store'])
        ->name('tags.store');
    Route::put('/tags/{tag}', [TagsController::class, 'update'])
        ->name('tags.update');
    Route::delete('/tags/{tag}', [TagsController::class, 'destroy'])
        ->name('tags.destroy');

});
    //  Route::get('/users', [DashboardController::class, 'users'])->name('users.index');
    // Route::post('/users', [DashboardController::class, 'addUserAdmin'])->name('users.store');
    // Route::put('/users/{user}', [DashboardController::class, 'updateUser'])->name('users.update');
    // Route::delete('/users/{user}', [DashboardController::class, 'deleteUser'])->name('users.destroy');

});
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
