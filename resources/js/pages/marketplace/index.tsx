import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    images: string[] | null;
    featured: boolean;
    seller: {
        id: number;
        name: string;
    };
    category: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
}

interface Props {
    products: {
        data: Product[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    featuredProducts: Product[];
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
        min_price?: string;
        max_price?: string;
        sort?: string;
    };
    auth?: {
        user?: {
            id: number;
            name: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function MarketplaceIndex({ products, featuredProducts, categories, filters, auth }: Props) {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const search = formData.get('search') as string;
        
        router.get('/', { 
            ...filters, 
            search: search || undefined 
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleFilter = (key: string, value: string) => {
        router.get('/', { 
            ...filters, 
            [key]: value || undefined 
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const addToCart = (productId: number) => {
        router.post('/cart', { 
            product_id: productId, 
            quantity: 1 
        }, {
            preserveState: true,
        });
    };

    return (
        <AppShell>
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl">🛒</div>
                            <h1 className="text-xl font-bold">MarketPlace Pro</h1>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <div className="flex items-center space-x-4">
                                    <Link href="/cart" className="flex items-center space-x-1">
                                        <span className="text-xl">🛒</span>
                                        <span>Cart</span>
                                    </Link>
                                    <Link href="/dashboard">
                                        <Button variant="outline">Dashboard</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link href="/login">
                                        <Button variant="outline">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button>Sign Up</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mt-4">
                        <div className="flex space-x-2">
                            <Input
                                name="search"
                                placeholder="Search products..."
                                defaultValue={filters.search}
                                className="flex-1"
                            />
                            <Button type="submit">🔍 Search</Button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Featured Products */}
                {featuredProducts.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">⭐ Featured Products</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                                        <span className="text-4xl">📦</span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            by {product.seller.name}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-green-600">
                                                ${product.price}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Stock: {product.quantity}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2 mt-4">
                                            <Link 
                                                href={`/product/${product.slug}`}
                                                className="flex-1"
                                            >
                                                <Button variant="outline" size="sm" className="w-full">
                                                    View
                                                </Button>
                                            </Link>
                                            {auth?.user && auth.user.role === 'buyer' && (
                                                <Button 
                                                    size="sm"
                                                    onClick={() => addToCart(product.id)}
                                                    disabled={product.quantity === 0}
                                                >
                                                    🛒
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="font-semibold text-lg mb-4">🔍 Filters</h3>
                            
                            {/* Categories */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-2">Categories</h4>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleFilter('category', '')}
                                        className={`block w-full text-left px-3 py-2 rounded ${!filters.category ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleFilter('category', category.id.toString())}
                                            className={`block w-full text-left px-3 py-2 rounded ${filters.category === category.id.toString() ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-2">Price Range</h4>
                                <div className="space-y-2">
                                    <Input
                                        type="number"
                                        placeholder="Min price"
                                        defaultValue={filters.min_price}
                                        onChange={(e) => {
                                            const timer = setTimeout(() => {
                                                handleFilter('min_price', e.target.value);
                                            }, 500);
                                            return () => clearTimeout(timer);
                                        }}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Max price"
                                        defaultValue={filters.max_price}
                                        onChange={(e) => {
                                            const timer = setTimeout(() => {
                                                handleFilter('max_price', e.target.value);
                                            }, 500);
                                            return () => clearTimeout(timer);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div>
                                <h4 className="font-medium mb-2">Sort By</h4>
                                <select
                                    value={filters.sort || 'created_at'}
                                    onChange={(e) => handleFilter('sort', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value="created_at">Newest First</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="name">Name A-Z</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">
                                📦 All Products ({products.meta.total})
                            </h2>
                        </div>

                        {products.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-500">
                                    Try adjusting your search or filters
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.data.map((product) => (
                                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                                <span className="text-4xl">📦</span>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-semibold text-lg line-clamp-2 flex-1">
                                                        {product.name}
                                                    </h3>
                                                    {product.featured && (
                                                        <span className="text-yellow-500 text-sm ml-2">⭐</span>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 text-sm mb-2">
                                                    by {product.seller.name} • {product.category.name}
                                                </p>
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-xl font-bold text-green-600">
                                                        ${product.price}
                                                    </span>
                                                    <span className={`text-sm px-2 py-1 rounded ${product.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {product.quantity > 0 ? `Stock: ${product.quantity}` : 'Out of Stock'}
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link 
                                                        href={`/product/${product.slug}`}
                                                        className="flex-1"
                                                    >
                                                        <Button variant="outline" size="sm" className="w-full">
                                                            👁️ View Details
                                                        </Button>
                                                    </Link>
                                                    {auth?.user && auth.user.role === 'buyer' && (
                                                        <Button 
                                                            size="sm"
                                                            onClick={() => addToCart(product.id)}
                                                            disabled={product.quantity === 0}
                                                        >
                                                            🛒 Add
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {products.meta.last_page > 1 && (
                                    <div className="mt-8 flex justify-center">
                                        <nav className="flex items-center space-x-2">
                                            {products.links.map((link, index: number) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        if (link.url) {
                                                            router.visit(link.url);
                                                        }
                                                    }}
                                                    disabled={!link.url}
                                                    className={`px-4 py-2 rounded ${
                                                        link.active 
                                                            ? 'bg-blue-500 text-white' 
                                                            : link.url 
                                                                ? 'bg-white border hover:bg-gray-50' 
                                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}