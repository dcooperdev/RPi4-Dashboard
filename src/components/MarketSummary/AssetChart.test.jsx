import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AssetChart from './AssetChart';

// Mock recharts to avoid JSDOM issues and speed up tests
vi.mock('recharts', () => ({
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    Line: () => <div data-testid="line" />,
    YAxis: () => <div data-testid="y-axis" />,
}));

describe('AssetChart Component', () => {
    it('should render the chart components', async () => {
        const testData = [{ price: 10 }, { price: 20 }];
        
        render(
            <Suspense fallback={<div>Loading…</div>}>
                <AssetChart chartData={testData} />
            </Suspense>
        );
        
        // Since components are lazy loaded, we need to wait
        await waitFor(() => {
            expect(screen.getByTestId('line-chart')).toBeInTheDocument();
        });
        
        expect(screen.getByTestId('line')).toBeInTheDocument();
        expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    });
});
