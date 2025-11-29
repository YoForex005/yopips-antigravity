
"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Upload, MapPin, FileText, CheckCircle, AlertTriangle } from "lucide-react";

export default function KYCPage() {
    const [status, setStatus] = useState<"NOT_STARTED" | "PENDING" | "VERIFIED">("NOT_STARTED");
    const [formData, setFormData] = useState({
        address: "",
        idDocument: null as File | null
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                setStatus(data.kycStatus);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'KYC',
                data: {
                    address: formData.address,
                    idDocument: "simulated_doc_id_123"
                }
            })
        });

        setStatus("VERIFIED");
        setLoading(false);
    };

    if (status === "VERIFIED") {
        return (
            <div className="max-w-2xl mx-auto text-center space-y-8 pt-12">
                <div className="w-24 h-24 bg-[var(--color-success)]/10 rounded-full flex items-center justify-center mx-auto border border-[var(--color-success)] shadow-[0_0_30px_rgba(0,255,65,0.2)]">
                    <ShieldCheck size={48} className="text-[var(--color-success)]" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-widest uppercase text-glow">Identity_Verified</h1>
                    <p className="text-[var(--color-text-secondary)] mt-2 font-mono">:: ACCOUNT_STATUS_ACTIVE ::</p>
                </div>
                <div className="card border-[var(--color-success)]/30 bg-[var(--color-success)]/5 max-w-md mx-auto">
                    <div className="flex items-center justify-center space-x-2 text-[var(--color-success)] font-bold uppercase tracking-wider text-sm">
                        <CheckCircle size={16} />
                        <span>All_Features_Unlocked</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-widest uppercase text-glow">Identity_Verification</h1>
                    <p className="text-[var(--color-text-secondary)] mt-1 text-xs font-mono">:: KNOW_YOUR_CUSTOMER_PROTOCOL ::</p>
                </div>
                <div className="px-3 py-1 border border-[var(--color-danger)] text-[var(--color-danger)] bg-[var(--color-danger)]/5 text-[10px] font-bold uppercase tracking-wider flex items-center">
                    <AlertTriangle size={12} className="mr-2" />
                    Action_Required
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="card p-0 border-[var(--color-primary)]/30">
                        <div className="p-6 border-b border-[var(--border-color)] bg-black/40">
                            <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                <FileText size={16} className="mr-2 text-[var(--color-primary)]" />
                                Submission_Form
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            {/* Address Section */}
                            <div className="space-y-4">
                                <label className="flex items-center text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                                    <MapPin size={14} className="mr-2" />
                                    Residential_Address
                                </label>
                                <textarea
                                    className="input-field min-h-[100px]"
                                    placeholder="ENTER_FULL_LEGAL_ADDRESS..."
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Document Upload */}
                            <div className="space-y-4">
                                <label className="flex items-center text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                                    <Upload size={14} className="mr-2" />
                                    Government_ID_Upload
                                </label>
                                <div className="border-2 border-dashed border-[var(--border-color)] rounded-lg p-8 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer bg-black/20 group">
                                    <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                                        <Upload size={20} className="text-[var(--color-primary)]" />
                                    </div>
                                    <p className="text-xs text-white font-bold uppercase tracking-wider mb-1">Click_to_Upload</p>
                                    <p className="text-[10px] text-[var(--color-text-secondary)] font-mono">PASSPORT_OR_DRIVERS_LICENSE (MAX 5MB)</p>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => e.target.files && setFormData({ ...formData, idDocument: e.target.files[0] })}
                                    />
                                </div>
                                {formData.idDocument && (
                                    <div className="flex items-center text-xs text-[var(--color-success)] font-mono">
                                        <CheckCircle size={12} className="mr-2" />
                                        FILE_SELECTED: {formData.idDocument.name}
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-[var(--border-color)]">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full py-4 text-sm font-bold tracking-widest"
                                >
                                    {loading ? "VERIFYING_DOCUMENTATION..." : "SUBMIT_FOR_VERIFICATION"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="card bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Why_Verify?</h3>
                        <ul className="space-y-3">
                            {[
                                "Unlock_Deposits_&_Withdrawals",
                                "Access_High_Yield_Assets",
                                "Increase_Transaction_Limits",
                                "Regulatory_Compliance"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-[10px] text-[var(--color-text-secondary)] font-mono">
                                    <div className="w-1 h-1 bg-[var(--color-primary)] mr-3"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
