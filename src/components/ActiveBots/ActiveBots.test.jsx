import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ActiveBots from './ActiveBots';
import useGenericStore from '../../store/useGenericStore';

describe('ActiveBots Component', () => {
    it('should render bots with fallback values when metrics are missing', () => {
        const testBots = {
            'BOT-MISSING': {
                id: 'BOT-MISSING',
                metrics: null // Missing metrics to trigger fallbacks
            }
        };
        
        useGenericStore.setState({ bots: testBots });
        
        render(<ActiveBots />);
        
        expect(screen.getByText(/BOT-MISSING/i)).toBeInTheDocument();
        // Check for fallback values (?? 0)
        expect(screen.getByText(/Fitness Score: 0/i)).toBeInTheDocument();
        expect(screen.getByText(/Success Rate: 0%/i)).toBeInTheDocument();
        expect(screen.getByText(/Total Trades: 0/i)).toBeInTheDocument();
        expect(screen.getByText(/Profit Factor: 0/i)).toBeInTheDocument();
        expect(screen.getByText(/Max Drawdown: 0%/i)).toBeInTheDocument();
    });
});
