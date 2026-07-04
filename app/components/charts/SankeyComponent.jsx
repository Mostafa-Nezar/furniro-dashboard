'use client';

import React from 'react';
import {
    Sankey,
    Sink,
    Link,
    Node,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const SankeyComponent = ({ data, title = 'Sankey Diagram' }) => {
    return (
        <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-bold text-heading mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <Sankey data={data} node={{ fill: 'var(--color-primary)' }} link={{ stroke: 'var(--color-secondary)' }} style={{ backgroundColor: 'var(--color-card)' }}>
                    <Tooltip />
                </Sankey>
            </ResponsiveContainer>
        </div>
    );
};

export default SankeyComponent;
