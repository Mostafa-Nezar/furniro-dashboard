'use client';

import React from 'react';
import {
    Treemap,
    ResponsiveContainer,
} from 'recharts';

const TreemapComponent = ({ data, title = 'Treemap Chart' }) => {
    return (
        <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-bold text-heading mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <Treemap
                    data={data}
                    dataKey="value"
                    stroke="#fff"
                    fill="var(--color-primary)"
                    style={{ backgroundColor: 'var(--color-card)' }}
                />
            </ResponsiveContainer>
        </div>
    );
};

export default TreemapComponent;
