
"use client";

import { useState, useEffect } from "react";
import { Search, Filter, TrendingUp, Info, DollarSign, CheckCircle, AlertTriangle, BarChart2, Calculator } from "lucide-react";
import { Asset } from "@/lib/db";
import VerifiedBadge from "@/components/VerifiedBadge";

export default function InvestPage() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [filter, setFilter] = useState<"ALL" | "SAFE" | "HIGH_YIELD">("ALL");
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [investAmount, setInvestAmount] = useState("");
    const [status, setStatus] = useState<"IDLE" | "PROCESSING" | "SUCCESS" | "ERROR">("IDLE");

    useEffect(() => {
        fetch('/api/invest')
            .then(res => res.json())
            .then(data => setAssets(data.assets));
    }, []);

    const filteredAssets = assets.filter(a => filter === "ALL" || a.type === filter);

    const handleInvest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAsset) return;

        setStatus("PROCESSING");

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const res = await fetch('/api/invest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    assetId: selectedAsset.id,
                    amount: Number(investAmount)
                })
            });

            if (res.ok) {
                setStatus("SUCCESS");
                setTimeout(() => {
                    setSelectedAsset(null);
                    setStatus("IDLE");
                    setInvestAmount("");
                }, 2000);
            } else {
                setStatus("ERROR");
            }
        } catch (err) {
            setStatus("ERROR");
        }
    };

    // Calculator Logic
    const calculatePotentialReturn = (amount: number, roi: number) => {
        return (amount * (roi / 100)).toFixed(2);
    };

    const calculatePoolShare = (amount: number, poolSize: number) => {
        if (!poolSize) return "0.0000";
        return ((amount / poolSize) * 100).toFixed(6);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-[var(--border-color)] pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-widest uppercase text-glow">Investment_Hub</h1>
                    <p className="text-[var(--color-text-secondary)] text-xs mt-2 font-mono">:: INSTITUTIONAL_GRADE_ASSETS ::</p>
                </div>

                <div className="flex space-x-2 mt-4 md:mt-0">
                    <button
                        onClick={() => setFilter("ALL")}
                        className={`btn text-xs ${filter === "ALL" ? "btn-primary" : "btn-outline"}`}
                    >
                        ALL_ASSETS
                    </button>
                    <button
                        onClick={() => setFilter("SAFE")}
                        className={`btn text-xs ${filter === "SAFE" ? "bg-[var(--color-success)] text-black border-[var(--color-success)]" : "btn-outline"}`}
                    >
                        SAFE_YIELD
                    </button>
                    <button
                        onClick={() => setFilter("HIGH_YIELD")}
                        className={`btn text-xs ${filter === "HIGH_YIELD" ? "bg-[var(--color-danger)] text-white border-[var(--color-danger)]" : "btn-outline"}`}
                    >
                        HIGH_YIELD
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map(asset => (
                    <div
                        key={asset.id}
                        className={`card group transition-all duration-300 ${asset.verified
                                ? 'border-[var(--color-primary)] shadow-[0_0_30px_rgba(255,215,0,0.2)] lg:col-span-2'
                                : 'hover:border-[var(--color-primary)]'
                            }`}
                    >
                        {/* Verification + Recommended Badges */}
                        {asset.verified && (
                            <div className="flex gap-2 mb-3">
                                <VerifiedBadge source={asset.verificationSource} url={asset.verificationUrl} size="md" />
                                <div className="inline-flex items-center gap-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
                                    ⭐ RECOMMENDED
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded border ${asset.type === 'SAFE'
                                ? 'border-[var(--color-success)] text-[var(--color-success)] bg-[var(--color-success)]/10'
                                : 'border-[var(--color-danger)] text-[var(--color-danger)] bg-[var(--color-danger)]/10'
                                }`}>
                                <TrendingUp size={20} />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 border ${asset.type === 'SAFE'
                                ? 'border-[var(--color-success)] text-[var(--color-success)]'
                                : 'border-[var(--color-danger)] text-[var(--color-danger)]'
                                }`}>
                                {asset.type}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2 truncate">{asset.name}</h3>
                        <p className="text-[var(--color-text-secondary)] text-xs h-10 mb-4 line-clamp-2">{asset.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-6 p-3 bg-black/40 border border-[var(--border-color)]">
                            <div>
                                <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Monthly_ROI</p>
                                <p className={`text-lg font-bold font-mono ${asset.type === 'SAFE' ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'
                                    }`}>
                                    {asset.roi}%
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Min_Entry</p>
                                <p className="text-lg font-bold text-white font-mono">${asset.minInvestment}</p>
                            </div>
                            <div className="col-span-2 border-t border-[var(--border-color)] pt-2 mt-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-[var(--color-text-secondary)] uppercase">Total_Pool_Size</span>
                                    <span className="text-xs font-bold text-white font-mono">${(asset.totalPoolSize / 1000000).toFixed(1)}M</span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-[10px] text-[var(--color-text-secondary)] uppercase">Floating_PnL</span>
                                    <span className="text-xs font-bold text-[var(--color-success)] font-mono">+{asset.currentFloating}%</span>
                                </div>
                            </div>
                        </div>

                        {!asset.verified && (
                            <p className="text-[10px] text-[var(--color-text-secondary)] mb-3 italic">
                                * Performance based on internal track record. Book a demo for details.
                            </p>
                        )}

                        <button
                            onClick={() => setSelectedAsset(asset)}
                            className={`btn w-full transition-all ${asset.verified
                                    ? 'btn-primary'
                                    : 'btn-outline group-hover:bg-[var(--color-primary)] group-hover:text-black group-hover:border-[var(--color-primary)]'
                                }`}
                        >
                            INITIATE_POSITION
                        </button>
                    </div>
                ))}
            </div>

            {/* Investment Modal */}
            {selectedAsset && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="card max-w-lg w-full border-[var(--color-primary)] shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white uppercase tracking-widest text-glow">Execute_Trade</h2>
                                <p className="text-[10px] text-[var(--color-text-secondary)] font-mono mt-1">:: {selectedAsset.name} ::</p>
                            </div>
                            <button onClick={() => setSelectedAsset(null)} className="text-[var(--color-text-secondary)] hover:text-white">
                                [X]
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-3 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20">
                                <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Target_Pool_Size</p>
                                <p className="text-lg font-bold text-white font-mono">${selectedAsset.totalPoolSize.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20">
                                <p className="text-[10px] text-[var(--color-text-secondary)] uppercase">Current_Floating</p>
                                <p className="text-lg font-bold text-[var(--color-success)] font-mono">+{selectedAsset.currentFloating}%</p>
                            </div>
                        </div>

                        <form onSubmit={handleInvest} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Investment_Amount (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-[var(--color-text-secondary)]">$</span>
                                    <input
                                        type="number"
                                        min={selectedAsset.minInvestment}
                                        placeholder={`MIN: ${selectedAsset.minInvestment}`}
                                        className="input-field pl-8 font-mono text-lg"
                                        value={investAmount}
                                        onChange={(e) => setInvestAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Live Calculator */}
                            {investAmount && Number(investAmount) >= selectedAsset.minInvestment && (
                                <div className="p-4 border border-[var(--border-color)] bg-black/40 animate-fade-in">
                                    <div className="flex items-center mb-3 border-b border-[var(--border-color)] pb-2">
                                        <Calculator size={14} className="text-[var(--color-primary)] mr-2" />
                                        <span className="text-xs font-bold text-white uppercase">Projections_Calculator</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-[var(--color-text-secondary)]">Your Pool Share:</span>
                                            <span className="font-mono text-white">{calculatePoolShare(Number(investAmount), selectedAsset.totalPoolSize)}%</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-[var(--color-text-secondary)]">Est. Monthly Return ({selectedAsset.roi}%):</span>
                                            <span className="font-mono text-[var(--color-success)]">+${calculatePotentialReturn(Number(investAmount), selectedAsset.roi)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-[var(--color-text-secondary)]">If Pool Grows +2%:</span>
                                            <span className="font-mono text-[var(--color-primary)]">
                                                Profit +${(Number(investAmount) * 0.02).toFixed(2)} (Total: ${(Number(investAmount) * 1.02).toFixed(2)})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {status === "ERROR" && (
                                <div className="text-xs text-[var(--color-danger)] font-bold text-center uppercase tracking-wider flex items-center justify-center">
                                    <AlertTriangle size={14} className="mr-2" />
                                    Transaction_Failed
                                </div>
                            )}

                            {status === "SUCCESS" && (
                                <div className="text-xs text-[var(--color-success)] font-bold text-center uppercase tracking-wider flex items-center justify-center">
                                    <CheckCircle size={14} className="mr-2" />
                                    Position_Opened_Successfully
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "PROCESSING" || status === "SUCCESS"}
                                className="btn btn-primary w-full py-4 text-sm font-bold tracking-widest"
                            >
                                {status === "PROCESSING" ? "EXECUTING_SMART_CONTRACT..." : "CONFIRM_ALLOCATION"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
