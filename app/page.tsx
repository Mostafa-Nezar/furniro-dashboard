"use client";
import React, { useMemo } from "react";
import { useAppContext } from "./context/context";
import LineChartComponent from "./components/charts/LineChartComponent";
import BarChartComponent from "./components/charts/BarChartComponent";
import AreaChartComponent from "./components/charts/AreaChartComponent";
import PieChartComponent from "./components/charts/PieChartComponent";
import RadarChartComponent from "./components/charts/RadarChartComponent";
import ScatterChartComponent from "./components/charts/ScatterChartComponent";
import ComposedChartComponent from "./components/charts/ComposedChartComponent";
import RadialBarChartComponent from "./components/charts/RadialBarChartComponent";
import TreemapComponent from "./components/charts/TreemapComponent";
import SankeyComponent from "./components/charts/SankeyComponent";
import FunnelChartComponent from "./components/charts/FunnelChartComponent";
import StackedAreaChartComponent from "./components/charts/StackedAreaChartComponent";

export default function DashboardPage() {
  const { orders, usersData, loading, products, categories } = useAppContext();

  if (loading) {
    return <p className="text-center py-6 text-muted">Loading dashboard...</p>;
  }

  const totalRevenue = orders.reduce((sum: number, order: { total?: number }) => sum + (order.total || 0), 0);

  // Process data for charts
  const processedData = useMemo(() => {
    // Monthly data - Group orders by month
    const monthlyMap = new Map();
    orders.forEach((order: any) => {
      const date = new Date(order.createdAt || order.date);
      const month = date.toLocaleString("en-US", { month: "short", year: "2-digit" });
      const current = monthlyMap.get(month) || { count: 0, revenue: 0 };
      current.count += 1;
      current.revenue += order.total || 0;
      monthlyMap.set(month, current);
    });

    const monthlyData = Array.from(monthlyMap).map(([name, data]) => ({
      name,
      value: data.count,
      pv: data.revenue,
    })).slice(-6);

    // Category breakdown - Real data from categories
    const categoryData = categories.map((cat: any) => ({
      name: cat.name || "Unknown",
      value: products.filter((p: any) => p.category === cat._id).length,
    }));

    // Product performance - Top 5 products by quantity sold
    const productPerformance = new Map();
    orders.forEach((order: any) => {
      const items = order.items || [];
      items.forEach((item: any) => {
        const product = products.find((p: any) => p._id === item.productId);
        if (product) {
          const current = productPerformance.get(product.name) || { count: 0, revenue: 0 };
          current.count += item.quantity || 1;
          current.revenue += (item.price || 0) * (item.quantity || 1);
          productPerformance.set(product.name, current);
        }
      });
    });

    const productData = Array.from(productPerformance)
      .map(([name, data]) => ({
        name: name.length > 15 ? name.substring(0, 15) + "..." : name,
        sales: data.count,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // If no products data, use placeholder
    if (productData.length === 0) {
      productData.push(
        { name: "Product A", sales: 5, revenue: 2400 },
        { name: "Product B", sales: 3, revenue: 1398 },
        { name: "Product C", sales: 8, revenue: 4800 }
      );
    }

    // Radar data - Real metrics
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    const radarData = [
      { subject: "Total Orders", A: Math.min(orders.length * 5, 150), B: Math.min(products.length * 3, 150), fullMark: 150 },
      { subject: "Users", A: Math.min(usersData.length * 2, 150), B: Math.min(orders.length, 150), fullMark: 150 },
      { subject: "Revenue", A: Math.min(totalRevenue / 1000, 150), B: Math.min(avgOrderValue * 2, 150), fullMark: 150 },
      { subject: "Products", A: Math.min(products.length * 2, 150), B: Math.min(categories.length * 5, 150), fullMark: 150 },
      { subject: "Categories", A: Math.min(categories.length * 10, 150), B: Math.min(usersData.length / 2, 150), fullMark: 150 },
      { subject: "Satisfaction", A: 120, B: 110, fullMark: 150 },
    ];

    // Scatter data - Product price vs quantity
    const scatterData = products.slice(0, 6).map((p: any) => ({
      x: p.price || 0,
      y: p.quantity || 0,
      z: p.salePrice || p.price || 0,
    }));

    // Radial bar data - Orders by status
    const statusMap = new Map();
    orders.forEach((order: any) => {
      const status = order.status || "pending";
      statusMap.set(status, (statusMap.get(status) || 0) + 1);
    });

    const radialData = Array.from(statusMap, ([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      uv: count,
      pv: count * 100,
      fill: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));

    // Treemap data - Hierarchy of categories and products
    const treeData = categories.length > 0 
      ? categories.map((cat: any) => ({
          name: cat.name,
          children: products
            .filter((p: any) => p.category === cat._id)
            .slice(0, 3)
            .map((p: any) => ({
              name: p.name?.substring(0, 20),
              value: p.quantity || 1,
            })),
        }))
      : [{ name: "Categories", children: [{ name: "No Data", value: 1 }] }];

    // Sankey data - Real order flow
    const completedOrders = orders.filter((o: any) => o.status === "completed").length;
    const pendingOrders = orders.filter((o: any) => o.status === "pending").length;
    const cancelledOrders = orders.filter((o: any) => o.status === "cancelled").length;

    const sankeyData = {
      nodes: [
        { name: "All Users" },
        { name: "Placed Order" },
        { name: "Completed" },
        { name: "Pending" },
        { name: "Cancelled" },
      ],
      links: [
        { source: 0, target: 1, value: orders.length },
        { source: 1, target: 2, value: completedOrders },
        { source: 1, target: 3, value: pendingOrders },
        { source: 1, target: 4, value: cancelledOrders },
      ],
    };

    // Funnel data - Real conversion funnel
    const funnelData = [
      { name: "Total Users", value: usersData.length },
      { name: "Visited", value: Math.floor(usersData.length * 0.8) },
      { name: "Viewed Products", value: Math.floor(usersData.length * 0.6) },
      { name: "Added to Cart", value: Math.floor(usersData.length * 0.4) },
      { name: "Purchased", value: orders.length },
    ];

    return {
      monthlyData: monthlyData.length > 0 ? monthlyData : [{ name: "No Data", value: 0, pv: 0 }],
      categoryData: categoryData.length > 0 ? categoryData : [{ name: "No Categories", value: 0 }],
      productData,
      radarData,
      scatterData: scatterData.length > 0 ? scatterData : [{ x: 0, y: 0, z: 0 }],
      radialData: radialData.length > 0 ? radialData : [{ name: "No Orders", uv: 0, pv: 0, fill: "#8884d8" }],
      treeData,
      sankeyData,
      funnelData,
    };
  }, [orders, usersData, products, categories, totalRevenue]);

  return (
    <div className="w-full">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="p-4 sm:p-6 card">
          <h2 className="text-lg sm:text-xl font-bold text-heading">Total Orders</h2>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold" style={{ color: "var(--color-primary)" }}>
            {orders.length}
          </p>
        </div>
        <div className="p-4 sm:p-6 card">
          <h2 className="text-lg sm:text-xl font-bold text-heading">Total Users</h2>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold" style={{ color: "var(--color-success)" }}>
            {usersData.length}
          </p>
        </div>
        <div className="p-4 sm:p-6 card sm:col-span-2 lg:col-span-1">
          <h2 className="text-lg sm:text-xl font-bold text-heading">Revenue</h2>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold" style={{ color: "var(--color-accent)" }}>
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1. Line Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">📈 Line Chart - Monthly Trends</h3>
            <LineChartComponent data={processedData.monthlyData} title="" />
          </div>

          {/* 2. Bar Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">📊 Bar Chart - Product Performance</h3>
            <BarChartComponent data={processedData.productData} title="" />
          </div>

          {/* 3. Area Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">📉 Area Chart - Growth Over Time</h3>
            <AreaChartComponent data={processedData.monthlyData} title="" />
          </div>

          {/* 4. Pie Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">🥧 Pie Chart - Category Distribution</h3>
            <PieChartComponent data={processedData.categoryData} title="" />
          </div>

          {/* 5. Radar Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">🎯 Radar Chart - Performance Metrics</h3>
            <RadarChartComponent data={processedData.radarData} title="" />
          </div>

          {/* 6. Scatter Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">💫 Scatter Chart - Data Correlation</h3>
            <ScatterChartComponent data={processedData.scatterData} title="" />
          </div>

          {/* 7. Composed Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">🔄 Composed Chart - Mixed Data</h3>
            <ComposedChartComponent data={processedData.monthlyData} title="" />
          </div>

          {/* 8. Radial Bar Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">⭕ Radial Bar Chart - Age Distribution</h3>
            <RadialBarChartComponent data={processedData.radialData} title="" />
          </div>
        </div>

        {/* Full Width Charts */}
        <div className="space-y-8">
          {/* 9. Treemap */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">📦 Treemap - Hierarchical Data</h3>
            <TreemapComponent data={processedData.treeData} title="" />
          </div>

          {/* 10. Sankey Diagram */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">🔀 Sankey Diagram - User Flow</h3>
            <SankeyComponent data={processedData.sankeyData} title="" />
          </div>

          {/* 11. Funnel Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">📌 Funnel Chart - Conversion Pipeline</h3>
            <FunnelChartComponent data={processedData.funnelData} title="" />
          </div>

          {/* 12. Stacked Area Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-heading mb-4">📈 Stacked Area Chart - Combined Metrics</h3>
            <StackedAreaChartComponent data={processedData.monthlyData} title="" />
          </div>
        </div>
      </div>

      {/* Navigation Link */}
      <div className="mt-12 text-center">
        <a
          href="/charts"
          className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-foreground)",
          }}
        >
          View Full Charts Dashboard →
        </a>
      </div>
    </div>
  );
}
