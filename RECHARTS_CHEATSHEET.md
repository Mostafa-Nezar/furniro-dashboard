# Recharts Quick Reference Guide

## Installation
```bash
npm install recharts
```

## Quick Import Template
```jsx
'use client';
import { ResponsiveContainer } from 'recharts';
import React from 'react';
```

## Chart Types Quick Reference

| Chart | Import | Use Case | Key Prop |
|-------|--------|----------|----------|
| Line | `LineChart`, `Line` | Trends | `dataKey` |
| Bar | `BarChart`, `Bar` | Comparison | `dataKey` |
| Area | `AreaChart`, `Area` | Cumulative | `dataKey` |
| Pie | `PieChart`, `Pie` | Composition | `dataKey` |
| Radar | `RadarChart`, `Radar` | Multi-attribute | `dataKey` |
| Scatter | `ScatterChart`, `Scatter` | Correlation | `x`/`y` |
| Composed | `ComposedChart` | Mixed | All |
| RadialBar | `RadialBarChart` | Circular | `dataKey` |
| Treemap | `Treemap` | Hierarchy | `dataKey` |
| Sankey | `Sankey` | Flow | nodes/links |
| Funnel | `FunnelChart`, `Funnel` | Conversion | `dataKey` |
| StackedArea | `AreaChart` with `stackId` | Combined | `stackId` |

## Common Components

### Axes
```jsx
<XAxis dataKey="name" />
<YAxis />
<PolarAngleAxis dataKey="subject" />
<PolarRadiusAxis />
```

### Interactive Elements
```jsx
<CartesianGrid strokeDasharray="3 3" />
<Tooltip />
<Legend />
<Cell fill="#8884d8" />  // For Pie, Funnel
```

### Container & Responsive
```jsx
<ResponsiveContainer width="100%" height={300}>
  {/* Chart here */}
</ResponsiveContainer>
```

## Most Common Color Palette
```jsx
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
```

## Data Format Examples

### Default (Line/Bar/Area)
```javascript
[
  { name: 'Jan', value: 400, pv: 2400 },
  { name: 'Feb', value: 300, pv: 1398 }
]
```

### Pie
```javascript
[
  { name: 'A', value: 400 },
  { name: 'B', value: 300 }
]
```

### Radar
```javascript
[
  { subject: 'Math', A: 120, B: 110, fullMark: 150 }
]
```

### Scatter
```javascript
[
  { x: 100, y: 200, z: 200 }
]
```

### Sankey
```javascript
{
  nodes: [{ name: 'A' }, { name: 'B' }],
  links: [{ source: 0, target: 1, value: 10 }]
}
```

## Component Props Cheat Sheet

### Shared Props
```jsx
<LineChart 
  data={data}                    // Data array
  width={800}                    // Width (optional with ResponsiveContainer)
  height={300}                   // Height
  margin={{ top: 5, right: 30 }} // Margins
  isAnimationActive={true}       // Enable animations
>
```

### Line/Bar/Area
```jsx
<Line 
  type="monotone"                // "monotone", "linear", "step", etc.
  dataKey="value"                // Property name from data
  stroke="#8884d8"               // Line color
  dot={true}                     // Show dots
  activeDot={{ r: 8 }}           // Hover effect
  isAnimationActive={true}
/>
```

### Pie
```jsx
<Pie
  data={data}
  dataKey="value"
  cx="50%"                       // Center X
  cy="50%"                       // Center Y
  outerRadius={100}              // Size
  innerRadius={50}               // Donut hole
  label={true}                   // Show labels
/>
```

### Radar
```jsx
<Radar
  name="Series A"
  dataKey="A"
  stroke="#8884d8"
  fill="#8884d8"
  fillOpacity={0.6}
  isAnimationActive={true}
/>
```

## Common Patterns

### Gradient Fill
```jsx
<defs>
  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
  </linearGradient>
</defs>
<Area fill="url(#colorValue)" />
```

### Multiple Series with Colors
```jsx
{COLORS.map((color, index) => (
  <Line key={index} dataKey={keys[index]} stroke={COLORS[index]} />
))}
```

### Custom Tooltip
```jsx
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return <div>{payload[0].value}</div>;
  }
  return null;
};

<Tooltip content={<CustomTooltip />} />
```

### Stacked Chart
```jsx
<Area type="monotone" dataKey="a" stackId="1" fill="#8884d8" />
<Area type="monotone" dataKey="b" stackId="1" fill="#82ca9d" />
```

## Performance Optimization

```jsx
// Memoize chart component
const MemoChart = React.memo(({ data }) => (
  <LineChart data={data}>
    {/* Chart content */}
  </LineChart>
));

// Disable animations for large datasets
<LineChart isAnimationActive={false}>

// Use shouldComponentUpdate (class) or useMemo (hooks)
const memoData = useMemo(() => processData(rawData), [rawData]);
```

## Responsive Container Usage
```jsx
// Always wrap charts for responsiveness
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    {/* Chart components */}
  </LineChart>
</ResponsiveContainer>
```

## Styling Tips

### With Tailwind
```jsx
<div className="bg-white rounded-lg shadow-lg p-6">
  <h2 className="text-2xl font-bold mb-4">Chart Title</h2>
  <ResponsiveContainer width="100%" height={300}>
    {/* Chart */}
  </ResponsiveContainer>
</div>
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Chart not showing | Wrap in ResponsiveContainer with height |
| Data not displaying | Check `dataKey` matches data properties |
| Wrong colors | Verify COLORS array length matches data |
| Performance slow | Disable animations, reduce data points |
| Overlapping labels | Adjust font size, rotate XAxis |
| Legend overlap | Use `layout="vertical"` |

## File Structure
```
app/
├── charts/
│   ├── page.jsx                    # All charts dashboard
│   ├── documentation/page.jsx      # Detailed docs
│   └── index/page.jsx              # Navigation hub
└── components/charts/
    ├── LineChartComponent.jsx
    ├── BarChartComponent.jsx
    ├── AreaChartComponent.jsx
    ├── PieChartComponent.jsx
    ├── RadarChartComponent.jsx
    ├── ScatterChartComponent.jsx
    ├── ComposedChartComponent.jsx
    ├── RadialBarChartComponent.jsx
    ├── TreemapComponent.jsx
    ├── SankeyComponent.jsx
    ├── FunnelChartComponent.jsx
    └── StackedAreaChartComponent.jsx
```

## Quick Access Links

- **Dashboard**: `/charts`
- **Documentation**: `/charts/documentation`
- **Navigation**: `/charts/index`

## Resources

- [Official Docs](https://recharts.org/)
- [API Reference](https://recharts.org/en-US/api)
- [Examples](https://recharts.org/en-US/examples)

---

**Pro Tip**: Copy-paste the basic structure from `/app/components/charts/` for new charts!
