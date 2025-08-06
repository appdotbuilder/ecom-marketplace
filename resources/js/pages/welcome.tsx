import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl">🛒</div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                MarketPlace Pro
                            </h1>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-700">
                                        Welcome, {auth.user.name}
                                    </span>
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
                                        <Button>Get Started</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            🚀 Your Ultimate
                            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Marketplace Experience
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Connect buyers and sellers in a seamless digital marketplace. 
                            Start selling your products or discover amazing deals from trusted sellers.
                        </p>
                        
                        {!auth?.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register">
                                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                                        🛍️ Start as Buyer
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                                        💼 Start as Seller
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            ✨ Everything You Need to Succeed
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Whether you're buying or selling, we've got the tools to make it happen
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Buyer Features */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
                            <div className="text-4xl mb-4">🛍️</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Shopping</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Advanced search & filters</li>
                                <li>• Secure shopping cart</li>
                                <li>• Order tracking</li>
                                <li>• Multiple payment options</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-green-100">
                            <div className="text-4xl mb-4">💼</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Sell with Ease</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Easy product listing</li>
                                <li>• Inventory management</li>
                                <li>• Sales analytics</li>
                                <li>• Order management</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure & Trusted</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• User verification</li>
                                <li>• Secure payments</li>
                                <li>• Dispute resolution</li>
                                <li>• 24/7 support</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-orange-100">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Admin Control</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• User management</li>
                                <li>• Product oversight</li>
                                <li>• Sales reports</li>
                                <li>• Platform analytics</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-red-100">
                            <div className="text-4xl mb-4">🚚</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Order Management</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Real-time status updates</li>
                                <li>• Shipping tracking</li>
                                <li>• Return handling</li>
                                <li>• Customer communication</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-teal-100">
                            <div className="text-4xl mb-4">💳</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Flexible Payments</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Cash on delivery</li>
                                <li>• Simulated payments</li>
                                <li>• Payment tracking</li>
                                <li>• Transaction history</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🎯 How It Works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Get started in minutes with our simple process
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👤</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">1. Create Account</h3>
                            <p className="text-gray-600">
                                Sign up as a buyer or seller with your basic information
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📦</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">2. List or Browse</h3>
                            <p className="text-gray-600">
                                Sellers list products, buyers browse and discover amazing deals
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">3. Buy & Sell</h3>
                            <p className="text-gray-600">
                                Complete secure transactions with built-in order management
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        🚀 Ready to Start Your Marketplace Journey?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of buyers and sellers already using our platform
                    </p>
                    
                    {!auth?.user && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3">
                                    Create Free Account
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="text-2xl">🛒</div>
                            <h3 className="text-xl font-bold">MarketPlace Pro</h3>
                        </div>
                        <p className="text-gray-400 mb-4">
                            The ultimate marketplace for buyers and sellers
                        </p>
                        <div className="text-sm text-gray-500">
                            © 2024 MarketPlace Pro. Built with Laravel & React.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}