"use client";

import { useState, useEffect } from "react";
import { Wallet, CreditCard, ArrowUpRight, ArrowDownRight, AlertTriangle, Clock, Save, CheckCircle } from "lucide-react";

export default function WalletPage() {
    const [activeTab, setActiveTab] = useState("withdraw");
    const [balance, setBalance] = useState(0);
    const [banking, setBanking] = useState({ bankName: "", accountNumber: "", cryptoWallet: "" });
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [status, setStatus] = useState<"IDLE" | "PROCESSING" | "SUCCESS" | "ERROR">("IDLE");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                setBalance(data.balance);
                if (data.banking) setBanking(data.banking);
            });
    }, []);

    const isWeekend = () => {
        const day = new Date().getDay();
        return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
    };

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("PROCESSING");
        setErrorMsg("");

        if (isWeekend()) {
            setStatus("ERROR");
            setErrorMsg("WITHDRAWALS_PAUSED_ON_WEEKENDS. PLEASE_TRY_AGAIN_MONDAY.");
            return;
        }

        if (Number(withdrawAmount) > balance) {
            setStatus("ERROR");
            setErrorMsg("INSUFFICIENT_FUNDS.");
            return;
        }

        // API call for withdrawal
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'WITHDRAW',
                data: { amount: Number(withdrawAmount) }
            })
        });

        if (res.ok) {
            setStatus("SUCCESS");
            setBalance(prev => prev - Number(withdrawAmount));
            setWithdrawAmount("");
            setTimeout(() => setStatus("IDLE"), 3000);
        } else {
            setStatus("ERROR");
            setErrorMsg("TRANSACTION_FAILED");
        }
    };

    const handleSaveBanking = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("PROCESSING");

        await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'BANKING',
                data: banking
            })
        });

        setStatus("SUCCESS");
        setTimeout(() => setStatus("IDLE"), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-widest uppercase text-glow">Wallet_&_Banking</h1>
                    <p className="text-[var(--color-text-secondary)] text-[10px] mt-1 font-mono">:: LIQUIDITY_MANAGEMENT ::</p>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider">Available_Balance</div>
                    <div className="text-2xl font-bold text-[var(--color-primary)] font-mono text-glow">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <div className="card p-0 h-fit">
                    <nav className="flex flex-col p-2 space-y-1">
                        <button
                            onClick={() => setActiveTab("withdraw")}
                            className={`flex items-center p-3 transition-all text-left group border ${activeTab === "withdraw"
                                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]"
                                : "text-[var(--color-text-secondary)] border-transparent hover:border-[var(--color-primary)]/30 hover:text-white"
                                }`}
                        >
                            <ArrowUpRight size={16} className="mr-3" />
                            <span className="text-xs font-bold uppercase tracking-wider">Withdraw_Funds</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("deposit")}
                            className={`flex items-center p-3 transition-all text-left group border ${activeTab === "deposit"
                                ? "bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]"
                                : "text-[var(--color-text-secondary)] border-transparent hover:border-[var(--color-success)]/30 hover:text-white"
                                }`}
                        >
                            <ArrowDownRight size={16} className="mr-3" />
                            <span className="text-xs font-bold uppercase tracking-wider">Deposit_Funds</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("banking")}
                            className={`flex items-center p-3 transition-all text-left group border ${activeTab === "banking"
                                ? "bg-blue-500/10 text-blue-500 border-blue-500"
                                : "text-[var(--color-text-secondary)] border-transparent hover:border-blue-500/30 hover:text-white"
                                }`}
                        >
                            <CreditCard size={16} className="mr-3" />
                            <span className="text-xs font-bold uppercase tracking-wider">Banking_Details</span>
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                    {activeTab === "withdraw" && (
                        <div className="card p-0 border-[var(--color-primary)]/30">
                            <div className="p-6 border-b border-[var(--border-color)] bg-black/40">
                                <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                    <Wallet size={16} className="mr-2 text-[var(--color-primary)]" />
                                    Withdrawal_Request
                                </h2>
                            </div>

                            <form onSubmit={handleWithdraw} className="p-6 space-y-6">
                                {isWeekend() && (
                                    <div className="p-4 bg-[var(--color-danger)]/10 border border-[var(--color-danger)] flex items-start">
                                        <Clock size={20} className="text-[var(--color-danger)] mr-3 mt-0.5" />
                                        <div>
                                            <h3 className="text-xs font-bold text-[var(--color-danger)] uppercase tracking-wider">Weekend_Restriction_Active</h3>
                                            <p className="text-[10px] text-[var(--color-text-secondary)] font-mono mt-1">
                                                SYSTEM_OFFLINE_FOR_SETTLEMENT. WITHDRAWALS_RESUME_MONDAY_00:00_UTC.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Amount_to_Withdraw (USD)</label>
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        className="input-field"
                                        placeholder="ENTER_AMOUNT..."
                                        min="10"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Destination_Account</label>
                                    <select className="input-field uppercase">
                                        <option>USDT (TRC20) - {banking.cryptoWallet ? `...${banking.cryptoWallet.slice(-4)}` : "NOT_LINKED"}</option>
                                        <option>BANK WIRE - {banking.accountNumber ? `...${banking.accountNumber.slice(-4)}` : "NOT_LINKED"}</option>
                                    </select>
                                </div>

                                {status === "ERROR" && (
                                    <div className="text-xs font-bold text-[var(--color-danger)] uppercase tracking-wider flex items-center">
                                        <AlertTriangle size={14} className="mr-2" />
                                        {errorMsg}
                                    </div>
                                )}

                                {status === "SUCCESS" && (
                                    <div className="text-xs font-bold text-[var(--color-success)] uppercase tracking-wider flex items-center">
                                        <CheckCircle size={14} className="mr-2" />
                                        REQUEST_SUBMITTED_SUCCESSFULLY
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "PROCESSING" || isWeekend()}
                                    className="btn btn-primary w-full text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === "PROCESSING" ? "PROCESSING..." : "INITIATE_WITHDRAWAL"}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === "deposit" && (
                        <div className="card p-0 border-[var(--color-success)]/30">
                            <div className="p-6 border-b border-[var(--border-color)] bg-black/40">
                                <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                    <ArrowDownRight size={16} className="mr-2 text-[var(--color-success)]" />
                                    Deposit_Funds
                                </h2>
                            </div>
                            <div className="p-8 text-center">
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">Simulate Deposit (Dev Mode)</p>
                                    <button
                                        onClick={async () => {
                                            await fetch('/api/user', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ action: 'DEPOSIT', data: { amount: 1000 } })
                                            });
                                            window.location.reload();
                                        }}
                                        className="btn btn-success text-xs font-bold"
                                    >
                                        DEPOSIT $1,000 (TEST)
                                    </button>
                                </div>
                                <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
                                    <div className="w-48 h-48 mx-auto bg-white p-2 mb-6">
                                        {/* QR Code Placeholder */}
                                        <div className="w-full h-full bg-black flex items-center justify-center text-white text-xs font-mono border-4 border-white">
                                            [QR_CODE_MATRIX]
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">USDT (TRC20) Deposit Address</div>
                                            <div className="p-3 bg-black border border-[var(--border-color)] font-mono text-xs text-[var(--color-primary)] break-all select-all cursor-pointer hover:border-[var(--color-primary)] transition-colors">
                                                T9yD14Nj9j7xAB4dbGeiX9h8b75g421
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-[var(--color-text-muted)] font-mono">
                                            IMPORTANT: SEND_ONLY_USDT_TRC20. OTHER_ASSETS_WILL_BE_LOST.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "banking" && (
                        <div className="card p-0 border-blue-500/30">
                            <div className="p-6 border-b border-[var(--border-color)] bg-black/40">
                                <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                    <CreditCard size={16} className="mr-2 text-blue-500" />
                                    Banking_Configuration
                                </h2>
                            </div>

                            <form onSubmit={handleSaveBanking} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Bank_Name</label>
                                    <input
                                        type="text"
                                        value={banking.bankName}
                                        onChange={(e) => setBanking({ ...banking, bankName: e.target.value })}
                                        className="input-field"
                                        placeholder="ENTER_BANK_NAME..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Account_Number / IBAN</label>
                                    <input
                                        type="text"
                                        value={banking.accountNumber}
                                        onChange={(e) => setBanking({ ...banking, accountNumber: e.target.value })}
                                        className="input-field"
                                        placeholder="ENTER_ACCOUNT_NUMBER..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">USDT (TRC20) Wallet_Address</label>
                                    <input
                                        type="text"
                                        value={banking.cryptoWallet}
                                        onChange={(e) => setBanking({ ...banking, cryptoWallet: e.target.value })}
                                        className="input-field"
                                        placeholder="ENTER_WALLET_ADDRESS..."
                                    />
                                </div>

                                {status === "SUCCESS" && (
                                    <div className="text-xs font-bold text-[var(--color-success)] uppercase tracking-wider flex items-center">
                                        <CheckCircle size={14} className="mr-2" />
                                        DETAILS_UPDATED_SUCCESSFULLY
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary w-full text-xs font-bold">
                                    SAVE_CONFIGURATION
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
