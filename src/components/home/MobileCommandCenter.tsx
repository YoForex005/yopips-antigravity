"use client";

import { Smartphone, Zap, Lock, Globe, Download, UserCheck, TrendingUp } from "lucide-react";

export default function MobileCommandCenter() {
    return (
        <section style={{ padding: '100px 0', background: 'linear-gradient(180deg, #0b0e11 0%, #181a20 100%)', overflow: 'hidden' }}>
            <div className="container mx-auto">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>

                    {/* Left: Content */}
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(252, 213, 53, 0.1)', color: 'var(--color-primary)', padding: '5px 15px', borderRadius: '20px', marginBottom: '20px', fontWeight: 'bold' }}>
                            <Smartphone size={16} /> MOBILE COMMAND CENTER
                        </div>
                        <h2 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '30px' }}>
                            Your Hedge Fund. <br /> In Your Pocket.
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '40px', lineHeight: '1.8' }}>
                            Monitor your portfolio in real-time. Execute withdrawals with a single tap. Secure biometric access ensures your capital is always safe, yet always accessible.
                        </p>
                        <ul style={{ listStyle: 'none', color: '#fff', marginBottom: '40px' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', fontSize: '1.1rem' }}>
                                <div style={{ background: 'var(--color-primary)', padding: '8px', borderRadius: '50%', color: '#000' }}><Zap size={20} /></div>
                                Real-time P&L Updates
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', fontSize: '1.1rem' }}>
                                <div style={{ background: 'var(--color-primary)', padding: '8px', borderRadius: '50%', color: '#000' }}><Lock size={20} /></div>
                                Biometric 2FA Security
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', fontSize: '1.1rem' }}>
                                <div style={{ background: 'var(--color-primary)', padding: '8px', borderRadius: '50%', color: '#000' }}><Globe size={20} /></div>
                                Global Access (iOS & Android)
                            </li>
                        </ul>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 30px' }}>
                                <Download size={20} /> Download iOS
                            </button>
                            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 30px' }}>
                                <Download size={20} /> Download Android
                            </button>
                        </div>
                    </div>

                    {/* Right: Visual (Phone) */}
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'var(--color-primary)', filter: 'blur(150px)', opacity: 0.1, zIndex: 0 }}></div>
                        <div style={{ position: 'relative', zIndex: 1, background: '#000', border: '8px solid #333', borderRadius: '40px', padding: '20px', maxWidth: '350px', margin: '0 auto', boxShadow: '0 50px 100px rgba(0,0,0,0.5)' }}>
                            <div style={{ width: '100px', height: '25px', background: '#000', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', borderRadius: '0 0 15px 15px', zIndex: 2 }}></div>
                            {/* Screen Content */}
                            <div style={{ background: '#1e2329', borderRadius: '30px', overflow: 'hidden', height: '650px', display: 'flex', flexDirection: 'column' }}>
                                {/* App Header */}
                                <div style={{ padding: '40px 20px 20px', background: 'linear-gradient(180deg, rgba(252, 213, 53, 0.1) 0%, transparent 100%)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>YoPips Mobile</div>
                                        <UserCheck size={24} className="text-primary" />
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#848e9c' }}>Total Equity</div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>$124,592.00</div>
                                    <div style={{ color: 'var(--color-success)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <TrendingUp size={16} /> +$8,420.00 (Today)
                                    </div>
                                </div>
                                {/* Chart Area */}
                                <div style={{ flex: 1, padding: '20px', display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
                                    {[40, 60, 45, 70, 65, 85, 80, 95, 90, 100].map((h, i) => (
                                        <div key={i} style={{ flex: 1, background: 'var(--color-primary)', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
                                    ))}
                                </div>
                                {/* Action Buttons */}
                                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <button style={{ background: 'var(--color-success)', border: 'none', padding: '15px', borderRadius: '12px', color: '#000', fontWeight: 'bold' }}>Deposit</button>
                                    <button style={{ background: '#333', border: 'none', padding: '15px', borderRadius: '12px', color: '#fff', fontWeight: 'bold' }}>Withdraw</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
