'use client';

import React from 'react';
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
    Sink,
    Link,
    FunnelChart,
    Funnel,
    Cell,
} from 'recharts';

const ChartsPage = () => {
    // Sample data for charts
    const lineData = [
        { name: 'Jan', value: 400, pv: 2400 },
        { name: 'Feb', value: 300, pv: 1398 },
        { name: 'Mar', value: 200, pv: 9800 },
        { name: 'Apr', value: 278, pv: 3908 },
        { name: 'May', value: 189, pv: 4800 },
        { name: 'Jun', value: 239, pv: 3800 },
    ];

    const barData = [
        { name: 'Product A', sales: 400, revenue: 2400 },
        { name: 'Product B', sales: 300, revenue: 1398 },
        { name: 'Product C', sales: 200, revenue: 9800 },
        { name: 'Product D', sales: 278, revenue: 3908 },
        { name: 'Product E', sales: 189, revenue: 4800 },
    ];

    const pieData = [
        { name: 'Category A', value: 400 },
        { name: 'Category B', value: 300 },
        { name: 'Category C', value: 300 },
        { name: 'Category D', value: 200 },
    ];

    const radarData = [
        { subject: 'Math', A: 120, B: 110, fullMark: 150 },
        { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
        { subject: 'English', A: 86, B: 130, fullMark: 150 },
        { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
        { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
        { subject: 'History', A: 65, B: 85, fullMark: 150 },
    ];

    const scatterData = [
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 },
        { x: 110, y: 280, z: 200 },
    ];

    const radialData = [
        { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
        { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
        { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
        { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
        { name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c' },
        { name: '50+', uv: 2.63, pv: 4800, fill: '#d084d0' },
    ];

    const treeData = [
        {
            name: 'axis',
            children: [
                { name: 'Axes', value: 10 },
                { name: 'Legend', value: 15 },
                { name: 'Tooltip', value: 10 },
            ],
        },
        {
            name: 'series',
            children: [
                { name: 'Line', value: 20 },
                { name: 'Bar', value: 25 },
                { name: 'Pie', value: 15 },
            ],
        },
    ];

    const sankeyData = {
        nodes: [
            { name: 'Node A' },
            { name: 'Node B' },
            { name: 'Node C' },
            { name: 'Node D' },
            { name: 'Node E' },
        ],
        links: [
            { source: 0, target: 1, value: 10 },
            { source: 0, target: 2, value: 20 },
            { source: 1, target: 3, value: 15 },
            { source: 2, target: 4, value: 25 },
        ],
    };

    const funnelData = [
        { name: 'Visits', value: 100 },
        { name: 'Click', value: 80 },
        { name: 'Add to Cart', value: 50 },
        { name: 'Checkout', value: 30 },
        { name: 'Purchase', value: 20 },
    ];

    const COLORS = ['#7c3aed', '#0ea5e9', '#f59e0b', '#22c55e', '#ef4444'];
    const chartTextStyle = { fill: '#cbd5e1', fontSize: 12 };

    return (
        <div className="min-h-screen bg-app p-6 md:p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-surface/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm">
                    <h1 className="text-3xl font-bold text-heading">Recharts Dashboard</h1>
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
