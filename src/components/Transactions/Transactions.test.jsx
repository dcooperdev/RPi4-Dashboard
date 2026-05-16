import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Transactions from './Transactions';
import useGenericStore from '../../store/useGenericStore';

describe('Transactions Component', () => {
    it('should render the transaction table with data from store', () => {
        const testHistory = [
            {
                symbol: 'TEST/USDT',
                side: 'BUY',
                type: 'LIMIT',
                status: 'FILLED',
                price: 100,
                amount: 1,
                timestamp: '2026-05-16T12:00:00Z',
                finalPnl: 10
            }
        ];
        
        useGenericStore.setState({ history: testHistory });
        
        render(<Transactions />);
        
        expect(screen.getByText('TEST/USDT')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should handle empty history array', () => {
        useGenericStore.setState({ history: [] });
        
        render(<Transactions />);
        
        const rows = screen.queryAllByRole('row');
        // Only the header row should be present
        expect(rows.length).toBe(1);
    });
});
