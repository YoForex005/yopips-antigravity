"use client";

import { ArrowLeft, TrendingUp, ShieldCheck, Building2, Activity, Server, BarChart3, CheckCircle2 } from "lucide-react";

export default function Strategy() {
    return (
        <main className="min-h-screen pt-[40px] pb-[100px]">
            <div className="container">
                {/* Nav */}
                <div style={{ marginBottom: '40px' }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary)', fontWeight: '600' }}>
                        <ArrowLeft size={20} /> Return to Home
                    </a>
                </div>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>The "Swiss Army Knife" Protocol</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        Why rely on one market when you can dominate them all? Our multi-strategy approach ensures consistent returns in any economic climate.
                    </p>
                </div>

                {/* Live Performance Visuals */}
                <div style={{ marginBottom: '100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                    {/* Chart */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <BarChart3 className="text-accent" /> Monthly Returns (2024)
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid #333' }}>
                            {/* Bars */}
                            {[6.8, 7.2, 7.5, 6.9, 8.1, 7.8, 7.4, 8.5].map((val, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '5px' }}>
                                    <div style={{ fontSize: '0.7rem', color: '#848e9c' }}>{val}%</div>
                                    <div style={{ width: '100%', height: `${val * 10}%`, background: 'var(--color-accent)', borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
                                    <div style={{ fontSize: '0.7rem', color: '#555' }}>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'][i]}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Live Ticker */}
                    <div className="glass-card" style={{ padding: '30px', overflow: 'hidden', position: 'relative' }}>
                        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Activity className="text-success" /> Live Executions
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {[
                                { pair: 'XAU/USD', type: 'BUY', price: '2034.50', profit: '+$450.00' },
                                { pair: 'EUR/USD', type: 'SELL', price: '1.0845', profit: '+$120.50' },
                                { pair: 'GBP/JPY', type: 'BUY', price: '188.20', profit: '+$310.00' },
                                { pair: 'US30', type: 'BUY', price: '38500', profit: '+$890.00' },
                            ].map((trade, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', borderLeft: '3px solid var(--color-success)' }}>
                                    <span style={{ fontWeight: 'bold' }}>{trade.pair}</span>
                                    <span style={{ color: trade.type === 'BUY' ? 'var(--color-success)' : 'var(--color-danger)' }}>{trade.type}</span>
                                    <span style={{ fontFamily: 'monospace' }}>{trade.price}</span>
                                    <span style={{ color: 'var(--color-success)' }}>{trade.profit}</span>
                                </div>
                            ))}
                        </div>
                        {/* Overlay for "Live" feel */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', background: 'linear-gradient(to top, #0b0e11, transparent)', pointerEvents: 'none' }}></div>
                    </div>

                </div>

                {/* Strategy Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '60px' }}>

                    {/* Strategy 1: Gold */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ background: 'rgba(252, 213, 53, 0.1)', padding: '15px', borderRadius: '12px' }}>
                                <ShieldCheck size={40} className="text-primary" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Gold Hedging</h2>
                                <div style={{ color: 'var(--color-text-secondary)' }}>Defensive Capital Protection</div>
                            </div>
                        </div>
                        <p style={{ marginBottom: '30px', lineHeight: '1.6', color: '#ccc' }}>
                            When markets panic, Gold rises. Our algorithms automatically shift capital into XAU/USD positions during high-volatility events (CPI data, geopolitical tension), acting as a shield for your portfolio while generating profit from the safe-haven rush.
                        </p>
                        <div style={{ background: '#0b0e11', padding: '20px', borderRadius: '8px', border: '1px solid #2b3139' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#848e9c' }}>2023 Performance</span>
                                <span className="text-success font-bold">+18.4%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#848e9c' }}>Avg. Holding Time</span>
                                <span style={{ color: '#fff' }}>48 Hours</span>
                            </div>
                        </div>
                    </div>

                    {/* Strategy 2: REITs */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ background: 'rgba(252, 213, 53, 0.1)', padding: '15px', borderRadius: '12px' }}>
                                <Building2 size={40} className="text-primary" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Real Estate REITs</h2>
                                <div style={{ color: 'var(--color-text-secondary)' }}>Steady Passive Income</div>
                            </div>
                        </div>
                        <p style={{ marginBottom: '30px', lineHeight: '1.6', color: '#ccc' }}>
                            We leverage institutional access to Real Estate Investment Trusts (REITs) focused on commercial logistics and data centers. These provide a steady stream of dividend income that compounds monthly, independent of stock market fluctuations.
                        </p>
                        <div style={{ background: '#0b0e11', padding: '20px', borderRadius: '8px', border: '1px solid #2b3139' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#848e9c' }}>Annual Yield</span>
                                <span className="text-success font-bold">8.5% (Fixed)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#848e9c' }}>Sector Focus</span>
                                <span style={{ color: '#fff' }}>Data Centers</span>
                            </div>
                        </div>
                    </div>

                    {/* Strategy 3: Forex */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ background: 'rgba(252, 213, 53, 0.1)', padding: '15px', borderRadius: '12px' }}>
                                <Activity size={40} className="text-primary" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Forex Momentum</h2>
                                <div style={{ color: 'var(--color-text-secondary)' }}>High-Frequency Growth</div>
                            </div>
                        </div>
                        <p style={{ marginBottom: '30px', lineHeight: '1.6', color: '#ccc' }}>
                            Our core growth engine. Using HFT (High-Frequency Trading) algorithms, we scalp micro-movements in major currency pairs (EUR/USD, GBP/JPY). We don't predict the future; we react to price action faster than any human can blink.
                        </p>
                        <div style={{ background: '#0b0e11', padding: '20px', borderRadius: '8px', border: '1px solid #2b3139' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#848e9c' }}>Monthly Volume</span>
                                <span className="text-success font-bold">$1.2 Billion</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#848e9c' }}>Win Rate</span>
                                <span style={{ color: '#fff' }}>78.2%</span>
                            </div>
                        </div>
                    </div>

                    {/* Strategy 4: Bonds */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ background: 'rgba(252, 213, 53, 0.1)', padding: '15px', borderRadius: '12px' }}>
                                <Server size={40} className="text-primary" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>US Govt Bonds</h2>
                                <div style={{ color: 'var(--color-text-secondary)' }}>Risk-Free Baseline</div>
                            </div>
                        </div>
                        <p style={{ marginBottom: '30px', lineHeight: '1.6', color: '#ccc' }}>
                            The foundation of our liquidity. A portion of all managed funds is parked in short-term US Treasury Bills. This ensures that even in a worst-case market scenario, your capital is backed by the full faith and credit of the US Government.
                        </p>
                        <div style={{ background: '#0b0e11', padding: '20px', borderRadius: '8px', border: '1px solid #2b3139' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#848e9c' }}>Allocation</span>
                                <span className="text-success font-bold">20% of AUM</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#848e9c' }}>Risk Level</span>
                                <span style={{ color: '#fff' }}>Zero</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Ready to Deploy?</h2>
                    <a href="/" className="btn btn-primary" style={{ padding: '20px 40px', fontSize: '1.2rem' }}>
                        Open Managed Account
                    </a>
                </div>

            </div>
        </main>
    );
}
