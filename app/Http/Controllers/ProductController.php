<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the seller's products.
     */
    public function index()
    {
        $products = Product::with(['category'])
            ->where('seller_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('seller/products/index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        $categories = Category::active()->get();

        return Inertia::render('seller/products/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();
        $validated['seller_id'] = Auth::id();
        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(8);

        $product = Product::create($validated);

        return redirect()->route('seller.products.show', $product)
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        // Ensure the product belongs to the authenticated seller
        if ($product->seller_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403);
        }

        $product->load(['category']);

        return Inertia::render('seller/products/show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the product.
     */
    public function edit(Product $product)
    {
        // Ensure the product belongs to the authenticated seller
        if ($product->seller_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403);
        }

        $categories = Category::active()->get();
        $product->load(['category']);

        return Inertia::render('seller/products/edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        // Ensure the product belongs to the authenticated seller
        if ($product->seller_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403);
        }

        $validated = $request->validated();
        
        // Update slug if name changed
        if ($validated['name'] !== $product->name) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(8);
        }

        $product->update($validated);

        return redirect()->route('seller.products.show', $product)
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Product $product)
    {
        // Ensure the product belongs to the authenticated seller
        if ($product->seller_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403);
        }

        $product->delete();

        return redirect()->route('seller.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}