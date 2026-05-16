import { describe, it, expect, beforeEach } from 'vitest';
import useGenericStore from './useGenericStore';

describe('useGenericStore Unit Tests', () => {
    // Reset store state before each test if necessary, 
    // although Zustand's create creates a singleton, we should be careful.
    // For these tests, we'll verify transitions from current state or initial.

    describe('Asset Handling', () => {
        it('should update asset price and volume without breaking object references', () => {
            const initialState = useGenericStore.getState();
            const btcKey = 'btc';
            const originalBtc = initialState.assets[btcKey];
            
            const newData = { price: 65000, volume: 36000000 };
            
            useGenericStore.getState().updateAsset(btcKey, newData);
            
            const updatedState = useGenericStore.getState();
            const updatedBtc = updatedState.assets[btcKey];

            // Validate values
            expect(updatedBtc.price).toBe(65000);
            expect(updatedBtc.volume).toBe(36000000);
            
            // Validate immutability: the assets object itself should be new
            expect(updatedState.assets).not.toBe(initialState.assets);
            // The specific asset object should also be new
            expect(updatedBtc).not.toBe(originalBtc);
            // Ensure other assets (like eth) are preserved (reference equality if unchanged)
            expect(updatedState.assets.eth).toBe(initialState.assets.eth);
        });
    });

    describe('Bot Management', () => {
        it('should register a new bot indexed by ID', () => {
            const botId = 'BOT-NEW-1';
            const initialData = { version: '1.1', genome: 'gamma_v2' };
            
            useGenericStore.getState().registerBot(botId, initialData);
            
            const state = useGenericStore.getState();
            expect(state.bots[botId]).toBeDefined();
            expect(state.bots[botId].id).toBe(botId);
            expect(state.bots[botId].version).toBe('1.1');
            expect(state.bots[botId].status).toBe('active');
        });

        it('should update bot metrics atomically by ID', () => {
            const botId = 'BOT-7fb2';
            const initialMetrics = useGenericStore.getState().bots[botId].metrics;
            const newMetrics = { fitnessScore: 0.95, profitFactor: 2.5 };
            
            useGenericStore.getState().updateBotMetrics(botId, newMetrics);
            
            const state = useGenericStore.getState();
            const updatedBot = state.bots[botId];
            
            expect(updatedBot.metrics.fitnessScore).toBe(0.95);
            expect(updatedBot.metrics.profitFactor).toBe(2.5);
            // Ensure other metrics are preserved
            expect(updatedBot.metrics.successRate).toBe(initialMetrics.successRate);
            // Ensure reference is updated
            expect(updatedBot.metrics).not.toBe(initialMetrics);
        });
    });

    describe('History Management (LIFO)', () => {
        it('should insert new records at index 0', () => {
            const newRecord = {
                symbol: 'ETH/USDT',
                side: 'BUY',
                type: 'MARKET',
                status: 'FILLED',
                price: 3500,
                amount: 1,
                timestamp: new Date().toISOString(),
                finalPnl: null
            };

            const previousFirstRecord = useGenericStore.getState().history[0];
            
            useGenericStore.getState().addHistory(newRecord);
            
            const history = useGenericStore.getState().history;
            expect(history[0]).toEqual(newRecord);
            expect(history[1]).toBe(previousFirstRecord);
        });
    });
});
