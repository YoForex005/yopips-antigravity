"use client";

import { ChevronDown } from "lucide-react";

export default function FAQ() {
    return (
        <section style={{ padding: '100px 0', background: '#181a20', borderTop: '1px solid #2b3139' }}>
            <div className="container mx-auto" style={{ maxWidth: '800px' }}>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>Frequently Asked Questions</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                        { q: "How do I withdraw my profits?", a: "Withdrawals are processed 24/7 via USDT (TRC20) or Bank Wire. Requests are typically approved within 2 hours." },
                        { q: "Is my capital safe?", a: "We use a diversified 'Swiss Army Knife' strategy including Gold and US Govt Bonds to hedge against market volatility and protect your principal." },
                        { q: "What is the minimum investment?", a: "You can start with our $100 Test Drive to verify our performance. Institutional accounts start at $50,000." },
                        { q: "Are there any lock-in periods?", a: "No. You maintain full control of your capital. You can withdraw your principal and profits at any time without penalty." }
                    ].map((item, i) => (
                        <details key={i} style={{ background: '#0b0e11', border: '1px solid #2b3139', borderRadius: '8px', padding: '20px', cursor: 'pointer' }}>
                            <summary style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {item.q}
                                <ChevronDown size={20} className="text-primary" />
                            </summary>
                            <p style={{ marginTop: '15px', color: '#848e9c', lineHeight: '1.6' }}>{item.a}</p>
                        </details>
                    ))}
                </div>

            </div>
        </section>
    );
}
