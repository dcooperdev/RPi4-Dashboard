import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MarketSummary from './MarketSummary';
import useGenericStore from '../../store/useGenericStore';

describe('MarketSummary Component', () => {
    it('should render assets and handle missing chart data fallback', async () => {
        const testAssets = {
            'EMPTY-ASSET': {
                price: 100,
                change: 5,
                volume: 1000,
                chartData: null // Missing chart data to trigger || []
            }
        };
        
        useGenericStore.setState({ assets: testAssets });
        
        render(
            <Suspense fallback={<div>Loading…</div>}>
                <MarketSummary />
            </Suspense>
        );
        
        expect(screen.getByText('EMPTY-ASSET')).toBeInTheDocument();
        expect(screen.getByText(/\$100.00/i)).toBeInTheDocument();
        
        // AssetChart is lazy loaded, it should eventually render (or its fallback)
        // Since we are testing the branch in MarketSummary, just seeing the component render is enough
        // but we can wait for the lazy component if needed.
    });
});
