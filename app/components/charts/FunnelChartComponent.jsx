'use client';

import React from 'react';
import {
    FunnelChart,
    Funnel,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const FunnelChartComponent = ({ data, title = 'Funnel Chart' }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-bold text-heading mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <FunnelChart style={{ backgroundColor: 'var(--color-card)' }}>
                    <Tooltip />
                    <Funnel
                        dataKey="value"
                        data={data}
                        isAnimationActive
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Funnel>
                </FunnelChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FunnelChartComponent;
