<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CartItem>
 */
class CartItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::buyers()->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'buyer'])->id,
            'product_id' => Product::active()->inRandomOrder()->first()->id ?? Product::factory()->create()->id,
            'quantity' => $this->faker->numberBetween(1, 5),
        ];
    }
}