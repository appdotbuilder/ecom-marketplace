import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Dashboard({ auth }: Props) {
    const { user } = auth;

    const getDashboardContent = () => {
        switch (user.role) {
            case 'admin':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🔧 Admin Dashboard</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Link href="/admin/users" className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-2">👥</div>
                                    <h3 className="font-semibold text-lg mb-2">Manage Users</h3>
                                    <p className="text-gray-600 text-sm">View and manage all users</p>
                                </div>
                            </Link>
                            
                            <Link href="/admin/products" className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-2">📦</div>
                                    <h3 className="font-semibold text-lg mb-2">Manage Products</h3>
                                    <p className="text-gray-600 text-sm">Oversee all products</p>
                                </div>
                            </Link>
                            
                            <Link href="/admin/orders" className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-2">📋</div>
                                    <h3 className="font-semibold text-lg mb-2">Manage Orders</h3>
                                    <p className="text-gray-600 text-sm">View all orders</p>
                                </div>
                            </Link>
                            
                            <Link href="/admin/reports" className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-2">📊</div>
                                    <h3 className="font-semibold text-lg mb-2">Reports</h3>
                                    <p className="text-gray-600 text-sm">View analytics and reports</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                );

            case 'seller':
                return (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">💼 Seller Dashboard</h2>
                            <Link href="/seller/products/create">
                                <Button>➕ Add New Product</Button>
                            </Link>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Link href="/seller/products" className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-2">📦</div>
                                    <h3 className="font-semibold text-lg mb-2">My Products</h3>
                                    <p className="text-gray-600 text-sm">Manage your product listings</p>
                                </div>
                            </Link>
                            
                            <Link href="/orders" className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-2">📋</div>
                                    <h3 className="font-semibold text-lg mb-2">Orders</h3>
                                    <p className="text-gray-600 text-sm">View and manage orders</p>
                                </div>
                            </Link>
                            
                            <Link href="/" className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-2">🏪</div>
                                    <h3 className="font-semibold text-lg mb-2">Browse Marketplace</h3>
                                    <p className="text-gray-600 text-sm">See your products in action</p>
                                </div>
                            </Link>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-xl font-semibold mb-4">🚀 Quick Start Guide</h3>
                            <div className="bg-blue-50 rounded-lg p-6">
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</span>
                                        <div>
                                            <h4 className="font-medium">Add your first product</h4>
                                            <p className="text-gray-600 text-sm">Create detailed product listings with descriptions and pricing</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</span>
                                        <div>
                                            <h4 className="font-medium">Manage your inventory</h4>
                                            <p className="text-gray-600 text-sm">Keep track of stock levels and update product status</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</span>
                                        <div>
                                            <h4 className="font-medium">Process orders</h4>
                                            <p className="text-gray-600 text-sm">Receive orders and update their status as they ship</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'buyer':
            default:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🛍️ Buyer Dashboard</h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Link href="/" className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-2">🏪</div>
                                    <h3 className="font-semibold text-lg mb-2">Browse Products</h3>
                                    <p className="text-gray-600 text-sm">Discover amazing products from sellers</p>
                                </div>
                            </Link>
                            
                            <Link href="/cart" className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-2">🛒</div>
                                    <h3 className="font-semibold text-lg mb-2">Shopping Cart</h3>
                                    <p className="text-gray-600 text-sm">Review items before checkout</p>
                                </div>
                            </Link>
                            
                            <Link href="/orders" className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-2">📦</div>
                                    <h3 className="font-semibold text-lg mb-2">My Orders</h3>
                                    <p className="text-gray-600 text-sm">Track your order history</p>
                                </div>
                            </Link>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-xl font-semibold mb-4">🛍️ Shopping Guide</h3>
                            <div className="bg-green-50 rounded-lg p-6">
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</span>
                                        <div>
                                            <h4 className="font-medium">Search and browse</h4>
                                            <p className="text-gray-600 text-sm">Use filters to find exactly what you're looking for</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</span>
                                        <div>
                                            <h4 className="font-medium">Add to cart</h4>
                                            <p className="text-gray-600 text-sm">Collect items from multiple sellers in one place</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</span>
                                        <div>
                                            <h4 className="font-medium">Secure checkout</h4>
                                            <p className="text-gray-600 text-sm">Complete your purchase with cash on delivery or simulated payment</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <AppShell>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user.name}! 👋
                    </h1>
                    <p className="text-gray-600">
                        {user.role === 'admin' && "Manage your marketplace from here"}
                        {user.role === 'seller' && "Grow your business and manage your products"}
                        {user.role === 'buyer' && "Discover amazing products and manage your orders"}
                    </p>
                </div>
                
                {getDashboardContent()}
            </div>
        </AppShell>
    );
}