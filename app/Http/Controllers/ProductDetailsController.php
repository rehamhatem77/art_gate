<?php

namespace App\Http\Controllers;

use App\Models\Admin\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductDetailsController extends Controller
{
    public function show(string $slug)
    {
        $wishlistIds = auth()->check()

            ? auth()->user()

            ->wishlistProducts()

            ->pluck('products.id')

            ->toArray()

            : [];
        $product = Product::query()
            ->with([
                'category:id,name',
                'images',
                'variants.size',
                'variants.frameType',
                'shape:id,shape',

            ])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // $relatedProducts = Product::query()
        //     ->with([
        //         'images',
        //         'variants',
        //         'category:id,name',
        //     ])
        //     ->where('category_id', $product->category_id)
        //     ->where('id', '!=', $product->id)
        //     ->where('is_active', true)
        //     ->latest()
        //     ->take(4)
        //     ->get()
        //     ->map(function ($item) use ($wishlistIds) {
        //         return [
        //             'id' => $item->id,
        //             'name' => $item->name,
        //             'code' => $item->code,
        //             'tags' => $item->tags,
        //             'slug' => $item->slug,
        //             'isWishlisted' => in_array(

        //                 $item->id,

        //                 $wishlistIds

        //             ),
        //             'main_image' => $item->main_image,
        //             'price' => $item->variants->min('price'),
        //             'category' => $item->category,
        //             'images' => $item->images,
        //         ];
        //     });
        $relatedProducts = Product::query()
    ->with([
        'category:id,name',
        'images',
        'variants.size',
        'variants.frameType',
    ])
    ->where('category_id', $product->category_id)
    ->where('id', '!=', $product->id)
    ->where('is_active', true)
    ->latest()
    ->take(4)
    ->get()
    ->map(function ($item) use ($wishlistIds) {

        return [
            'id' => $item->id,
            'name' => $item->name,
            'code' => $item->code,
            'slug' => $item->slug,
            'description' => $item->description,

            'main_image' => $item->main_image,

            'isWishlisted' => in_array(
                $item->id,
                $wishlistIds
            ),

            'price' => $item->variants->min('price'),

            'category' => $item->category,

            'tags' => $item->tags,

            'variants' => $item->variants->map(function ($variant) {
                return [
                    'id' => $variant->id,

                    'size' => [
                        'id' => $variant->size->id,
                        'width' => $variant->size->width,
                        'height' => $variant->size->height,
                        'label' => $variant->size->width .
                            ' × ' .
                            $variant->size->height,
                    ],

                    'frame' => [
                        'id' => $variant->frameType->id,
                        'type' => $variant->frameType->type,
                        'colors' => $variant->frameType->colors,
                    ],

                    'price' => $variant->price,
                    'stock' => $variant->stock,
                    'image' => $variant->image,
                ];
            }),

            'images' => $item->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'image' => $image->image,
                ];
            }),
        ];
    });

        return Inertia::render('Site/Product/ProductDetails', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'code' => $product->code,
                'description' => $product->description,
                'main_image' => $product->main_image,
                'tags' => $product->tags,
                'design_colors' => $product->design_colors,
                'artistic_type' => $product->artistic_type,
                'place' => $product->place,
                'pieces_count' => $product->pieces_count,
                'shape' => $product->shape,
                'isWishlisted' => in_array(
                    $product->id,
                    $wishlistIds
                ),

                'category' => $product->category,

                'images' => $product->images->map(fn($image) => [
                    'id' => $image->id,
                    'image' => $image->image,
                ]),

                'variants' => $product->variants->map(fn($variant) => [
                    'id' => $variant->id,

                    'size' => [
                        'id' => $variant->size->id,
                        'width' => $variant->size->width,
                        'height' => $variant->size->height,
                        'label' => $variant->size->width .
                            ' × ' .
                            $variant->size->height,
                    ],

                    'frame' => [
                        'id' => $variant->frameType->id,
                        'type' => $variant->frameType->type,
                        'colors' => $variant->frameType->colors,
                    ],

                    'price' => $variant->price,
                    'stock' => $variant->stock,
                    'image' => $variant->image,
                ]),
            ],

            'relatedProducts' => $relatedProducts,
        ]);
    }
}
