import { lazy } from 'react';

const LineChart = lazy(() => import('recharts').then(m => ({ default: m.LineChart })));
const Line = lazy(() => import('recharts').then(m => ({ default: m.Line })));
const YAxis = lazy(() => import('recharts').then(m => ({ default: m.YAxis })));

const AssetChart = ({ chartData }) => (
    <div style={{ width: '100%', height: '80px' }}>
        <LineChart width="100%" height={80} data={chartData}>
            <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} strokeWidth={2} />
            <YAxis hide domain={['auto', 'auto']} />
        </LineChart>
    </div>
);

export default AssetChart;
