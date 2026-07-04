'use client';

import React from 'react';

const ChartsDocumentation = () => {
    const chartTypes = [
        {
            number: 1,
            name: 'Line Chart',
            description: 'Displays data as a series of points connected by lines',
            useCase: 'Ideal for showing trends over time, comparing multiple series',
            components: 'LineChart, Line, XAxis, YAxis',
            features: ['Smooth or stepped lines', 'Multiple data series', 'Dot indicators', 'Tooltips']
        },
        {
            number: 2,
            name: 'Bar Chart',
            description: 'Represents data using rectangular bars with heights proportional to values',
            useCase: 'Best for comparing values across different categories',
            components: 'BarChart, Bar, XAxis, YAxis',
            features: ['Vertical or horizontal bars', 'Multiple data series', 'Stack bars', 'Custom colors']
        },
        {
            number: 3,
            name: 'Area Chart',
            description: 'Similar to line chart but with the area under the line filled with color',
            useCase: 'Great for showing cumulative values, emphasizing magnitude of change',
            components: 'AreaChart, Area, XAxis, YAxis',
            features: ['Gradient fills', 'Stacked areas', 'Multiple series', 'Smooth animations']
        },
        {
            number: 4,
            name: 'Pie Chart',
            description: 'Displays proportional segments of a whole circle',
            useCase: 'Perfect for showing composition and percentage breakdown',
            components: 'PieChart, Pie, Cell',
            features: ['Custom colors', 'Labels', 'Legend', 'Tooltips', 'Exploded slices']
        },
        {
            number: 5,
            name: 'Radar Chart',
            description: 'Displays multivariate data on axes radiating from a central point',
            useCase: 'Excellent for comparing multiple attributes of different items',
            components: 'RadarChart, Radar, PolarGrid, PolarAngleAxis',
            features: ['Multiple series', 'Filled areas', 'Custom angles', 'Legends']
        },
        {
            number: 6,
            name: 'Scatter Chart',
            description: 'Shows data points using Cartesian coordinates',
            useCase: 'Best for showing correlation between two variables',
            components: 'ScatterChart, Scatter, XAxis, YAxis',
            features: ['Multiple data sets', 'Bubble sizes', 'Custom shapes', 'Trend lines']
        },
        {
            number: 7,
            name: 'Composed Chart',
            description: 'Combines multiple chart types (bars, lines, areas) in one visualization',
            useCase: 'Useful for comparing different metrics with different scales',
            components: 'ComposedChart, Bar, Line, Area',
            features: ['Mixed chart types', 'Dual axes', 'Multiple series', 'Flexible layout']
        },
        {
            number: 8,
            name: 'Radial Bar Chart',
            description: 'Displays bar data arranged in a circular pattern',
            useCase: 'Good for comparing values in a circular arrangement',
            components: 'RadialBarChart, RadialBar',
            features: ['Circular layout', 'Background', 'Animations', 'Customizable angles']
        },
        {
            number: 9,
            name: 'Treemap',
            description: 'Shows hierarchical data as nested rectangles',
            useCase: 'Perfect for displaying hierarchical structures and parts-to-whole relationships',
            components: 'Treemap, Tooltip',
            features: ['Nested rectangles', 'Color coding', 'Hierarchical data', 'Interactive']
        },
        {
            number: 10,
            name: 'Sankey Diagram',
            description: 'Represents flow between different categories or nodes',
            useCase: 'Excellent for showing flow relationships and energy transfer',
            components: 'Sankey, Link, Node',
            features: ['Flow visualization', 'Node connections', 'Customizable links', 'Data flow tracking']
        },
        {
            number: 11,
            name: 'Funnel Chart',
            description: 'Shows progressive reduction of data through stages',
            useCase: 'Ideal for sales funnels, conversion rates, and process flows',
            components: 'FunnelChart, Funnel, Cell',
            features: ['Stage representation', 'Percentage labels', 'Color coding', 'Data reduction']
        },
        {
            number: 12,
            name: 'Stacked Area Chart',
            description: 'Area chart where multiple series are stacked on top of each other',
            useCase: 'Best for showing both composition and trend over time',
            components: 'AreaChart, Area with stackId',
            features: ['Stacked areas', 'Total trend', 'Color differentiation', 'Smooth curves']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Recharts Library Guide</h1>
                <p className="text-gray-600 mb-8">Complete documentation of all 12 chart types</p>

                <div className="grid gap-8">
                    {chartTypes.map((chart) => (
                        <div key={chart.number} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-lg">
                                        {chart.number}
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{chart.name}</h2>
                                    <p className="text-gray-700 mb-4">{chart.description}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-700 mb-2">Use Case:</h3>
                                            <p className="text-gray-600">{chart.useCase}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700 mb-2">Key Components:</h3>
                                            <p className="text-gray-600 font-mono text-sm bg-gray-100 p-2 rounded">
                                                {chart.components}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-700 mb-2">Features:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {chart.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Installation Instructions */}
                <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Installation</h2>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono mb-4">
                        npm install recharts
                    </div>
                    <p className="text-gray-700">Recharts is a React charting library composed of composable React components.</p>
                </div>

                {/* Basic Usage Example */}
                <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Basic Usage Example</h2>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        {`import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400, pv: 2400 },
  { name: 'Feb', value: 300, pv: 1398 },
  { name: 'Mar', value: 200, pv: 9800 },
];

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}`}
                    </pre>
                </div>

                {/* Navigation to Demo */}
                <div className="bg-blue-50 rounded-lg shadow-lg p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">View Live Examples</h2>
                    <p className="text-gray-700 mb-4">
                        Visit the charts page to see all 12 chart types with live examples and interactive features.
                    </p>
                    <a
                        href="/charts"
                        className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Go to Charts Dashboard →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ChartsDocumentation;
