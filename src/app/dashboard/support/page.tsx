
"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Plus, Clock, CheckCircle, Send } from "lucide-react";

type Ticket = {
    id: string;
    subject: string;
    message: string;
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
    createdAt: string;
};

export default function SupportPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [showNewTicket, setShowNewTicket] = useState(false);
    const [formData, setFormData] = useState({ subject: "", message: "" });
    const [loading, setLoading] = useState(false);

    // Fetch Tickets (Simulated for now as we need an API endpoint)
    // In a real app, we'd fetch from /api/tickets
    useEffect(() => {
        // Mock initial data or fetch if endpoint exists
        setTickets([
            { id: "tkt_1", subject: "Welcome to Premium Support", message: "Our team is here 24/5 to assist you.", status: "RESOLVED", createdAt: new Date().toISOString() }
        ]);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newTicket: Ticket = {
            id: `tkt_${Date.now()}`,
            subject: formData.subject,
            message: formData.message,
            status: "OPEN",
            createdAt: new Date().toISOString()
        };

        setTickets([newTicket, ...tickets]);
        setFormData({ subject: "", message: "" });
        setShowNewTicket(false);
        setLoading(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-widest uppercase text-glow">Support_Center</h1>
                    <p className="text-[var(--color-text-secondary)] mt-1 text-xs font-mono">:: 24/5_DEDICATED_ASSISTANCE ::</p>
                </div>
                <button
                    onClick={() => setShowNewTicket(true)}
                    className="btn btn-primary text-xs font-bold flex items-center"
                >
                    <Plus size={16} className="mr-2" />
                    OPEN_NEW_TICKET
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Ticket List */}
                <div className="lg:col-span-2 space-y-4">
                    {tickets.map(ticket => (
                        <div key={ticket.id} className="card p-0 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] transition-colors group">
                            <div className="p-4 border-b border-[var(--border-color)] bg-black/40 flex justify-between items-center">
                                <div className="flex items-center">
                                    <MessageSquare size={16} className="text-[var(--color-primary)] mr-3" />
                                    <span className="text-sm font-bold text-white uppercase tracking-wider">{ticket.subject}</span>
                                </div>
                                <div className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider border ${ticket.status === "OPEN" ? "border-blue-500 text-blue-500" :
                                        ticket.status === "IN_PROGRESS" ? "border-yellow-500 text-yellow-500" :
                                            "border-[var(--color-success)] text-[var(--color-success)]"
                                    }`}>
                                    {ticket.status}
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-[var(--color-text-secondary)] font-mono mb-4">{ticket.message}</p>
                                <div className="flex items-center text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                                    <Clock size={12} className="mr-1" />
                                    {new Date(ticket.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar / New Ticket Form */}
                <div className="space-y-6">
                    {showNewTicket ? (
                        <div className="card border-[var(--color-primary)]">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">New_Ticket</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Subject</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="input-field"
                                        placeholder="BRIEF_DESCRIPTION..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="input-field min-h-[100px]"
                                        placeholder="DETAILED_INQUIRY..."
                                        required
                                    />
                                </div>
                                <div className="flex space-x-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowNewTicket(false)}
                                        className="btn btn-outline flex-1 text-xs font-bold"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary flex-1 text-xs font-bold flex items-center justify-center"
                                    >
                                        {loading ? "SENDING..." : <><Send size={14} className="mr-2" /> SUBMIT</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="card bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support_Hours</h3>
                            <div className="space-y-4 text-[10px] text-[var(--color-text-secondary)] font-mono">
                                <div className="flex justify-between border-b border-[var(--border-color)] pb-2">
                                    <span>MONDAY - FRIDAY</span>
                                    <span className="text-white">24 HOURS</span>
                                </div>
                                <div className="flex justify-between border-b border-[var(--border-color)] pb-2">
                                    <span>SATURDAY - SUNDAY</span>
                                    <span className="text-[var(--color-danger)]">CLOSED</span>
                                </div>
                                <p className="pt-2 text-[var(--color-text-muted)]">
                                    *Emergency tickets may be processed on weekends for critical infrastructure issues only.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
