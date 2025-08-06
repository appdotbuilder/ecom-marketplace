<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->words(3, true);
        
        return [
            'seller_id' => User::sellers()->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'seller'])->id,
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory()->create()->id,
            'name' => $name,
            'slug' => Str::slug($name) . '-' . Str::random(8),
            'description' => $this->faker->paragraphs(3, true),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'quantity' => $this->faker->numberBetween(0, 100),
            'images' => null,
            'status' => $this->faker->randomElement(['active', 'active', 'active', 'inactive', 'draft']),
            'featured' => $this->faker->boolean(20), // 20% chance of being featured
            'specifications' => [
                'weight' => $this->faker->randomFloat(2, 0.1, 10) . 'kg',
                'dimensions' => $this->faker->numberBetween(5, 50) . 'x' . $this->faker->numberBetween(5, 50) . 'x' . $this->faker->numberBetween(5, 50) . 'cm',
                'color' => $this->faker->colorName(),
                'material' => $this->faker->randomElement(['Plastic', 'Metal', 'Wood', 'Glass', 'Fabric', 'Leather']),
            ],
        ];
    }
}