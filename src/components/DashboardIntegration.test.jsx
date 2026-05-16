import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useGenericStore from '../store/useGenericStore';
import StatusBar from './StatusBar/StatusBar';
import MarketSummary from './MarketSummary/MarketSummary';
import ActiveBots from './ActiveBots/ActiveBots';

describe('Dashboard Integration and Graceful Degradation', () => {
    
    beforeEach(() => {
        // Reset store to a known state before each test if needed
        // For these integration tests, we'll manipulate the store directly
    });

    it('should handle 500 Internal Server Error (Graceful Degradation)', async () => {
        // 1. Simulate "Online" state first to ensure data is present
        await act(async () => {
            useGenericStore.setState({ isOnline: true });
        });
        
        // Render StatusBar and check it's Online
        const { rerender } = render(<StatusBar />);
        expect(screen.getByText(/Online: 🟢/i)).toBeInTheDocument();

        // 2. Simulate Backend Collapse (isOnline: false)
        await act(async () => {
            useGenericStore.setState({ isOnline: false });
        });
        
        // Rerender StatusBar
        rerender(<StatusBar />);
        expect(screen.getByText(/Online: 🔴/i)).toBeInTheDocument();

        // 3. Verify that rendering components still have access to the last valid data (Cached in Store)
        render(<MarketSummary />);
        render(<ActiveBots />);

        // Check if BTC price from initial store state is still visible
        expect(screen.getByText(/BTC/i)).toBeInTheDocument();
        expect(screen.getByText(/\$64,250.50/i)).toBeInTheDocument();

        // Check if Bots are still listed
        expect(screen.getByText(/BOT-7fb2/i)).toBeInTheDocument();
    });

    it('should handle Corrupt or Incomplete Payloads (Null/Undefined Safety)', async () => {
        // Simulate a bot with null metrics
        const corruptBotId = 'BOT-CORRUPT';
        await act(async () => {
            useGenericStore.getState().registerBot(corruptBotId, {
                version: '1.0',
                genome: 'corrupt_v1',
                metrics: null // Simulating corrupted payload from FastAPI
            });
        });

        render(<ActiveBots />);

        // Verify the corrupt bot is rendered without crashing
        expect(screen.getByText(new RegExp(corruptBotId, 'i'))).toBeInTheDocument();
        
        // Check for fallback values (?? 0)
        // Since ActiveBots uses bot.metrics?.fitnessScore ?? 0
        const fitnessScores = screen.getAllByText(/Fitness Score:/i);
        // Find the one corresponding to the corrupt bot or just check all fallbacks work
        expect(screen.getAllByText(/Fitness Score: 0/i).length).toBeGreaterThan(0);
    });
});
