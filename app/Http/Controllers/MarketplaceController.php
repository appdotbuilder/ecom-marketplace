<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketplaceController extends Controller
{
    /**
     * Display the marketplace homepage.
     */
    public function index(Request $request)
    {
        // Show welcome page for unauthenticated users
        if (!auth()->check()) {
            return Inertia::render('welcome');
        }
        $query = Product::with(['category', 'seller'])
            ->active()
            ->inStock();

        // Search functionality
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        // Category filter
        if ($request->category) {
            $query->where('category_id', $request->category);
        }

        // Price range filter
        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sorting
        $sortBy = $request->sort ?? 'created_at';
        $sortOrder = $request->order ?? 'desc';
        
        switch ($sortBy) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
        }

        $products = $query->paginate(12)->withQueryString();
        $featuredProducts = Product::with(['category', 'seller'])
            ->active()
            ->featured()
            ->inStock()
            ->limit(8)
            ->get();
        
        $categories = Category::active()->get();

        return Inertia::render('marketplace/index', [
            'products' => $products,
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'min_price', 'max_price', 'sort', 'order']),
        ]);
    }

    /**
     * Display a single product.
     */
    public function show(Product $product)
    {
        $product->load(['category', 'seller']);
        
        // Get related products from the same category
        $relatedProducts = Product::with(['category', 'seller'])
            ->active()
            ->inStock()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        return Inertia::render('marketplace/product', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }


}