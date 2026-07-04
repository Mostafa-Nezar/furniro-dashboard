'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const LineChartComponent = ({ data, title = 'Line Chart' }) => {
    return (
        <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-bold text-heading mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} style={{ backgroundColor: 'var(--color-card)' }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted)" />
                    <YAxis stroke="var(--color-muted)" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="var(--color-primary)" dot={{ fill: 'var(--color-primary)' }} />
                    <Line type="monotone" dataKey="pv" stroke="var(--color-success)" dot={{ fill: 'var(--color-success)' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;
