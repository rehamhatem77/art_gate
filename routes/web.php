<?php

use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FrameTypesController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\Admin\ShapesController;
use App\Http\Controllers\Admin\SizesController;
use App\Http\Controllers\Admin\TableauNumbersController;
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


            Route::get('/sizes', [SizesController::class, 'index'])
                ->name('sizes.index');
            Route::post('/sizes', [SizesController::class, 'store'])
                ->name('sizes.store');
            Route::put('/sizes/{size}', [SizesController::class, 'update'])
                ->name('sizes.update');
            Route::delete('/sizes/{size}', [SizesController::class, 'destroy'])
                ->name('sizes.destroy');


            Route::get('/frame-types', [FrameTypesController::class, 'index'])
                ->name('frame-types.index');
            Route::post('/frame-types', [FrameTypesController::class, 'store'])
                ->name('frame-types.store');
            Route::put('/frame-types/{frameType}', [FrameTypesController::class, 'update'])
                ->name('frame-types.update');
            Route::delete('/frame-types/{frameType}', [FrameTypesController::class, 'destroy'])
                ->name('frame-types.destroy');



            Route::get('/shapes', [ShapesController::class, 'index'])
                ->name('shapes.index');
            Route::post('/shapes', [ShapesController::class, 'store'])
                ->name('shapes.store');
            Route::put('/shapes/{shape}', [ShapesController::class, 'update'])
                ->name('shapes.update');
            Route::delete('/shapes/{shape}', [ShapesController::class, 'destroy'])
                ->name('shapes.destroy');



                Route::get('/services', [ServicesController::class, 'index'])
                ->name('services.index');
            Route::post('/services', [ServicesController::class, 'store'])
                ->name('services.store');
            Route::put('/services/{service}', [ServicesController::class, 'update'])
                ->name('services.update');
            Route::delete('/services/{service}', [ServicesController::class, 'destroy'])
                ->name('services.destroy');



            Route::get('/products', [ProductsController::class, 'index'])
                ->name('products.index');
            Route::get('/products/trash', [ProductsController::class, 'trash'])
                ->name('products.trash');
            Route::get('/products/create', [ProductsController::class, 'create'])
                ->name('products.create');
            Route::get('/products/{product}/edit', [ProductsController::class, 'edit'])
                ->name('products.edit');
            Route::get('/products/{product}', [ProductsController::class, 'show'])
                ->name('products.show');
            Route::post('/products', [ProductsController::class, 'store'])
                ->name('products.store');
            Route::put('/products/{product}', [ProductsController::class, 'update'])
                ->name('products.update');
            Route::delete('/products/{product}', [ProductsController::class, 'destroy'])
                ->name('products.destroy');
            Route::post(
                '/products/{product}/restore',
                [ProductsController::class, 'restore']
            )->name('products.restore');
            Route::delete(
                '/products/{product}/force-delete',
                [ProductsController::class, 'forceDelete']
            )->name('products.forceDelete');









            // Route::get('/tableau-numbers', [TableauNumbersController::class, 'index'])
            //         ->name('tableau-numbers.index');
            //     Route::post('/tableau-numbers', [TableauNumbersController::class, 'store'])
            //         ->name('tableau-numbers.store');
            //     Route::put('/tableau-numbers/{tableauNumber}', [TableauNumbersController::class, 'update'])
            //         ->name('tableau-numbers.update');
            //     Route::delete('/tableau-numbers/{tableauNumber}', [TableauNumbersController::class, 'destroy'])
            //         ->name('tableau-numbers.destroy');

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

require __DIR__ . '/auth.php';
