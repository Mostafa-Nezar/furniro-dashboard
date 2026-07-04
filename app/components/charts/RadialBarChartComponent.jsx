'use client';

import React from 'react';
import {
    RadialBarChart,
    RadialBar,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const RadialBarChartComponent = ({ data, title = 'Radial Bar Chart' }) => {
    return (
        <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-bold text-heading mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="10%"
                    outerRadius="90%"
                    data={data}
                    style={{ backgroundColor: 'var(--color-card)' }}
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
    );
};

export default RadialBarChartComponent;
