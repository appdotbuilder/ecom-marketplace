import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        seller: {
            name: string;
        };
        category: {
            name: string;
        };
    };
}

interface Props {
    cartItems: CartItem[];
    total: number;
    [key: string]: unknown;
}

export default function CartIndex({ cartItems, total }: Props) {
    const updateQuantity = (itemId: number, quantity: number) => {
        router.put(`/cart/${itemId}`, { quantity }, {
            preserveState: true,
        });
    };

    const removeItem = (itemId: number) => {
        router.delete(`/cart/${itemId}`, {
            preserveState: true,
        });
    };



    return (
        <AppShell>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">🛒 Shopping Cart</h1>
                    <Link href="/">
                        <Button variant="outline">← Continue Shopping</Button>
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">
                            Discover amazing products and add them to your cart
                        </p>
                        <Link href="/">
                            <Button size="lg">🏪 Browse Products</Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start space-x-4 flex-1">
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <span className="text-2xl">📦</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg mb-1">
                                                        {item.product.name}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-2">
                                                        by {item.product.seller.name} • {item.product.category.name}
                                                    </p>
                                                    <p className="text-xl font-bold text-green-600">
                                                        ${item.product.price}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-12 text-center font-semibold">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                                                        disabled={item.quantity >= item.product.quantity}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <p className="font-semibold text-lg">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    <p className="text-gray-500 text-sm">
                                                        Stock: {item.product.quantity}
                                                    </p>
                                                </div>
                                                
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-800 p-2"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-semibold">Order Summary</h3>
                                    <p className="text-gray-600">
                                        {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-green-600">
                                        Total: ${total.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <Link href="/orders/create">
                                    <Button size="lg" className="px-8">
                                        🚀 Proceed to Checkout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AppShell>
    );
}