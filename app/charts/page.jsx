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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
            <div className="max-w-full">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Recharts Dashboard</h1>
                <p className="text-gray-600 mb-12">All available chart types from Recharts library</p>

                {/* 1. Line Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">1. Line Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#82ca9d"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 2. Bar Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">2. Bar Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" />
                            <Bar dataKey="revenue" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* 3. Area Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">3. Area Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={lineData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* 4. Pie Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">4. Pie Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* 5. Radar Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">5. Radar Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis />
                            <Radar name="Series A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Radar name="Series B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                            <Legend />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* 6. Scatter Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">6. Scatter Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis dataKey="y" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Data" data={scatterData} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                {/* 7. Composed Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">7. Composed Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                            <Line type="monotone" dataKey="pv" stroke="#ff7300" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* 8. Radial Bar Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">8. Radial Bar Chart</h2>
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
                                label={{ position: 'insideStartAngle' }}
                            />
                            <Legend />
                            <Tooltip />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>

                {/* 9. Treemap */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">9. Treemap Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <Treemap
                            data={treeData}
                            dataKey="value"
                            stroke="#fff"
                            fill="#8884d8"
                        />
                    </ResponsiveContainer>
                </div>

                {/* 10. Sankey Diagram */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">10. Sankey Diagram</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <Sankey data={sankeyData} node={{ fill: '#8884d8' }} link={{ stroke: '#d084d0' }}>
                            <Tooltip />
                        </Sankey>
                    </ResponsiveContainer>
                </div>

                {/* 11. Funnel Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">11. Funnel Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <FunnelChart>
                            <Tooltip />
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
                <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">12. Stacked Area Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={lineData}>
                            <defs>
                                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorValue2)"
                            />
                            <Area
                                type="monotone"
                                dataKey="pv"
                                stroke="#82ca9d"
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
