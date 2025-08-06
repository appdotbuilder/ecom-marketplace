<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('quantity')->default(0);
            $table->json('images')->nullable();
            $table->enum('status', ['draft', 'active', 'inactive', 'sold'])->default('draft');
            $table->boolean('featured')->default(false);
            $table->json('specifications')->nullable();
            $table->timestamps();
            
            // Add indexes
            $table->index('seller_id');
            $table->index('category_id');
            $table->index('slug');
            $table->index('status');
            $table->index('featured');
            $table->index('price');
            $table->index(['status', 'featured']);
            $table->index(['category_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};