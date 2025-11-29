import { Metadata } from 'next';
import { ArrowLeft, ChevronDown, ShieldCheck, Lock, FileCheck, Wallet, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: 'Institutional FAQ | YoPips Hedge Fund',
    description: 'Answers regarding custody, security, fees, and institutional compliance.',
};

export default function FAQ() {
    return (
        <main className="min-h-screen pt-[40px] pb-[100px]">
            <div className="container" style={{ maxWidth: '900px' }}>
                {/* Nav */}
                <div style={{ marginBottom: '40px' }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary)', fontWeight: '600' }}>
                        <ArrowLeft size={20} /> Return to Home
                    </a>
                </div>

                {/* Power Visual Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px', position: 'relative' }}>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '300px', height: '300px', background: 'var(--color-primary)', filter: 'blur(150px)', opacity: 0.1, zIndex: -1
                    }}></div>
                    <HelpCircle size={80} className="text-primary" style={{ marginBottom: '20px', filter: 'drop-shadow(0 0 20px rgba(252, 213, 53, 0.3))' }} />
                    <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Institutional FAQ</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Transparency is our currency. Here is everything you need to know about our custody, fees, and security protocols.
                    </p>
                </div>

                {/* FAQ Grid */}
                <div style={{ display: 'grid', gap: '30px' }}>

                    {/* Item 1 */}
                    <div className="card" style={{ padding: '40px' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ minWidth: '50px' }}><ShieldCheck size={40} className="text-success" /></div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#fff' }}>Is my capital safe?</h3>
                                <p style={{ lineHeight: '1.8', color: '#ccc' }}>
                                    Absolutely. We utilize <strong>Segregated Client Accounts</strong> with Tier-1 banks (Barclays, HSBC). Your funds are never commingled with firm operational capital. Furthermore, our "Swiss Army Knife" strategy includes a 20% allocation to US Treasury Bills, providing a risk-free floor for your portfolio.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="card" style={{ padding: '40px' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ minWidth: '50px' }}><Lock size={40} className="text-primary" /></div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#fff' }}>What is the lock-up period?</h3>
                                <p style={{ lineHeight: '1.8', color: '#ccc' }}>
                                    There is <strong>zero lock-up</strong>. We believe in liquidity. You can request a withdrawal of your profits or principal at any time. Withdrawals are processed within 24 hours via USDT (TRC20/ERC20) or Bank Wire Transfer.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="card" style={{ padding: '40px' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ minWidth: '50px' }}><FileCheck size={40} className="text-primary" /></div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#fff' }}>Are there management fees?</h3>
                                <p style={{ lineHeight: '1.8', color: '#ccc' }}>
                                    We operate on a <strong>Performance Fee Only</strong> model. We charge a flat 20% fee on <em>profits only</em>. If you don't make money, we don't make money. There are no setup fees, no monthly subscriptions, and no hidden costs.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="card" style={{ padding: '40px' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ minWidth: '50px' }}><Wallet size={40} className="text-primary" /></div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#fff' }}>What is the minimum investment?</h3>
                                <p style={{ lineHeight: '1.8', color: '#ccc' }}>
                                    We have lowered our entry barrier to build trust. You can start a <strong>Test Drive with just $100</strong>. This allows you to verify our execution and withdrawals before committing significant capital.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
