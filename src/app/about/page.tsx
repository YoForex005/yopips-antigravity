"use client";

import { ArrowLeft, Brain, Code2, Cpu, LineChart, Users, Globe, Zap } from "lucide-react";

export default function About() {
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
                <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                    <h1 className="section-title" style={{ fontSize: '4rem', marginBottom: '20px' }}>Math &gt; Emotion</h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
                        We don't hire "traders". We hire mathematicians, data scientists, and engineers.
                    </p>
                </div>

                {/* Philosophy Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', marginBottom: '120px', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>The Philosophy</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', marginBottom: '20px' }}>
                            Human traders are flawed. They panic when markets crash and get greedy when they rise. They need sleep, they have biases, and they make mistakes.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc' }}>
                            <strong>YoPips is different.</strong> We believe that the market is a solvable math problem. By removing the human element from execution, we achieve consistency that is mathematically impossible for a manual trader.
                        </p>
                    </div>
                    <div style={{ background: '#1e2329', padding: '40px', borderRadius: '12px', border: '1px solid #2b3139' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                            <Brain size={40} className="text-danger" />
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Human Trader</div>
                        </div>
                        <ul style={{ listStyle: 'none', color: '#848e9c', marginBottom: '40px' }}>
                            <li style={{ marginBottom: '10px' }}>❌ Emotional Decision Making</li>
                            <li style={{ marginBottom: '10px' }}>❌ Limited Attention Span</li>
                            <li style={{ marginBottom: '10px' }}>❌ Inconsistent Execution</li>
                        </ul>

                        <div style={{ height: '1px', background: '#2b3139', marginBottom: '40px' }}></div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                            <Cpu size={40} className="text-primary" />
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>YoPips Algo</div>
                        </div>
                        <ul style={{ listStyle: 'none', color: '#fff' }}>
                            <li style={{ marginBottom: '10px' }}>✅ Pure Logic & Probability</li>
                            <li style={{ marginBottom: '10px' }}>✅ 24/7 Market Monitoring</li>
                            <li style={{ marginBottom: '10px' }}>✅ Millisecond Execution</li>
                        </ul>
                    </div>
                </div>

                {/* The Team */}
                <div style={{ marginBottom: '100px' }}>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>The Architects</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

                        {/* Profile 1 */}
                        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #2b3139, #0b0e11)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--color-primary)' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>AK</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>Dr. A.K.</h3>
                            <div style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '15px' }}>Chief Investment Officer</div>
                            <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                PhD in Computational Finance from MIT. Formerly a Senior Quant at Goldman Sachs. Specializes in HFT arbitrage strategies.
                            </p>
                        </div>

                        {/* Profile 2 */}
                        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #2b3139, #0b0e11)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--color-accent)' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>JR</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>J.R.</h3>
                            <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: '15px' }}>Head of Algorithms</div>
                            <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Former Data Scientist at CERN. Expert in machine learning and pattern recognition. Architect of the "Swiss Army" protocol.
                            </p>
                        </div>

                        {/* Profile 3 */}
                        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #2b3139, #0b0e11)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--color-success)' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>SL</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>S.L.</h3>
                            <div style={{ color: 'var(--color-success)', fontWeight: 'bold', marginBottom: '15px' }}>Risk Manager</div>
                            <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                20+ years in Institutional Forex Risk. Previously managed risk for a $5B hedge fund in London. Ensures zero-blowout architecture.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}
