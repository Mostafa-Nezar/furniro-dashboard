'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data, title = 'Bar Chart' }) => {
    return (
        <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-bold text-heading mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} style={{ backgroundColor: 'var(--color-card)' }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted)" />
                    <YAxis stroke="var(--color-muted)" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="var(--color-primary)" />
                    <Bar dataKey="revenue" fill="var(--color-success)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
