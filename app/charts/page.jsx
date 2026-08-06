'use client';

import React, { useMemo } from 'react';
import { useAppContext } from '../context/context';
import { useProductContext } from '../context/prosuctcontext';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    PieChart,
    Pie,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ScatterChart,
    Scatter,
    ComposedChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
    Treemap,
    Sankey,
    FunnelChart,
    Funnel,
    Cell,
} from 'recharts';

const ChartsPage = () => {
    const { orders, usersData } = useAppContext();
    const { products, categories } = useProductContext();

    const COLORS = ['#475569', '#64748b', '#0f766e', '#2f855a', '#d97706'];
    const chartTextStyle = { fill: '#cbd5e1', fontSize: 12 };

    const totalRevenue = useMemo(
        () => orders.reduce((sum, order) => sum + (order.total || 0), 0),
        [orders],
    );

    const lineData = useMemo(() => {
        const monthlyMap = new Map();

        orders.forEach((order) => {
            const createdAt = order.createdAt || order.date;
            const date = new Date(createdAt);
            if (!createdAt || Number.isNaN(date.getTime())) return;

            const key = `${date.getFullYear()}-${date.getMonth()}`;
            const name = date.toLocaleString('en-US', { month: 'short', year: '2-digit' });
            const current = monthlyMap.get(key) || { name, value: 0, pv: 0 };

            current.value += 1;
            current.pv += order.total || 0;

            monthlyMap.set(key, current);
        });

        return Array.from(monthlyMap)
            .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
            .map(([, value]) => value)
            .slice(-6);
    }, [orders]);

    const barData = useMemo(() => {
        const performance = new Map();

        orders.forEach((order) => {
            const items = order.items || [];
            items.forEach((item) => {
                const product = products.find((p) => p._id === item.productId);
                if (!product) return;

                const name = String(product.name || 'Unknown');
                const current = performance.get(name) || { sales: 0, revenue: 0 };
                const quantity = item.quantity || 1;

                current.sales += quantity;
                current.revenue += (item.price || 0) * quantity;
                performance.set(name, current);
            });
        });

        return Array.from(performance)
            .map(([name, data]) => ({ name, sales: data.sales, revenue: data.revenue }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);
    }, [orders, products]);

    const pieData = useMemo(
        () =>
            categories
                .map((category) => ({
                    name: String(category.name || 'Uncategorized'),
                    value: products.filter((product) => product.category === category._id).length,
                }))
                .filter((entry) => entry.value > 0),
        [categories, products],
    );

    const radarData = useMemo(() => {
        const totalStock = products.reduce((sum, product) => sum + (product.quantity || 0), 0);
        const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

        return [
            { subject: 'Orders', A: Math.min(orders.length * 4, 150), B: Math.min(orders.length * 2, 150), fullMark: 150 },
            { subject: 'Users', A: Math.min(usersData.length * 3, 150), B: Math.min(orders.length * 2, 150), fullMark: 150 },
            { subject: 'Revenue', A: Math.min(totalRevenue / 1000, 150), B: Math.min(avgOrderValue / 10, 150), fullMark: 150 },
            { subject: 'Products', A: Math.min(products.length * 3, 150), B: Math.min(categories.length * 5, 150), fullMark: 150 },
            { subject: 'Categories', A: Math.min(categories.length * 10, 150), B: Math.min(usersData.length * 2, 150), fullMark: 150 },
            { subject: 'Stock', A: Math.min(totalStock / 5, 150), B: Math.min(totalStock / 10, 150), fullMark: 150 },
        ];
    }, [orders.length, usersData.length, products.length, categories.length, totalRevenue, products]);

    const scatterData = useMemo(
        () =>
            products.map((product) => ({
                x: Number(product.price) || 0,
                y: Number(product.quantity) || 0,
                z: Number(product.price || 0) * (Number(product.quantity) || 1),
            })),
        [products],
    );

    const radialData = useMemo(() => {
        const statusTotals = orders.reduce((acc, order) => {
            const status = String(order.status || 'pending');
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(statusTotals).map(([name, count], index) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            uv: Number(count),
            pv: Number(count) * 100,
            fill: COLORS[index % COLORS.length],
        }));
    }, [orders]);

    const treeData = useMemo(
        () =>
            categories.map((category) => ({
                name: String(category.name || 'Unknown'),
                children: products
                    .filter((product) => product.category === category._id)
                    .map((product) => ({
                        name: String(product.name || 'Product').slice(0, 20),
                        value: Number(product.quantity) || 1,
                    })),
            })),
        [categories, products],
    );

    const sankeyData = useMemo(() => {
        const completed = orders.filter((order) => order.status === 'completed').length;
        const pending = orders.filter((order) => order.status === 'pending').length;
        const cancelled = orders.filter((order) => order.status === 'cancelled').length;

        return {
            nodes: [
                { name: 'All Orders' },
                { name: 'Placed' },
                { name: 'Completed' },
                { name: 'Pending' },
                { name: 'Cancelled' },
            ],
            links: [
                { source: 0, target: 1, value: orders.length },
                { source: 1, target: 2, value: completed },
                { source: 1, target: 3, value: pending },
                { source: 1, target: 4, value: cancelled },
            ],
        };
    }, [orders]);

    const funnelData = useMemo(
        () => [
            { name: 'Total Users', value: usersData.length },
            { name: 'Visited', value: Math.floor(usersData.length * 0.7) },
            { name: 'Viewed Products', value: Math.floor(usersData.length * 0.5) },
            { name: 'Added to Cart', value: Math.floor(usersData.length * 0.3) },
            { name: 'Purchased', value: orders.length },
        ],
        [usersData.length, orders.length],
    );

    return (
        <div className="min-h-screen bg-app p-6 md:p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-surface/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm">
                    <h1 className="text-3xl font-bold text-heading">Statistics</h1>
                </div>

                {/* 1. Line Chart */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">1. Line Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <YAxis tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                            <Legend wrapperStyle={{ color: '#f3f4f6' }} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#7c3aed"
                                strokeWidth={2.5}
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#0ea5e9"
                                strokeWidth={2.5}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 2. Bar Chart */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">2. Bar Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <YAxis tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                            <Legend wrapperStyle={{ color: '#f3f4f6' }} />
                            <Bar dataKey="sales" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="revenue" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* 3. Area Chart */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">3. Area Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={lineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <YAxis tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#7c3aed"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* 4. Pie Chart */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">4. Pie Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={100}
                                fill="#7c3aed"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* 5. Radar Chart */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">5. Radar Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="#475569" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                            <PolarRadiusAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                            <Radar name="Series A" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.6} />
                            <Radar name="Series B" dataKey="B" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
                            <Legend wrapperStyle={{ color: '#f3f4f6' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* 6. Scatter Chart */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">6. Scatter Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                            <XAxis dataKey="x" tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <YAxis dataKey="y" tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                            <Scatter name="Data" data={scatterData} fill="#7c3aed" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                {/* 7. Composed Chart */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">7. Composed Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={lineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <YAxis tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                            <Legend wrapperStyle={{ color: '#f3f4f6' }} />
                            <Bar dataKey="value" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                            <Line type="monotone" dataKey="pv" stroke="#f59e0b" strokeWidth={2.5} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* 8. Radial Bar Chart */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">8. Radial Bar Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="10%"
                            outerRadius="90%"
                            data={radialData}
                        >
                            <RadialBar
                                background
                                dataKey="uv"
                                cornerRadius={10}
                                label={{ position: 'insideStartAngle', fill: '#f3f4f6', fontSize: 12 }}
                                fill="#0ea5e9"
                            />
                            <Legend wrapperStyle={{ color: '#f3f4f6' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>

                {/* 9. Treemap */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">9. Treemap Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <Treemap
                            data={treeData}
                            dataKey="value"
                            stroke="#fff"
                            fill="#7c3aed"
                        />
                    </ResponsiveContainer>
                </div>

                {/* 10. Sankey Diagram */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">10. Sankey Diagram</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <Sankey data={sankeyData} node={{ fill: '#7c3aed' }} link={{ stroke: '#f59e0b' }}>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                        </Sankey>
                    </ResponsiveContainer>
                </div>

                {/* 11. Funnel Chart */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">11. Funnel Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <FunnelChart>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                            <Funnel
                                dataKey="value"
                                data={funnelData}
                                isAnimationActive
                            >
                                {funnelData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Funnel>
                        </FunnelChart>
                    </ResponsiveContainer>
                </div>

                {/* 12. Stacked Area Chart */}
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-card/90 p-6 shadow-lg shadow-black/10">
                    <h2 className="mb-4 text-2xl font-bold text-heading">12. Stacked Area Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={lineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <YAxis tick={chartTextStyle} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #2d3748', color: '#f3f4f6' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#7c3aed"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#colorValue2)"
                            />
                            <Area
                                type="monotone"
                                dataKey="pv"
                                stroke="#0ea5e9"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#colorPv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ChartsPage;
