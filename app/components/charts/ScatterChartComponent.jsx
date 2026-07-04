'use client';

import React from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const ScatterChartComponent = ({ data, title = 'Scatter Chart' }) => {
    return (
        <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-bold text-heading mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} style={{ backgroundColor: 'var(--color-card)' }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="x" stroke="var(--color-muted)" />
                    <YAxis dataKey="y" stroke="var(--color-muted)" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Data" data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ScatterChartComponent;
