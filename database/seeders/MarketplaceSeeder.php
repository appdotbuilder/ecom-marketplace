<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MarketplaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@marketplace.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'bio' => 'Administrator of the marketplace',
            'is_active' => true,
        ]);

        // Create test seller
        $seller = User::create([
            'name' => 'John Seller',
            'email' => 'seller@marketplace.com',
            'password' => Hash::make('password'),
            'role' => 'seller',
            'bio' => 'Professional seller with quality products',
            'phone' => '+1234567890',
            'address' => '123 Seller Street, Business City, BC 12345',
            'is_active' => true,
        ]);

        // Create test buyer
        $buyer = User::create([
            'name' => 'Jane Buyer',
            'email' => 'buyer@marketplace.com',
            'password' => Hash::make('password'),
            'role' => 'buyer',
            'bio' => 'Love shopping for quality products',
            'phone' => '+1234567891',
            'address' => '456 Buyer Avenue, Shopping City, SC 54321',
            'is_active' => true,
        ]);

        // Create categories
        $categories = [
            ['name' => 'Electronics', 'description' => 'Gadgets, computers, and electronic devices'],
            ['name' => 'Fashion', 'description' => 'Clothing, shoes, and accessories'],
            ['name' => 'Home & Garden', 'description' => 'Furniture, decor, and garden supplies'],
            ['name' => 'Sports & Outdoors', 'description' => 'Sports equipment and outdoor gear'],
            ['name' => 'Books', 'description' => 'Books, magazines, and educational materials'],
            ['name' => 'Health & Beauty', 'description' => 'Skincare, makeup, and health products'],
            ['name' => 'Toys & Games', 'description' => 'Toys, board games, and educational games'],
            ['name' => 'Automotive', 'description' => 'Car parts, accessories, and tools'],
        ];

        foreach ($categories as $categoryData) {
            Category::create([
                'name' => $categoryData['name'],
                'slug' => \Illuminate\Support\Str::slug($categoryData['name']),
                'description' => $categoryData['description'],
                'is_active' => true,
            ]);
        }

        // Create additional users
        User::factory()->count(20)->create();

        // Create products
        Product::factory()->count(50)->create();

        // Create some orders with order items
        $orders = Order::factory()->count(20)->create();

        foreach ($orders as $order) {
            $products = Product::active()->inRandomOrder()->limit(random_int(1, 5))->get();
            
            foreach ($products as $product) {
                $quantity = random_int(1, 3);
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $product->price,
                    'total' => $quantity * $product->price,
                ]);
            }
        }
    }
}