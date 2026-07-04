# Recharts Integration - Complete Setup

This project includes a complete implementation of **Recharts** with all 12 available chart types, reusable components, and comprehensive documentation.

## Installation

Recharts has already been installed in your project. To reinstall or update:

```bash
npm install recharts
```

## Project Structure

```
app/
├── charts/
│   ├── page.jsx                 # Main dashboard with all 12 charts
│   ├── documentation/
│   │   └── page.jsx             # Complete documentation
│   └── index/
│       └── page.jsx             # Navigation hub
└── components/
    └── charts/
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

## Available Chart Types

### 1. **Line Chart**
- **Use Case**: Trends over time, comparing multiple series
- **Components**: `LineChart`, `Line`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `Legend`
- **Features**: Smooth/stepped lines, multiple series, animations

```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>
```

### 2. **Bar Chart**
- **Use Case**: Comparing values across categories
- **Components**: `BarChart`, `Bar`, `XAxis`, `YAxis`, `CartesianGrid`
- **Features**: Vertical/horizontal orientation, stacked bars, custom colors

```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="sales" fill="#8884d8" />
    <Bar dataKey="revenue" fill="#82ca9d" />
  </BarChart>
</ResponsiveContainer>
```

### 3. **Area Chart**
- **Use Case**: Cumulative values, emphasizing magnitude
- **Components**: `AreaChart`, `Area`, `XAxis`, `YAxis`
- **Features**: Gradient fills, stacked areas, smooth animations

```jsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data}>
    <defs>
      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="value" fill="url(#colorValue)" />
  </AreaChart>
</ResponsiveContainer>
```

### 4. **Pie Chart**
- **Use Case**: Composition and percentage breakdown
- **Components**: `PieChart`, `Pie`, `Cell`, `Legend`
- **Features**: Custom colors, labels, exploded slices

```jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value">
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
```

### 5. **Radar Chart**
- **Use Case**: Comparing multiple attributes
- **Components**: `RadarChart`, `Radar`, `PolarGrid`, `PolarAngleAxis`
- **Features**: Multiple series, filled areas, custom angles

```jsx
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <RadarChart data={data}>
    <PolarGrid />
    <PolarAngleAxis dataKey="subject" />
    <Radar name="Series A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    <Tooltip />
  </RadarChart>
</ResponsiveContainer>
```

### 6. **Scatter Chart**
- **Use Case**: Correlation between two variables
- **Components**: `ScatterChart`, `Scatter`, `XAxis`, `YAxis`
- **Features**: Multiple datasets, bubble sizes, custom shapes

```jsx
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <ScatterChart>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="x" />
    <YAxis dataKey="y" />
    <Tooltip />
    <Scatter name="Data" data={data} fill="#8884d8" />
  </ScatterChart>
</ResponsiveContainer>
```

### 7. **Composed Chart**
- **Use Case**: Comparing different metrics
- **Components**: `ComposedChart`, `Bar`, `Line`, `Area`, `XAxis`, `YAxis`
- **Features**: Mixed chart types, dual axes, flexible layout

```jsx
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <ComposedChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" fill="#8884d8" />
    <Line type="monotone" dataKey="pv" stroke="#ff7300" />
  </ComposedChart>
</ResponsiveContainer>
```

### 8. **Radial Bar Chart**
- **Use Case**: Circular value comparison
- **Components**: `RadialBarChart`, `RadialBar`, `PolarGrid`
- **Features**: Circular layout, background, animations

```jsx
import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="90%" data={data}>
    <RadialBar background dataKey="uv" cornerRadius={10} />
    <Tooltip />
  </RadialBarChart>
</ResponsiveContainer>
```

### 9. **Treemap**
- **Use Case**: Hierarchical structures
- **Components**: `Treemap`, `Tooltip`
- **Features**: Nested rectangles, color coding, interactive

```jsx
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <Treemap data={data} dataKey="value" stroke="#fff" fill="#8884d8" />
</ResponsiveContainer>
```

### 10. **Sankey Diagram**
- **Use Case**: Flow relationships and energy transfer
- **Components**: `Sankey`, `Link`, `Node`, `Tooltip`
- **Features**: Flow visualization, node connections, customizable links

```jsx
import { Sankey, Tooltip, ResponsiveContainer } from 'recharts';

const sankeyData = {
  nodes: [
    { name: 'Node A' },
    { name: 'Node B' },
  ],
  links: [
    { source: 0, target: 1, value: 10 }
  ]
};

<ResponsiveContainer width="100%" height={300}>
  <Sankey data={sankeyData} node={{ fill: '#8884d8' }} link={{ stroke: '#d084d0' }}>
    <Tooltip />
  </Sankey>
</ResponsiveContainer>
```

### 11. **Funnel Chart**
- **Use Case**: Sales funnels, conversion rates
- **Components**: `FunnelChart`, `Funnel`, `Cell`, `Tooltip`
- **Features**: Stage representation, percentage labels, color coding

```jsx
import { FunnelChart, Funnel, Cell, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <FunnelChart>
    <Tooltip />
    <Funnel dataKey="value" data={data} isAnimationActive>
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Funnel>
  </FunnelChart>
</ResponsiveContainer>
```

### 12. **Stacked Area Chart**
- **Use Case**: Composition and trend over time
- **Components**: `AreaChart`, `Area` (with stackId), `XAxis`, `YAxis`
- **Features**: Stacked areas, total trend, color differentiation

```jsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="value" stackId="1" fill="#8884d8" />
    <Area type="monotone" dataKey="pv" stackId="1" fill="#82ca9d" />
  </AreaChart>
</ResponsiveContainer>
```

## Accessing the Charts

1. **Main Dashboard**: Visit `/charts` to see all 12 chart types with live examples
2. **Documentation**: Visit `/charts/documentation` for detailed information about each chart
3. **Navigation Hub**: Visit `/charts/index` for quick access to all resources

## Customization Tips

### Colors
```jsx
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

<Pie data={data}>
  {data.map((entry, index) => (
    <Cell fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>
```

### Responsive Container
```jsx
<ResponsiveContainer width="100%" height={300}>
  {/* Your chart component */}
</ResponsiveContainer>
```

### Custom Tooltips
```jsx
<Tooltip 
  content={({ active, payload }) => {
    if (active && payload && payload.length) {
      return <div>{payload[0].value}</div>;
    }
    return null;
  }}
/>
```

### Animations
```jsx
<LineChart data={data} isAnimationActive={true}>
  <Line isAnimationActive={true} />
</LineChart>
```

## Common Data Formats

### Simple Format (Line, Bar, Area)
```javascript
const data = [
  { name: 'Jan', value: 400, pv: 2400 },
  { name: 'Feb', value: 300, pv: 1398 },
];
```

### Pie Chart Format
```javascript
const data = [
  { name: 'Category A', value: 400 },
  { name: 'Category B', value: 300 },
];
```

### Radar Chart Format
```javascript
const data = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'English', A: 98, B: 130, fullMark: 150 },
];
```

### Sankey Format
```javascript
const data = {
  nodes: [
    { name: 'Node A' },
    { name: 'Node B' },
  ],
  links: [
    { source: 0, target: 1, value: 10 }
  ]
};
```

## Resources

- [Recharts Official Documentation](https://recharts.org/)
- [Recharts GitHub Repository](https://github.com/recharts/recharts)
- [Chart.js Comparison](https://recharts.org/en-US/guide/installation)

## Browser Support

Recharts supports all modern browsers. For IE11 and older, you may need additional polyfills.

## Performance Tips

1. Use `ResponsiveContainer` for automatic scaling
2. Limit data points for better performance
3. Use `isAnimationActive={false}` for large datasets
4. Consider virtual scrolling for very large datasets
5. Memoize expensive data transformations

## Troubleshooting

### Chart not showing
- Ensure `ResponsiveContainer` has a fixed height
- Check that data format matches expected structure
- Verify `dataKey` matches data object properties

### Performance issues
- Reduce number of data points
- Disable animations for large datasets
- Use React.memo for chart components

### Styling issues
- Ensure TailwindCSS is properly configured
- Use responsive container for proper sizing
- Check z-index for overlapping elements

---

**Enjoy creating beautiful charts with Recharts!** 📊
