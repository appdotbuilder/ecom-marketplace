<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Marketplace routes
Route::get('/', [App\Http\Controllers\MarketplaceController::class, 'index'])->name('home');
Route::get('/product/{product:slug}', [App\Http\Controllers\MarketplaceController::class, 'show'])->name('marketplace.product');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Cart routes
    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/', [App\Http\Controllers\CartController::class, 'index'])->name('index');
        Route::post('/', [App\Http\Controllers\CartController::class, 'store'])->name('store');
        Route::put('/{cartItem}', [App\Http\Controllers\CartController::class, 'update'])->name('update');
        Route::delete('/{cartItem}', [App\Http\Controllers\CartController::class, 'destroy'])->name('destroy');
    });
    
    // Order routes
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/', [App\Http\Controllers\OrderController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\OrderController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\OrderController::class, 'store'])->name('store');
        Route::get('/{order}', [App\Http\Controllers\OrderController::class, 'show'])->name('show');
        Route::put('/{order}', [App\Http\Controllers\OrderController::class, 'update'])->name('update');
    });
});

// Seller routes
Route::middleware(['auth', 'verified'])->prefix('seller')->name('seller.')->group(function () {
    Route::resource('products', App\Http\Controllers\ProductController::class);
});

// Admin routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [App\Http\Controllers\AdminController::class, 'index'])->name('dashboard');
    Route::get('/users', [App\Http\Controllers\AdminUserController::class, 'index'])->name('users');
    Route::get('/products', [App\Http\Controllers\AdminProductController::class, 'index'])->name('products');
    Route::get('/orders', [App\Http\Controllers\AdminOrderController::class, 'index'])->name('orders');
    Route::get('/reports', [App\Http\Controllers\AdminReportController::class, 'index'])->name('reports');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
