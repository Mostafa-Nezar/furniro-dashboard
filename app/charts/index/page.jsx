'use client';

import React from 'react';
import Link from 'next/link';

const ChartsIndex = () => {
    const sections = [
        {
            title: 'Dashboard',
            description: 'View all 12 chart types with live interactive examples',
            link: '/charts',
            icon: '📊'
        },
        {
            title: 'Documentation',
            description: 'Complete guide with descriptions, use cases, and features for each chart',
            link: '/charts/documentation',
            icon: '📖'
        },
        {
            title: 'Components',
            description: 'Reusable chart components for your project',
            link: '/components/charts',
            icon: '⚙️'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">Recharts Integration</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Complete setup of Recharts library with all 12 chart types, reusable components, and comprehensive documentation
                    </p>
                </div>

                {/* Main Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {sections.map((section, index) => (
                        <Link
                            key={index}
                            href={section.link}
                            className="group"
                        >
                            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full hover:-translate-y-2">
                                <div className="text-5xl mb-4">{section.icon}</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">{section.title}</h2>
                                <p className="text-gray-600 mb-4">{section.description}</p>
                                <div className="text-blue-500 font-semibold group-hover:text-blue-700 transition-colors">
                                    Explore →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What You Get</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-500 mb-2">12</div>
                            <p className="text-gray-600">Chart Types</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-500 mb-2">12</div>
                            <p className="text-gray-600">Components</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-500 mb-2">∞</div>
                            <p className="text-gray-600">Customization</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-500 mb-2">✓</div>
                            <p className="text-gray-600">Responsive</p>
                        </div>
                    </div>
                </div>

                {/* Chart Types Preview */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">All Available Charts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            '1. Line Chart',
                            '2. Bar Chart',
                            '3. Area Chart',
                            '4. Pie Chart',
                            '5. Radar Chart',
                            '6. Scatter Chart',
                            '7. Composed Chart',
                            '8. Radial Bar Chart',
                            '9. Treemap',
                            '10. Sankey Diagram',
                            '11. Funnel Chart',
                            '12. Stacked Area Chart'
                        ].map((chart, idx) => (
                            <div key={idx} className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                <span className="text-2xl font-bold text-blue-500 mr-3">#</span>
                                <span className="text-gray-700">{chart}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Start */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg p-8 mt-16 text-white">
                    <h2 className="text-3xl font-bold mb-4">Quick Start</h2>
                    <p className="mb-6 text-blue-100">Get started with Recharts in your project:</p>
                    <div className="space-y-4">
                        <div>
                            <p className="font-semibold mb-2">1. Install the package:</p>
                            <code className="block bg-blue-900 p-3 rounded font-mono">npm install recharts</code>
                        </div>
                        <div>
                            <p className="font-semibold mb-2">2. Import a component:</p>
                            <code className="block bg-blue-900 p-3 rounded font-mono">
                                import {`{ LineChart, Line, XAxis, YAxis }`} from 'recharts'
                            </code>
                        </div>
                        <div>
                            <p className="font-semibold mb-2">3. Use in your component:</p>
                            <code className="block bg-blue-900 p-3 rounded font-mono text-sm">
                                &lt;LineChart data={`{data}`}&gt;...&lt;/LineChart&gt;
                            </code>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-16 text-center">
                    <Link
                        href="/charts"
                        className="inline-block px-8 py-4 bg-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg"
                    >
                        View Charts Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChartsIndex;
