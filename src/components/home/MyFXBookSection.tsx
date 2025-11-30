"use client";

import { ShieldCheck, ExternalLink, TrendingUp, Target, Award } from "lucide-react";

export default function MyFXBookSection() {
    return (
        <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)', borderTop: 'var(--glass-border)' }}>
            <div className="container mx-auto">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(14, 203, 129, 0.1)', color: 'var(--color-success)', padding: '8px 20px', borderRadius: '20px', marginBottom: '20px', fontWeight: 'bold', fontSize: '0.75rem' }}>
                        <ShieldCheck size={16} /> THIRD-PARTY VERIFIED
                    </div>
                    <h2 className="section-title">Verified Gold Trading Performance</h2>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Our flagship Gold (XAUUSD) trading system is independently audited by MyFXBook.
                        View live, unaltered performance data.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '50px' }}>

                    {/* Stat Card 1 */}
                    <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
                        <TrendingUp size={40} color="var(--color-success)" style={{ margin: '0 auto 20px' }} />
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-success)', marginBottom: '10px' }}>
                            +24%
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                            Average Monthly Return
                        </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
                        <Target size={40} color="var(--color-primary)" style={{ margin: '0 auto 20px' }} />
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '10px' }}>
                            85%+
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                            Win Rate
                        </div>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
                        <Award size={40} color="var(--color-danger)" style={{ margin: '0 auto 20px' }} />
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>
                            2.4
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                            Profit Factor
                        </div>
                    </div>

                </div>

                {/* CTA Section */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                    <a
                        href="https://www.myfxbook.com/members/YoForexLLC/quantex-pro-ai/11789404"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1rem', padding: '15px 40px' }}
                    >
                        View Full MyFXBook Report
                        <ExternalLink size={18} />
                    </a>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        ⚠️ Other pools lack external verification. <strong>Book a 1-on-1 demo</strong> to see live proof for Gold trading.
                    </p>
                </div>
            </div>
        </section>
    );
}
