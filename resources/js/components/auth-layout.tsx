import React from 'react';

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function AuthLayout({ title, description, children }: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="text-2xl">🛒</div>
                        <h1 className="text-xl font-bold">MarketPlace Pro</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <p className="mt-2 text-sm text-gray-600">{description}</p>
                </div>
                {children}
            </div>
        </div>
    );
}