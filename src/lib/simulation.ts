// Simulation Service (Singleton)
// Manages the state of Pools, Market, and Logs

export interface Pool {
    id: number;
    name: string;
    balance: number;
    members: number;
    type: 'Bonds' | 'Equities' | 'Derivatives' | 'Gold' | 'Mixed';
}

export interface DepositEvent {
    id: number;
    poolId: number;
    amount: number;
    name: string;
    timestamp: number;
}

class SimulationService {
    private static instance: SimulationService;

    public pools: Pool[] = [];
    public depositEvents: DepositEvent[] = [];
    public logs: string[] = [];
    public goldPrice: number = 2034.50;
    public pnl: number = 4250.00;

    private lastUpdate: number = Date.now();

    private constructor() {
        this.initializePools();
        this.initializeLogs();
    }

    public static getInstance(): SimulationService {
        if (!SimulationService.instance) {
            SimulationService.instance = new SimulationService();
        }
        return SimulationService.instance;
    }

    private initializePools() {
        this.pools = Array.from({ length: 24 }, (_, i) => {
            const id = i + 1;
            let name = `Alpha Pool ${id}`;
            let balance = 10000 * id;
            let members = 5 * id;
            let type: Pool['type'] = 'Mixed';

            if (id === 1) {
                name = "Secure Bonds";
                balance = 84567.00;
                members = 142;
                type = 'Bonds';
            } else if (id === 2) {
                name = "Global Equities";
                balance = 124892.45;
                members = 21;
                type = 'Equities';
            } else if (id === 24) {
                name = "Titanium Gold";
                balance = 2245687.00;
                members = 3;
                type = 'Gold';
            }

            return { id, name, balance, members, type };
        });
    }

    private initializeLogs() {
        this.logs = [
            "[SYSTEM] INITIALIZING ALGO_EXEC_V4...",
            "[NETWORK] CONNECTED TO LIQUIDITY POOL A",
            "[SCAN] SEARCHING FOR ARBITRAGE OPPORTUNITIES...",
        ];
    }

    // Update State based on time delta
    public update() {
        const now = Date.now();
        const delta = now - this.lastUpdate;

        // Only update if at least 1 second has passed
        if (delta < 1000) return;

        const ticks = Math.floor(delta / 1000);
        this.lastUpdate = now;

        // 1. Update Pools
        this.pools = this.pools.map(pool => {
            let newBalance = pool.balance;
            let newMembers = pool.members;

            // Global Growth (1% daily => ~0.0000115% per second)
            // Accelerated: 0.001% per tick
            newBalance += newBalance * (0.00001 * ticks);

            // Level 1 Events (Random Deposits)
            if (pool.id === 1 && Math.random() < (0.05 * ticks)) {
                const deposit = 500 + Math.random() * 1500;
                newBalance += deposit;

                const names = ["Alex M.", "Sarah K.", "J.R.", "Mike T.", "CryptoWhale"];
                const newEvent: DepositEvent = {
                    id: now,
                    poolId: 1,
                    amount: deposit,
                    name: names[Math.floor(Math.random() * names.length)],
                    timestamp: now
                };
                this.depositEvents = [newEvent, ...this.depositEvents].slice(0, 10);
            }

            // Level 2 Events (Member Updates)
            if (pool.id === 2 && Math.random() < (0.03 * ticks)) {
                if (Math.random() > 0.5) newMembers += 1;
            }

            return { ...pool, balance: newBalance, members: newMembers };
        });

        // 2. Update Market Data
        if (Math.random() < (0.5 * ticks)) {
            const change = (Math.random() - 0.5) * 1.5;
            this.goldPrice = Number((this.goldPrice + change).toFixed(2));
            this.pnl = Number((this.pnl + (change * 10)).toFixed(2));
        }

        // 3. Update Logs
        if (Math.random() < (0.3 * ticks)) {
            const logTemplates = [
                "SCANNING: EURUSD, GBPUSD, XAUUSD...",
                "SIGNAL: XAUUSD RSI(14) < 30 OVERSOLD",
                "CHECK: VOLATILITY INDEX < 20.0 [PASS]",
                "EXEC: BUY XAUUSD @ MARKET",
                "ORDER FILLED #8829102",
                "MONITORING: TRAILING STOP ACTIVATED",
                "ANALYZING: MARKET DEPTH...",
                "PING: 12ms TO LONDON SERVER",
                "UPDATE: SPREAD OPTIMIZED",
                "ALERT: HIGH VOLUME DETECTED IN US30"
            ];
            const newLog = `[${new Date().toLocaleTimeString()}] ${logTemplates[Math.floor(Math.random() * logTemplates.length)]}`;
            this.logs = [...this.logs.slice(-7), newLog];
        }
    }
}

// Export Singleton
export const simulation = SimulationService.getInstance();
