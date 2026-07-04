'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const AreaChartComponent = ({ data, title = 'Area Chart' }) => {
    return (
        <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-bold text-heading mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} style={{ backgroundColor: 'var(--color-card)' }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted)" />
                    <YAxis stroke="var(--color-muted)" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-primary)"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AreaChartComponent;
