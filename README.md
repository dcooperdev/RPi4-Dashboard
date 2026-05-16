# 🚀 RPi4 Autonomous Trading Dashboard

![Coverage](https://img.shields.io/badge/Coverage-100%25-success)
![React](https://img.shields.io/badge/React-19.2-blue)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange)
![Vitest](https://img.shields.io/badge/Vitest-TDD-yellow)

A highly optimized, fault-tolerant React dashboard designed specifically for resource-constrained environments (Raspberry Pi 4). It provides real-time monitoring of cryptocurrency assets, hardware metrics, and autonomous trading agents.

## 🏗️ Architectural Decisions & Engineering Constraints

This project was built to address specific hardware limitations and ensure high availability in production:

* **Performance-First Rendering:** Eliminated dynamic DOM resizing listeners (e.g., Recharts' `ResponsiveContainer`) in favor of static dimensions. This prevents continuous CPU spikes on the Raspberry Pi during high-frequency data ticks.
* **State Segregation:**
    * **Zustand:** Handles synchronous, high-frequency UI state mutations. Utilizes O(1) dictionary lookups for rapid bot metric updates and atomic LIFO arrays for transaction history.
    * **React Query:** Dedicated to asynchronous server state, caching, and polling orchestration to strictly separate UI rendering logic from data fetching.
* **Fault Tolerance (Graceful Degradation):** The UI is strictly engineered to survive catastrophic backend failures (e.g., HTTP 500, WebSocket drops, corrupt JSON payloads). Fallback mechanisms ensure the dashboard retains cached state rather than triggering fatal React errors.

## 🧪 Testing Strategy (100% Coverage)

The project enforces strict Test-Driven Development (TDD) using **Vitest** and **React Testing Library**.

* **Unit Tests:** Validates Zustand store immutability, data normalization, and atomic state logic.
* **Integration Tests:** Actively simulates infrastructure failures (backend crashes, null payloads) to guarantee UI resilience.
* **Metrics:** 100% coverage across statements, branches, functions, and lines.

```bash
# Run the test suite with coverage report
pnpm run coverage
```

## 🛠️ Tech Stack

* **Frontend Ecosystem:** React 19, Vite
* **State Management:** Zustand, TanStack Query
* **Data Visualization:** Recharts
* **Testing:** Vitest, React Testing Library, JSDOM, React Doctor

## 🚀 Getting Started (Simulator Mode)

To facilitate evaluation without requiring the live Python/FastAPI backend, the dashboard includes a simulator mode utilizing static mock data.

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/rpi4-dashboard.git](https://github.com/yourusername/rpi4-dashboard.git)
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm run dev
   ```