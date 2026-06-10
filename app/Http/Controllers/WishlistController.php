<?php

namespace App\Http\Controllers;

use App\Models\Admin\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    //
      public function index()
    {
    $products = auth()->user()
    ->wishlistProducts()
    ->with([
        'category:id,name',
        'images',
        'variants:id,product_id,price'
    ])
    ->get()
    ->map(function ($product) {
        return [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'code'=>$product->code,
            'main_image' => $product->main_image,
            'price' => $product->variants->min('price'),
            'isWishlisted' => true,
            'category' => $product->category,
            'images' => $product->images,
            'tags' => $product->tags,
        ];
    });

        return Inertia::render('Site/WishlistPage/Wishlist', [
            'products' => $products
        ]);
    }

    public function store(Product $product)
    {
        Wishlist::firstOrCreate([
            'user_id' => auth()->id(),
            'product_id' => $product->id,
        ]);

        return back()->with(
            'success',
            'تم اضافة المنتج الي قائمة الأمنيات ❤️'
        );
    }

    public function destroy(Product $product)
    {
        Wishlist::where('user_id', auth()->id())
            ->where('product_id', $product->id)
            ->delete();

        return back()->with(
            'success',
            'تم حذف المنتج من قائمة الأمنيات ❤️'
        );
    }
}
