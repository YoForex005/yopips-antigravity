"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Activity, Wallet, PieChart, TrendingUp, Cpu } from "lucide-react";

export default function Dashboard() {
    const [marketData, setMarketData] = useState({ goldPrice: 2034.50, pnl: 0 });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [userStats, setUserStats] = useState({ balance: 0, invested: 0, equity: 0 });
    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState<any[]>([]);

    // Fetch Live Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [marketRes, userRes, investRes, txRes] = await Promise.all([
                    fetch('/api/market'),
                    fetch('/api/user'),
                    fetch('/api/invest'),
                    fetch('/api/transactions')
                ]);

                const market = await marketRes.json();
                const user = await userRes.json();
                const invest = await investRes.json();
                const tx = await txRes.json();

                setMarketData({ goldPrice: market.goldPrice, pnl: market.pnl });
                setRecentActivity(tx.slice(0, 5));
                setAssets(invest.assets || []);

                // Calculate Equity
                const investedAmount = invest.investments.reduce((sum: number, i: any) => sum + i.amount, 0);
                // Simplified PnL for demo (randomized fluctuation based on market PnL)
                const currentPnL = investedAmount > 0 ? (market.pnl / 10000) * investedAmount : 0;

                setUserStats({
                    balance: user.balance,
                    invested: investedAmount,
                    equity: user.balance + investedAmount + currentPnL
                });
                setLoading(false);

            } catch (e) {
                console.error("Dashboard fetch error", e);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Slower interval for full refresh
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="text-[var(--color-primary)] font-mono animate-pulse p-8">INITIALIZING_DASHBOARD_MODULES...</div>;

    // Calculate Transparency Metrics
    const totalGlobalAUM = assets.reduce((acc, asset) => acc + (asset.totalPoolSize || 0), 0);
    const avgFloatingPnl = assets.length > 0
        ? assets.reduce((acc, asset) => acc + (asset.currentFloating || 0), 0) / assets.length
        : 0;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-widest uppercase text-glow">Overview_Module</h1>
                    <p className="text-[var(--color-text-secondary)] mt-1 text-xs font-mono">:: WELCOME_BACK_INSTITUTIONAL_CLIENT ::</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => alert("REPORT_GENERATION_INITIATED... CHECK_EMAIL_IN_5_MINS")}
                        className="btn btn-outline text-xs"
                    >
                        <span className="mr-2">[</span> DOWNLOAD_REPORT <span className="ml-2">]</span>
                    </button>
                    <Link href="/dashboard/wallet">
                        <button className="btn btn-primary text-xs font-bold">
                            INITIATE_DEPOSIT
                        </button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Equity */}
                <div className="card group hover:border-[var(--color-primary)] transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-[var(--color-text-secondary)] text-xs uppercase tracking-widest">Total_Equity</div>
                        <div className="p-2 border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
                            <Wallet size={18} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 tracking-tighter font-mono text-glow">
                        ${userStats.equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="flex items-center text-xs text-[var(--color-success)] bg-[var(--color-success)]/10 w-fit px-2 py-1 border border-[var(--color-success)]/30">
                        <ArrowUpRight size={14} className="mr-1" />
                        <span className="font-bold tracking-wider">+{(marketData.pnl / 9800).toFixed(2)}% (24H)</span>
                    </div>
                </div>

                {/* Daily PnL */}
                <div className="card group hover:border-[var(--color-success)] transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-[var(--color-text-secondary)] text-xs uppercase tracking-widest">Daily_PnL</div>
                        <div className="p-2 border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 text-[var(--color-success)]">
                            <Activity size={18} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-[var(--color-success)] mb-2 tracking-tighter font-mono text-glow">
                        {userStats.invested > 0 ? "+" : ""}${userStats.invested > 0 ? (marketData.pnl / 100).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider">Realized_Profit_Today</div>
                </div>

                {/* Active Pools (Transparency) */}
                <div className="card group hover:border-blue-500 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-[var(--color-text-secondary)] text-xs uppercase tracking-widest">Global_Liquidity</div>
                        <div className="p-2 border border-blue-500/30 bg-blue-500/5 text-blue-500">
                            <Cpu size={18} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 tracking-tighter font-mono">
                        ${(totalGlobalAUM / 1000000).toFixed(1)}M
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-[var(--color-text-secondary)] uppercase tracking-wider">Avg_Floating_PnL</span>
                        <span className="text-[var(--color-success)] font-bold">+{avgFloatingPnl.toFixed(2)}%</span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Active Allocations (Chart Placeholder) */}
                <div className="lg:col-span-2 card p-0">
                    <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-black/40">
                        <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                            <PieChart size={16} className="mr-2 text-[var(--color-primary)]" />
                            Portfolio_Allocation
                        </h2>
                        <button className="text-xs text-[var(--color-primary)] hover:text-white transition-colors uppercase tracking-wider">[ DETAILS ]</button>
                    </div>

                    <div className="p-8 flex items-center justify-center bg-[var(--color-bg)]/50 relative overflow-hidden min-h-[300px]">
                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
                                backgroundSize: '40px 40px'
                            }}>
                        </div>

                        {userStats.invested === 0 ? (
                            <div className="text-center z-10">
                                <div className="text-[var(--color-text-muted)] text-xs font-mono mb-4 uppercase tracking-widest">:: NO_ASSETS_ALLOCATED ::</div>
                                <div className="w-32 h-32 rounded-full border-2 border-dashed border-[var(--border-color)] mx-auto flex items-center justify-center opacity-50">
                                    <PieChart size={32} className="text-[var(--color-text-muted)]" />
                                </div>
                            </div>
                        ) : (
                            /* CSS Wireframe Pie Chart */
                            <div className="relative w-64 h-64">
                                <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)] opacity-20 animate-pulse"></div>
                                <div className="absolute inset-2 rounded-full border border-[var(--color-primary)] opacity-40 border-dashed animate-[spin_10s_linear_infinite]"></div>

                                {/* Segments */}
                                <div className="absolute inset-0 rounded-full border-[32px] border-transparent border-t-[var(--color-primary)] rotate-45 opacity-80 filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                                <div className="absolute inset-0 rounded-full border-[32px] border-transparent border-r-[var(--color-success)] rotate-12 opacity-80 filter drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]"></div>
                                <div className="absolute inset-0 rounded-full border-[28px] border-transparent border-b-blue-500 rotate-[-45deg] opacity-80"></div>

                                {/* Center Label */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center bg-black/80 backdrop-blur-sm p-4 border border-[var(--border-color)]">
                                        <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">Top_Asset</div>
                                        <div className="text-2xl font-bold text-white font-mono">GOLD</div>
                                        <div className="text-sm text-[var(--color-primary)] font-bold">45.0%</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-[var(--border-color)] border-t border-[var(--border-color)] bg-black/40">
                        <div className="p-4 text-center">
                            <div className="text-[10px] text-[var(--color-text-secondary)] mb-1 font-bold uppercase tracking-wider">Gold (XAU)</div>
                            <div className="text-[var(--color-primary)] font-bold text-lg font-mono">{userStats.invested > 0 ? "45%" : "0%"}</div>
                        </div>
                        <div className="p-4 text-center">
                            <div className="text-[10px] text-[var(--color-text-secondary)] mb-1 font-bold uppercase tracking-wider">Equities</div>
                            <div className="text-[var(--color-success)] font-bold text-lg font-mono">{userStats.invested > 0 ? "35%" : "0%"}</div>
                        </div>
                        <div className="p-4 text-center">
                            <div className="text-[10px] text-[var(--color-text-secondary)] mb-1 font-bold uppercase tracking-wider">Bonds</div>
                            <div className="text-blue-500 font-bold text-lg font-mono">{userStats.invested > 0 ? "20%" : "0%"}</div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card flex flex-col p-0">
                    <div className="p-6 border-b border-[var(--border-color)] bg-black/40">
                        <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                            <Activity size={16} className="mr-2 text-[var(--color-success)]" />
                            Recent_Activity_Log
                        </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {recentActivity.length === 0 ? (
                            <div className="text-center text-[var(--color-text-muted)] py-8 font-mono uppercase text-xs">NO_RECENT_ACTIVITY</div>
                        ) : (
                            recentActivity.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-3 border border-[var(--border-color)] bg-black/60 hover:border-[var(--color-primary)]/50 transition-all group">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 flex items-center justify-center mr-3 border ${tx.type === "DEPOSIT" ? "border-[var(--color-success)]/20 text-[var(--color-success)] bg-[var(--color-success)]/5" :
                                            tx.type === "WITHDRAWAL" ? "border-[var(--color-danger)]/20 text-[var(--color-danger)] bg-[var(--color-danger)]/5" :
                                                "border-[var(--color-primary)]/20 text-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                            }`}>
                                            {tx.type === "DEPOSIT" ? <ArrowDownRight size={16} /> : tx.type === "WITHDRAWAL" ? <ArrowUpRight size={16} /> : <Activity size={16} />}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">{tx.type}</div>
                                            <div className="text-[10px] text-[var(--color-text-secondary)] font-mono">{tx.asset}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-sm font-bold font-mono ${tx.type === "DEPOSIT" ? "text-[var(--color-success)]" :
                                            tx.type === "WITHDRAWAL" ? "text-[var(--color-danger)]" : "text-[var(--color-primary)]"
                                            }`}>
                                            {tx.type === "DEPOSIT" ? "+" : tx.type === "WITHDRAWAL" ? "-" : ""}${tx.amount.toLocaleString()}
                                        </div>
                                        <div className="text-[10px] text-[var(--color-text-secondary)] font-mono">{new Date(tx.date).toLocaleTimeString()}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="p-4 border-t border-[var(--border-color)] bg-black/40">
                        <button className="w-full py-3 text-xs font-bold text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30 border border-dashed border-[var(--border-color)] transition-all uppercase tracking-widest">
                            VIEW_FULL_LOGS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
