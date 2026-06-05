<?php

namespace App\Http\Controllers;

use App\Models\Admin\Category;
use App\Models\Admin\Product;
use App\Models\Admin\Shape;
use App\Models\Admin\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopPageController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::withCount('products')->get();

        $tags = Tag::all()
            ->map(function ($tag) {

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

        /*
        |--------------------------------------------------------------------------
        | Counts (all active products)
        |--------------------------------------------------------------------------
        */

        $countProducts = Product::with('shape:id,shape')
            ->where('is_active', true)
            ->get();

        $counts = [
            'place' => [],
            'shape' => [],
            'pieces' => [],
            'design_colors' => [],
        ];

        foreach ($countProducts as $product) {

            foreach (($product->place ?? []) as $place) {
                $counts['place'][$place] =
                    ($counts['place'][$place] ?? 0) + 1;
            }

            foreach (($product->design_colors ?? []) as $color) {
                $counts['design_colors'][$color] =
                    ($counts['design_colors'][$color] ?? 0) + 1;
            }

            if ($product->pieces_count) {
                $counts['pieces'][$product->pieces_count] =
                    ($counts['pieces'][$product->pieces_count] ?? 0) + 1;
            }

            if ($product->shape?->shape) {
                $counts['shape'][$product->shape->shape] =
                    ($counts['shape'][$product->shape->shape] ?? 0) + 1;
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Products Query
        |--------------------------------------------------------------------------
        */

        $query = Product::with([
            'variants',
            'category:id,name',
            'images',
            'shape:id,shape',
        ])
            ->where('is_active', true);

        /*
        |--------------------------------------------------------------------------
        | Place Filter
        |--------------------------------------------------------------------------
        */

        if ($request->filled('place')) {

            $places = (array) $request->place;

            $query->where(function ($q) use ($places) {
                foreach ($places as $place) {
                    $q->orWhereJsonContains('place', $place);
                }
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Colors Filter
        |--------------------------------------------------------------------------
        */

        if ($request->filled('design_colors')) {

            $colors = (array) $request->design_colors;

            $query->where(function ($q) use ($colors) {
                foreach ($colors as $color) {
                    $q->orWhereJsonContains('design_colors', $color);
                }
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Shape Filter
        |--------------------------------------------------------------------------
        */

        if ($request->filled('shape')) {

            $shapes = (array) $request->shape;

            $query->whereHas('shape', function ($q) use ($shapes) {
                $q->whereIn('shape', $shapes);
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Pieces Filter
        |--------------------------------------------------------------------------
        */

        if ($request->filled('pieces')) {

            $query->whereIn(
                'pieces_count',
                (array) $request->pieces
            );
        }
        /*
|--------------------------------------------------------------------------
| Category Filter
|--------------------------------------------------------------------------
*/
        if ($request->filled('category')) {
            $query->where('category_id', (int) $request->category);
        }

        /*
|--------------------------------------------------------------------------
| Tag Filter
|--------------------------------------------------------------------------
*/
        if ($request->filled('tag')) {
            $query->whereJsonContains('tags', (int) $request->tag);
        }
        /*
|--------------------------------------------------------------------------
| Sorting
|--------------------------------------------------------------------------
*/
        if ($request->filled('sort')) {

            if ($request->sort === 'high') {
                $query->withMin('variants', 'price')
                    ->orderByDesc('variants_min_price');
            }

            if ($request->sort === 'low') {
                $query->withMin('variants', 'price')
                    ->orderBy('variants_min_price');
            }

            if ($request->sort === 'latest') {
                $query->orderBy('created_at', 'desc');
            }
        }
        $countQuery = clone $query;
        $totalProducts = $countQuery->count();

        // $products = $query->get();
        $productsPaginated = $query->paginate(6, ['*'], 'page', $request->page);
     



        /*
        |--------------------------------------------------------------------------
        | Transform Products
        |--------------------------------------------------------------------------
        */

        $products = $productsPaginated->getCollection()->map(function ($product) {

            return [
                'id' => $product->id,
                'name' => $product->name,
                'code' => $product->code,
                'main_image' => $product->main_image,

                'place' => $product->place ?? [],
                'design_colors' => $product->design_colors ?? [],
                'pieces_count' => $product->pieces_count,

                'shape' => $product->shape?->shape,

                'price' => $product->variants->min('price'),

                'category' => $product->category,

                'images' => $product->images->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'image' => $image->image,
                    ];
                }),
            ];
        });
        if ($request->header('X-Load-More') === 'true') {

            return response()->json([
                'products' => $products,
                'pagination' => [
                    'has_more' => $productsPaginated->hasMorePages(),
                    'current_page' => $productsPaginated->currentPage(),
                ],
            ]);
        }
        /*
        |--------------------------------------------------------------------------
        | Shapes
        |--------------------------------------------------------------------------
        */

        $shapes = Shape::orderBy('shape')
            ->pluck('shape')
            ->values();


        return Inertia::render('Site/ShopPage/Shop', [
            'categories' => $categories,
            'tags' => $tags,

            'products' => $products,

            'counts' => $counts,

            'shapes' => $shapes,
            'total' => $productsPaginated->total(),

            'pagination' => [
                'current_page' => $productsPaginated->currentPage(),
                'last_page' => $productsPaginated->lastPage(),
                'has_more' => $productsPaginated->hasMorePages(),
            ],


            'filters' => [
                'place' => array_values((array) $request->place),
                'shape' => array_values((array) $request->shape),
                'pieces' => array_values((array) $request->pieces),
                'design_colors' => array_values((array) $request->design_colors),
                'category' => $request->category ? (int) $request->category : null,
                'tag' => $request->tag ? (int) $request->tag : null,
                'sort' => $request->sort ?? null,
            ],
        ]);
    }
}
