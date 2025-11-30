"use client";

import { Hash, CheckCircle2, Landmark } from "lucide-react";

export default function Proof() {
    return (
        <section id="proof" style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)', borderTop: 'var(--glass-border)' }}>
            <div className="container mx-auto">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 className="section-title">Verifiable Payouts</h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>We process withdrawals 24/7 via USDT and Bank Wire.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>

                    {/* USDT Proof */}
                    <div className="glass-card" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'rgba(14, 203, 129, 0.1)', padding: '20px', borderRadius: '50%' }}>
                            <Hash size={100} color="var(--color-success)" style={{ opacity: 0.2 }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ background: '#26a17b', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>T</div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>Tether (USDT)</div>
                                <div style={{ fontSize: '0.8rem', color: '#848e9c' }}>TRC20 Network</div>
                            </div>
                            <div style={{ marginLeft: 'auto', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                                <CheckCircle2 size={16} /> Confirmed
                            </div>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>+ $12,450.00</div>
                        <div style={{ fontSize: '0.8rem', color: '#848e9c', fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px', wordBreak: 'break-all' }}>
                            TXID: 7f9a2b...3c4d5e
                        </div>
                        <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#555' }}>2 hours ago</div>
                    </div>

                    {/* Bank Wire Proof */}
                    <div className="glass-card" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'rgba(252, 213, 53, 0.1)', padding: '20px', borderRadius: '50%' }}>
                            <Landmark size={100} color="var(--color-primary)" style={{ opacity: 0.2 }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ background: '#003b70', width: '40px', height: '40px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>CH</div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>Chase Bank</div>
                                <div style={{ fontSize: '0.8rem', color: '#848e9c' }}>Wire Transfer</div>
                            </div>
                            <div style={{ marginLeft: 'auto', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                                <CheckCircle2 size={16} /> Received
                            </div>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>+ $45,000.00</div>
                        <div style={{ fontSize: '0.8rem', color: '#848e9c', fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px' }}>
                            REF: YOPIPS-WITHDRAWAL-8821
                        </div>
                        <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#555' }}>1 day ago</div>
                    </div>

                </div>
            </div>
        </section>
    );
}
