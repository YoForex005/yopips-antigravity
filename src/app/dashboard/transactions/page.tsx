"use client";

import { useState, useEffect } from "react";
import { ArrowDownRight, ArrowUpRight, RefreshCw, Filter, Download, Search, Calendar, Terminal } from "lucide-react";

type Transaction = {
    id: string;
    type: "DEPOSIT" | "WITHDRAWAL" | "TRADE_EXEC";
    asset: string;
    amount: number;
    status: "CONFIRMED" | "PENDING" | "FAILED";
    date: string;
};

export default function TransactionsPage() {
    const [filter, setFilter] = useState("ALL_LOGS");
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        fetch('/api/transactions')
            .then(res => res.json())
            .then(data => setTransactions(data));
    }, []);

    const filteredTransactions = filter === "ALL_LOGS"
        ? transactions
        : transactions.filter(t => t.type === filter);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-widest uppercase text-glow">Transaction_Logs</h1>
                    <p className="text-[var(--color-text-secondary)] text-[10px] mt-1 font-mono">:: AUDIT_TRAIL_V1.4 ::</p>
                </div>
                <div className="flex space-x-3">
                    <button className="btn btn-outline text-xs font-bold uppercase tracking-wider">
                        <Download size={16} className="mr-2" />
                        EXPORT_CSV
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="card p-4 flex flex-col md:flex-row gap-4 justify-between items-center border-[var(--color-primary)]/20">
                <div className="flex space-x-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {["ALL_LOGS", "DEPOSIT", "WITHDRAWAL", "TRADE_EXEC"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${filter === f
                                ? "bg-[var(--color-primary)] text-black border-[var(--color-primary)] shadow-[0_0_10px_rgba(255,215,0,0.4)]"
                                : "text-[var(--color-text-secondary)] border-[var(--border-color)] hover:border-[var(--color-primary)] hover:text-white bg-black/50"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="flex space-x-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-primary)]" />
                        <input
                            type="text"
                            placeholder="SEARCH_LOGS..."
                            className="w-full bg-black border border-[var(--border-color)] pl-10 pr-4 py-2 text-xs text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_10px_rgba(255,215,0,0.2)] placeholder-[var(--color-text-muted)] font-mono uppercase tracking-wider"
                        />
                    </div>
                    <button className="p-2 bg-black border border-[var(--border-color)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors">
                        <Calendar size={18} />
                    </button>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="card overflow-hidden p-0 border-[var(--border-color)]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/80 text-[var(--color-text-muted)] text-[10px] uppercase tracking-widest font-bold border-b border-[var(--border-color)]">
                                <th className="px-6 py-4 border-r border-[var(--border-color)]">Operation_Type</th>
                                <th className="px-6 py-4 border-r border-[var(--border-color)]">Asset_Class</th>
                                <th className="px-6 py-4 border-r border-[var(--border-color)]">Net_Amount</th>
                                <th className="px-6 py-4 border-r border-[var(--border-color)]">System_Status</th>
                                <th className="px-6 py-4 border-r border-[var(--border-color)]">Timestamp</th>
                                <th className="px-6 py-4 text-right">TX_Hash</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)] font-mono text-xs">
                            {filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-[var(--color-primary)]/5 transition-colors group">
                                    <td className="px-6 py-4 border-r border-[var(--border-color)]">
                                        <div className="flex items-center">
                                            <div className={`w-6 h-6 flex items-center justify-center mr-3 border ${tx.type === "DEPOSIT" ? "border-[var(--color-success)] text-[var(--color-success)] bg-[var(--color-success)]/10" :
                                                tx.type === "WITHDRAWAL" ? "border-[var(--color-danger)] text-[var(--color-danger)] bg-[var(--color-danger)]/10" : "border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10"
                                                }`}>
                                                {tx.type === "DEPOSIT" ? <ArrowDownRight size={12} /> :
                                                    tx.type === "WITHDRAWAL" ? <ArrowUpRight size={12} /> : <RefreshCw size={12} />}
                                            </div>
                                            <span className="font-bold text-white tracking-wider">{tx.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[var(--color-text)] border-r border-[var(--border-color)]">{tx.asset}</td>
                                    <td className={`px-6 py-4 font-bold tracking-tight border-r border-[var(--border-color)] ${tx.type === "DEPOSIT" ? "text-[var(--color-success)]" :
                                        tx.type === "WITHDRAWAL" ? "text-[var(--color-danger)]" : "text-[var(--color-primary)]"
                                        }`}>
                                        {tx.type === "DEPOSIT" ? "+" : tx.type === "WITHDRAWAL" ? "-" : ""}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 border-r border-[var(--border-color)]">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${tx.status === "CONFIRMED" ? "bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/30" : "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/30 animate-pulse"
                                            }`}>
                                            [{tx.status}]
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[var(--color-text-secondary)] border-r border-[var(--border-color)]">{new Date(tx.date).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-[var(--color-text-muted)] text-[10px]">{tx.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredTransactions.length === 0 && (
                    <div className="p-12 text-center text-[var(--color-text-muted)] flex flex-col items-center font-mono">
                        <Terminal size={48} className="mb-4 opacity-20" />
                        <p className="uppercase tracking-widest">:: NO_DATA_FOUND_IN_LOGS ::</p>
                    </div>
                )}

                <div className="p-4 border-t border-[var(--border-color)] flex justify-between items-center bg-black/40">
                    <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider">Displaying {filteredTransactions.length} / {transactions.length} records</div>
                    <div className="flex space-x-2">
                        <button className="px-4 py-1 text-[10px] font-bold border border-[var(--border-color)] text-[var(--color-text-secondary)] hover:text-white hover:border-white disabled:opacity-50 uppercase tracking-wider" disabled>&lt; PREV</button>
                        <button className="px-4 py-1 text-[10px] font-bold border border-[var(--border-color)] text-[var(--color-text-secondary)] hover:text-white hover:border-white uppercase tracking-wider">NEXT &gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
