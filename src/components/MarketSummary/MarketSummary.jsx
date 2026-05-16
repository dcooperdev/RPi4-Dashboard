import { lazy, Suspense } from 'react';
import useGenericStore from '../../store/useGenericStore';

const AssetChart = lazy(() => import('./AssetChart'));

const MarketSummary = () => {
    const assets = useGenericStore((state) => state.assets);
    const assetsArray = Object.entries(assets);

    return (
        <>
            <h2>Market Summary</h2>
            <div className="marketSummary">
                {assetsArray?.map(([symbol, data]) => (
                    <div key={symbol} className="element" style={{ minHeight: '200px' }}>
                        <p className='cardTitle'>{symbol}</p>
                        <p>Price: {data?.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                        <p>Change: {data?.change.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                        <p>Volume: {data?.volume.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                        <div style={{ width: '100%', height: '80px', display: 'block', clear: 'both', relative: 'position' }}>
                            <Suspense fallback={<div style={{ width: '100%', height: 80, backgroundColor: '#333' }} />}>
                                <AssetChart chartData={data?.chartData || []} />
                            </Suspense>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MarketSummary;
