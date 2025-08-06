<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = $this->faker->randomFloat(2, 20, 500);
        $tax = $subtotal * 0.10;
        $total = $subtotal + $tax;

        return [
            'order_number' => Order::generateOrderNumber(),
            'buyer_id' => User::buyers()->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'buyer'])->id,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'processing', 'shipped', 'delivered']),
            'payment_method' => $this->faker->randomElement(['cash_on_delivery', 'simulated_payment']),
            'payment_status' => $this->faker->randomElement(['pending', 'paid']),
            'shipping_address' => $this->faker->address,
            'notes' => $this->faker->optional()->sentence(),
            'shipped_at' => $this->faker->optional(0.7)->dateTimeBetween('-30 days', 'now'),
            'delivered_at' => $this->faker->optional(0.5)->dateTimeBetween('-20 days', 'now'),
        ];
    }
}