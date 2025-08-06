<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->randomElement([
            'Electronics',
            'Fashion',
            'Home & Garden',
            'Sports & Outdoors',
            'Automotive',
            'Books',
            'Health & Beauty',
            'Toys & Games',
            'Food & Beverages',
            'Art & Crafts'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence(10),
            'image' => null,
            'is_active' => true,
        ];
    }
}