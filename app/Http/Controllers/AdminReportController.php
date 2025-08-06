<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminReportController extends Controller
{
    /**
     * Display admin reports.
     */
    public function index()
    {
        // Sales by month
        $salesByMonth = Order::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as orders'),
            DB::raw('SUM(total) as revenue')
        )
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        // Top categories
        $topCategories = Category::select('categories.*')
            ->join('products', 'categories.id', '=', 'products.category_id')
            ->join('order_items', 'products.id', '=', 'order_items.product_id')
            ->select('categories.*', DB::raw('SUM(order_items.quantity) as total_sold'))
            ->groupBy('categories.id')
            ->orderBy('total_sold', 'desc')
            ->get();

        // User registration by month
        $usersByMonth = User::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as users')
        )
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        return Inertia::render('admin/reports', [
            'salesByMonth' => $salesByMonth,
            'topCategories' => $topCategories,
            'usersByMonth' => $usersByMonth,
        ]);
    }
}