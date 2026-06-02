<?php

namespace App\Http\Controllers;

use App\Models\Admin\Category;
use App\Models\Admin\Product;
use App\Models\Admin\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopPageController extends Controller
{
    public function index(Request $request)
    {
$categories = Category::withCount('products')->get();
$tags = Tag::all()->map(function ($tag) {

    $count = Product::whereJsonContains('tags', $tag->id)->count();

    return [
        'id' => $tag->id,
        'name' => $tag->name,
        'products_count' => $count,
    ];
})
->where('products_count', '>', 0)
->sortByDesc('products_count')
->values();
        return Inertia::render('Site/ShopPage/Shop', [
            'categories' => $categories,
            'tags' => $tags
        ]);
    }
}
