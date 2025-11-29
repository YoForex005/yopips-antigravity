"use client";

import { useState, useEffect } from "react";
import { PieChart, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Activity, Layers } from "lucide-react";
import { Asset, Investment } from "@/lib/db";

export default function PortfolioPage() {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/user/investments').then(res => res.json()),
            fetch('/api/invest').then(res => res.json())
        ]).then(([invData, assetData]) => {
            setInvestments(invData.investments);
            setAssets(assetData.assets);
            setLoading(false);
        });
    }, []);

    const getAsset = (id: string) => assets.find(a => a.id === id);

    const calculateMetrics = (investment: Investment, asset: Asset) => {
        const currentValue = investment.amount * (1 + (asset.currentFloating / 100));
        const pnlValue = currentValue - investment.amount;
        const poolShare = (investment.amount / asset.totalPoolSize) * 100;

        return {
            currentValue,
            pnlValue,
            poolShare
        };
    };

    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalCurrentValue = investments.reduce((sum, inv) => {
        const asset = getAsset(inv.assetId);
        return sum + (asset ? inv.amount * (1 + (asset.currentFloating / 100)) : inv.amount);
    }, 0);
    const totalPnL = totalCurrentValue - totalInvested;

    if (loading) return <div className="text-white">Loading Portfolio...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-[var(--border-color)] pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-widest uppercase text-glow">My_Portfolio</h1>
                    <p className="text-[var(--color-text-secondary)] text-xs mt-2 font-mono">:: LIVE_PERFORMANCE_METRICS ::</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Total_Equity</p>
                    <p className="text-2xl font-bold text-white font-mono">${totalCurrentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className={`text-xs font-mono ${totalPnL >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
                        {totalPnL >= 0 ? "+" : ""}{totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({((totalPnL / totalInvested) * 100 || 0).toFixed(2)}%)
                    </p>
                </div>
            </div>

            {investments.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-lg">
                    <p className="text-[var(--color-text-secondary)]">NO_ACTIVE_POSITIONS</p>
                    <a href="/dashboard/invest" className="btn btn-primary mt-4 inline-block text-xs">OPEN_NEW_POSITION</a>
                </div>
            ) : (
                <div className="grid gap-6">
                    {investments.map(inv => {
                        const asset = getAsset(inv.assetId);
                        if (!asset) return null;
                        const metrics = calculateMetrics(inv, asset);

                        return (
                            <div key={inv.id} className="card border-[var(--border-color)] hover:border-[var(--color-primary)] transition-all">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    {/* Asset Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <span className={`w-2 h-2 rounded-full mr-2 ${asset.type === 'SAFE' ? 'bg-[var(--color-success)]' : 'bg-[var(--color-danger)]'}`}></span>
                                            <h3 className="text-lg font-bold text-white uppercase">{asset.name}</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Pool_Size</p>
                                                <p className="text-sm font-mono text-white">${(asset.totalPoolSize / 1000000).toFixed(2)}M</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Pool_Performance</p>
                                                <p className={`text-sm font-mono ${asset.currentFloating >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
                                                    {asset.currentFloating >= 0 ? "+" : ""}{asset.currentFloating}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Position Metrics */}
                                    <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/20 p-4 rounded border border-[var(--border-color)]">
                                        <div>
                                            <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Invested</p>
                                            <p className="text-sm font-mono text-white">${inv.amount.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Current_Value</p>
                                            <p className="text-sm font-mono text-white">${metrics.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Your_PnL</p>
                                            <div className="flex flex-col">
                                                <span className={`text-sm font-bold font-mono ${metrics.pnlValue >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
                                                    {metrics.pnlValue >= 0 ? "+" : ""}${metrics.pnlValue.toFixed(2)}
                                                </span>
                                                <span className={`text-[10px] font-mono ${metrics.pnlValue >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
                                                    {asset.currentFloating}%
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Pool_Share</p>
                                            <div className="flex items-center">
                                                <Layers size={12} className="text-[var(--color-primary)] mr-1" />
                                                <p className="text-sm font-mono text-[var(--color-primary)]">{metrics.poolShare.toFixed(6)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
