<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Category;
use App\Models\Admin\FrameType;
use App\Models\Admin\Product;
use App\Models\Admin\ProductImage;
use App\Models\Admin\ProductVariant;
use App\Models\Admin\Shape;
use App\Models\Admin\Size;
use App\Models\Admin\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductsController extends Controller
{
    //
    /*
    |--------------------------------------------------------------------------
    | Index
    |--------------------------------------------------------------------------
    */

    public function index(Request $request)
    {
        $products = Product::with([
            'category',
            'shape',
            'images',
            'variants.size',
            'variants.frameType',
        ])->latest()->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::latest()->get(),
            'shapes' => Shape::latest()->get(),
            'sizes' => Size::latest()->get(),
            'frameTypes' => FrameType::latest()->get(),
            'tags' => Tag::latest()->get(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Store
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',

            'code' => 'required|string|max:255|unique:products,code',

            'description' => 'nullable|string',

            'category_id' => 'nullable|exists:categories,id',

            'shape_id' => 'nullable|exists:shapes,id',

            'tags' => 'nullable|array',
            'tags.*' => 'string|max:255',

            'design_colors' => 'nullable|array',
            'design_colors.*' => 'string|max:255',

            'artistic_type' => 'nullable|string|max:255',

            'place' => 'nullable|string|max:255',

            'pieces_count' => 'nullable|string|max:255',

            'main_image' => 'nullable|image|mimes:jpg,jpeg,png,webp',

            'featured' => 'nullable|boolean',

            'is_active' => 'nullable|boolean',

            /*
            Gallery Images
            */
            'images' => 'nullable|array',

            'images.*' => 'image|mimes:jpg,jpeg,png,webp',

            /*
            Variants
            */
            'variants' => 'required|array|min:1',

            'variants.*.size_id' => 'required|exists:sizes,id',

            'variants.*.frame_type_id' => 'required|exists:frame_types,id',

            'variants.*.price' => 'required|numeric|min:0',

            'variants.*.stock' => 'nullable|integer|min:0',

            // 'variants.*.sku' => 'nullable|string|max:255',
        ]);

        DB::beginTransaction();

        try {

            /*
            Main Image
            */
            $mainImagePath = null;

            if ($request->hasFile('main_image')) {

                $mainImagePath = $request
                    ->file('main_image')
                    ->store('products/main', 'public');
            }

            /*
            Create Product
            */
            $product = Product::create([
                'name' => $request->name,

                'code' => $request->code,

                'slug' => Str::slug($request->name . '-' . uniqid()),

                'description' => $request->description,

                'category_id' => $request->category_id,

                'shape_id' => $request->shape_id,

                'tags' => $request->tags,

                'design_colors' => $request->design_colors,

                'artistic_type' => $request->artistic_type,

                'place' => $request->place,

                'pieces_count' => $request->pieces_count,

                'main_image' => $mainImagePath,

                'featured' => $request->featured ?? false,

                'is_active' => $request->is_active ?? true,
            ]);

            /*
            Gallery Images
            */
            if ($request->hasFile('images')) {

                foreach ($request->file('images') as $index => $image) {

                    $path = $image->store(
                        'products/gallery',
                        'public'
                    );

                    ProductImage::create([
                        'product_id' => $product->id,

                        'image' => $path,

                        'sort_order' => $index,

                        'is_primary' => false,
                    ]);
                }
            }

            /*
            Product Variants
            */
            foreach ($request->variants as $variant) {

                ProductVariant::create([
                    'product_id' => $product->id,

                    'size_id' => $variant['size_id'],

                    'frame_type_id' => $variant['frame_type_id'],

                    'price' => $variant['price'],

                    'stock' => $variant['stock'] ?? 0,

                    // 'sku' => $variant['sku']
                    //     ?? $this->generateSku($product),
                ]);
            }

            DB::commit();

            return redirect()
                ->route('admin.products.index')
                ->with(
                    'success',
                    'تم إضافة اللوحة بنجاح'
                );
        } catch (\Exception $e) {

            DB::rollBack();

            return back()->with(
                'error',
                'حدث خطأ أثناء إضافة اللوحة: ' . $e->getMessage()
            );
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Edit
    |--------------------------------------------------------------------------
    */

    public function edit(Product $product)
    {
        $product->load([
            'images',
            'variants.size',
            'variants.frameType',
        ]);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,

            'categories' => Category::latest()->get(),

            'shapes' => Shape::latest()->get(),

            'sizes' => Size::latest()->get(),

            'frameTypes' => FrameType::latest()->get(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',

            'code' => 'required|string|max:255|unique:products,code,' . $product->id,

            'description' => 'nullable|string',

            'category_id' => 'nullable|exists:categories,id',

            'shape_id' => 'nullable|exists:shapes,id',

            'tags' => 'nullable|array',

            'design_colors' => 'nullable|array',

            'artistic_type' => 'nullable|string|max:255',

            'place' => 'nullable|string|max:255',

            'pieces_count' => 'nullable|string|max:255',

            'main_image' => 'nullable|image|mimes:jpg,jpeg,png,webp',

            'featured' => 'nullable|boolean',

            'is_active' => 'nullable|boolean',
        ]);

        DB::beginTransaction();

        try {

            /*
            Replace Main Image
            */
            $mainImagePath = $product->main_image;

            if ($request->hasFile('main_image')) {

                if (
                    $product->main_image &&
                    Storage::disk('public')->exists($product->main_image)
                ) {
                    Storage::disk('public')->delete($product->main_image);
                }

                $mainImagePath = $request
                    ->file('main_image')
                    ->store('products/main', 'public');
            }

            /*
            Update Product
            */
            $product->update([
                'name' => $request->name,

                'code' => $request->code,

                'description' => $request->description,

                'category_id' => $request->category_id,

                'shape_id' => $request->shape_id,

                'tags' => $request->tags,

                'design_colors' => $request->design_colors,

                'artistic_type' => $request->artistic_type,

                'place' => $request->place,

                'pieces_count' => $request->pieces_count,

                'main_image' => $mainImagePath,

                'featured' => $request->featured ?? false,

                'is_active' => $request->is_active ?? true,
            ]);

            /*
            Replace Variants
            */
            $product->variants()->delete();

            foreach ($request->variants as $variant) {

                ProductVariant::create([
                    'product_id' => $product->id,

                    'size_id' => $variant['size_id'],

                    'frame_type_id' => $variant['frame_type_id'],

                    'price' => $variant['price'],

                    'stock' => $variant['stock'] ?? 0,

                    // 'sku' => $variant['sku']
                    //     ?? $this->generateSku($product),
                ]);
            }

            DB::commit();

            return redirect()
                ->route('admin.products.index')
                ->with(
                    'success',
                    'تم تحديث اللوحة بنجاح'
                );
        } catch (\Exception $e) {

            DB::rollBack();

            return back()->with(
                'error',
                'حدث خطأ أثناء تحديث اللوحة: ' . $e->getMessage()
            );
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Destroy
    |--------------------------------------------------------------------------
    */

    public function destroy(Product $product)
    {
        DB::beginTransaction();

        try {

            /*
            Delete Main Image
            */
            if (
                $product->main_image &&
                Storage::disk('public')->exists($product->main_image)
            ) {
                Storage::disk('public')->delete($product->main_image);
            }

            /*
            Delete Gallery Images
            */
            foreach ($product->images as $image) {

                if (
                    $image->image &&
                    Storage::disk('public')->exists($image->image)
                ) {
                    Storage::disk('public')->delete($image->image);
                }
            }

            $product->delete();

            DB::commit();

            return back()->with(
                'success',
                'تم حذف اللوحة بنجاح'
            );
        } catch (\Exception $e) {

            DB::rollBack();

            return back()->with(
                'error',
                'حدث خطأ أثناء حذف اللوحة: ' . $e->getMessage()
            );
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Generate SKU
    |--------------------------------------------------------------------------
    */

    // private function generateSku(Product $product)
    // {
    //     return strtoupper(
    //         Str::slug($product->name)
    //     ) . '-' . rand(1000, 9999);
    // }
}
