import { create } from 'zustand';

const useGenericStore = create((set) => ({
    isOnline: false,

    hardwareData: {
        cpu: 0,
        ram: 0,
        swap: 0,
        sd: 0,
    },

    assets: {
        btc: {
            price: 64250.50,
            change: 1.25,
            volume: 35000000,
            chartData: [
                { price: 64000 },
                { price: 64100 },
                { price: 64050 },
                { price: 64200 },
                { price: 64150 },
                { price: 64250 }
            ]
        },
        eth: {
            price: 3450.20,
            change: -0.45,
            volume: 18000000,
            chartData: [
                { price: 3480 },
                { price: 3470 },
                { price: 3460 },
                { price: 3440 },
                { price: 3455 },
                { price: 3450 }
            ]
        },
    },

    bots: {
        'BOT-7fb2': {
            id: 'BOT-7fb2',
            version: '1.0',
            genome: 'alpha_v1',
            status: 'active',
            metrics: { fitnessScore: 0.89, successRate: 68.5, totalTrades: 1200, profitFactor: 2.1, maxDrawdown: 4.2 }
        },
        'BOT-a91c': {
            id: 'BOT-a91c',
            version: '2.0',
            genome: 'beta_v2',
            status: 'active',
            metrics: { fitnessScore: 0.94, successRate: 74.2, totalTrades: 850, profitFactor: 2.8, maxDrawdown: 2.1 }
        },
        'BOT-3e44': {
            id: 'BOT-3e44',
            version: '1.0',
            genome: 'gamma_v1',
            status: 'active',
            metrics: { fitnessScore: 0.61, successRate: 52.1, totalTrades: 2100, profitFactor: 1.4, maxDrawdown: 8.5 }
        }
    },

    history: [
        {
            symbol: 'SOL/USDT',
            side: 'SELL',
            type: 'MARKET',
            status: 'FILLED',
            price: 145.1,
            amount: 20,
            timestamp: '2026-05-11T12:15:00Z',
            finalPnl: 52
        },
        {
            symbol: 'SOL/USDT',
            side: 'BUY',
            type: 'LIMIT',
            status: 'FILLED',
            price: 142.5,
            amount: 20,
            timestamp: '2026-05-11T10:30:00Z',
            finalPnl: null // Se renderiza vacío u oculto porque fue la apertura de la posición
        }
    ],

    setOnlineStatus: (status) => set({ isOnline: status }),

    setHardwareData: (newData) => set((state) => ({
        hardwareData: {
            ...state.hardwareData,
            ...newData
        },
    })),

    updateAsset: (key, data) => set((state) => ({
        assets: {
            ...state.assets,
            [key]: { ...state.assets[key], ...data }
        }
    })),

    registerBot: (botId, initialData) => set((state) => ({
        bots: {
            ...state.bots,
            [botId]: {
                id: botId,
                version: initialData.version || '1.0',
                genome: initialData.genome || 'default',
                status: 'active',
                metrics: {
                    pnl: 0,
                    successRate: 0,
                    totalTrades: 0,
                    ...initialData.metrics
                }
            }
        }
    })),

    updateBotMetrics: (botId, newMetrics) => set((state) => ({
        bots: {
            ...state.bots,
            [botId]: {
                ...state.bots[botId],
                metrics: {
                    ...state.bots[botId].metrics,
                    ...newMetrics
                }
            }
        }
    })),

    addHistory: (record) => set((state) => ({
        history: [
            record,
            ...state.history
        ],
    })),
}));

export default useGenericStore;
