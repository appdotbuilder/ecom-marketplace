<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders.
     */
    public function index()
    {
        $orders = Order::with(['items.product'])
            ->where('buyer_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the form for creating a new order.
     */
    public function create()
    {
        $cartItems = CartItem::with(['product.category', 'product.seller'])
            ->where('user_id', Auth::id())
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        $tax = $subtotal * 0.10; // 10% tax
        $total = $subtotal + $tax;

        return Inertia::render('orders/create', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(StoreOrderRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $cartItems = CartItem::with('product')
                ->where('user_id', Auth::id())
                ->get();

            if ($cartItems->isEmpty()) {
                return redirect()->route('cart.index')
                    ->with('error', 'Your cart is empty.');
            }

            // Check stock availability
            foreach ($cartItems as $item) {
                if ($item->product->quantity < $item->quantity) {
                    return redirect()->route('cart.index')
                        ->with('error', "Not enough stock for {$item->product->name}.");
                }
            }

            $subtotal = $cartItems->sum(function ($item) {
                return $item->quantity * $item->product->price;
            });

            $tax = $subtotal * 0.10; // 10% tax
            $total = $subtotal + $tax;

            // Create the order
            $order = Order::create([
                'order_number' => Order::generateOrderNumber(),
                'buyer_id' => Auth::id(),
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $total,
                'status' => 'pending',
                'payment_method' => $request->payment_method,
                'payment_status' => 'pending',
                'shipping_address' => $request->shipping_address,
                'notes' => $request->notes,
            ]);

            // Create order items and update product quantities
            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                    'total' => $item->quantity * $item->product->price,
                ]);

                // Update product quantity
                $item->product->decrement('quantity', $item->quantity);
            }

            // Clear the cart
            CartItem::where('user_id', Auth::id())->delete();

            return redirect()->route('orders.show', $order)
                ->with('success', 'Order placed successfully!');
        });
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        // Ensure the order belongs to the authenticated user
        if ($order->buyer_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403);
        }

        $order->load(['items.product', 'buyer']);

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }

    /**
     * Update the order status (for sellers/admin).
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,delivered,cancelled',
        ]);

        $order->update(['status' => $request->status]);

        if ($request->status === 'shipped') {
            $order->update(['shipped_at' => now()]);
        } elseif ($request->status === 'delivered') {
            $order->update(['delivered_at' => now()]);
        }

        return back()->with('success', 'Order status updated successfully.');
    }
}