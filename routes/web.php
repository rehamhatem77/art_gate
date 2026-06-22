<?php

use App\Http\Controllers\AboutUsControllter;
use App\Http\Controllers\Admin\AdminAboutPageController;
use App\Http\Controllers\Admin\AdminContactPageController;
use App\Http\Controllers\Admin\AdminHomePageController;
use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FrameTypesController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\Admin\ShapesController;
use App\Http\Controllers\Admin\SizesController;
use App\Http\Controllers\Admin\TableauNumbersController;
use App\Http\Controllers\Admin\TagsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ContactPageController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ProductDetailsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopPageController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\WishlistController;
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
Route::get('/shop', [ShopPageController::class, 'index'])->name('shop');
Route::get('/shop/{slug}', [ProductDetailsController::class, 'show'])
    ->name('shop.product.show');
Route::get('/search/products', [ShopPageController::class, 'searchProducts']);
Route::get('/about-us', [AboutUsControllter::class, 'index'])->name('about-us');
Route::get('/contact-us', [ContactPageController::class, 'index'])->name('contact-us');
Route::post('/contact', [ContactPageController::class, 'store'])->name('contact.store');
Route::get(
    '/cart',
    [CartController::class, 'index']
)->name('cart.index');

Route::get('/checkout', [CheckoutController::class, 'index'])
    ->name('checkout.index');

Route::post('/checkout', [CheckoutController::class, 'store'])
    ->name('checkout.store');
Route::post(
    '/checkout/sync',
    [CheckoutController::class, 'sync']
)->name('checkout.sync');
Route::get('/order/success/{order}', [CheckoutController::class, 'success'])
    ->name('order.success');

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


            Route::get('/orders',[OrderController::class, 'index'])->name('orders.index');
            Route::patch('/orders/{order}/status',[OrderController::class, 'updateStatus'])->name('orders.status');


            Route::get('/homepage', [AdminHomePageController::class, 'index'])
                ->name('homepage.index');

            Route::post('/announcement', [AdminHomePageController::class, 'updateAnnouncement'])
                ->name('homepage.announcement.update');

            Route::post('/slider', [AdminHomePageController::class, 'updateSlider'])
                ->name('homepage.slider.update');

            Route::post('/about', [AdminHomePageController::class, 'updateAbout'])
                ->name('homepage.about.update');

            Route::post('/special', [AdminHomePageController::class, 'updateSpecial'])
                ->name('homepage.special.update');

            Route::post('/category', [AdminHomePageController::class, 'updateCategory'])
                ->name('homepage.category.update');



            Route::prefix('about-page')->name('about.')->group(function () {
                Route::get('/', [AdminAboutPageController::class, 'index'])
                    ->name('index');
                Route::post('/hero', [AdminAboutPageController::class, 'updateHero'])->name('hero.update');
                Route::post('/vision-mission', [AdminAboutPageController::class, 'updateVisionMission'])->name('vision-mission.update');
                Route::post('/story', [AdminAboutPageController::class, 'updateStory'])->name('story.update');
                Route::post('/video', [AdminAboutPageController::class, 'updateVideo'])->name('video.update');
                Route::post('/team', [AdminAboutPageController::class, 'updateTeam'])->name('team.update');
            });

            Route::get('/contact-messages', [ContactMessageController::class, 'index'])
                ->name('contact-messages.index');

            Route::get('/contact-messages/{id}', [ContactMessageController::class, 'show'])
                ->name('contact-messages.show');

            Route::delete('/contact-messages/{id}', [ContactMessageController::class, 'destroy'])
                ->name('contact-messages.destroy');

            Route::prefix('contact-page')->name('contact-page.')->group(function () {
                Route::get('/', [AdminContactPageController::class, 'index'])
                    ->name('index');

                Route::post('/hero', [AdminContactPageController::class, 'updateHero'])
                    ->name('hero.update');

                Route::post('/info', [AdminContactPageController::class, 'updateInfo'])
                    ->name('info.update');

                Route::post('/social', [AdminContactPageController::class, 'updateSocial'])
                    ->name('social.update');

                Route::post('/map', [AdminContactPageController::class, 'updateMap'])
                    ->name('map.update');

                Route::post('/footer', [AdminContactPageController::class, 'updateFooter'])
                    ->name('footer.update');
            });



            // Route::get('/tableau-numbers', [TableauNumbersController::class, 'index'])
            //         ->name('tableau-numbers.index');
            //     Route::post('/tableau-numbers', [TableauNumbersController::class, 'store'])
            //         ->name('tableau-numbers.store');
            //     Route::put('/tableau-numbers/{tableauNumber}', [TableauNumbersController::class, 'update'])
            //         ->name('tableau-numbers.update');
            //     Route::delete('/tableau-numbers/{tableauNumber}', [TableauNumbersController::class, 'destroy'])
            //         ->name('tableau-numbers.destroy');

            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        });
        //  Route::get('/users', [DashboardController::class, 'users'])->name('users.index');
        // Route::post('/users', [DashboardController::class, 'addUserAdmin'])->name('users.store');
        // Route::put('/users/{user}', [DashboardController::class, 'updateUser'])->name('users.update');
        // Route::delete('/users/{user}', [DashboardController::class, 'deleteUser'])->name('users.destroy');


    });


    Route::get(
        '/wishlist',
        [WishlistController::class, 'index']
    )->name('wishlist.index');

    Route::post(
        '/wishlist/{product}',
        [WishlistController::class, 'store']
    )->name('wishlist.store');

    Route::delete(
        '/wishlist/{product}',
        [WishlistController::class, 'destroy']
    )->name('wishlist.destroy');


 Route::post(
        '/cart/merge',
        [CartController::class, 'merge']
    )->name('cart.merge');
    Route::post(
        '/cart/store',
        [CartController::class, 'store']
    )->name('cart.store');

    Route::patch(
        '/cart/{cart}',
        [CartController::class, 'update']
    )->name('cart.update');

    Route::delete(
        '/cart/{cart}',
        [CartController::class, 'destroy']
    )->name('cart.destroy');

    Route::get('/profile', [UserProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/update-section', [UserProfileController::class, 'updateSection']);
    Route::delete('/profile', [UserProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch(
        '/profile/orders/{order}/cancel',
        [UserProfileController::class, 'cancelOrder']
    )->name('profile.orders.cancel');
});

require __DIR__ . '/auth.php';
