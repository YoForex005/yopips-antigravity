"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, ShieldCheck, Calendar, PieChart, Lock, CheckCircle2, Video, X } from "lucide-react";

export default function Wizard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [quizData, setQuizData] = useState({ goal: "", liquidity: "", amount: "" });
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleQuizSelect = (key: string, value: string) => {
        setQuizData({ ...quizData, [key]: value });
        if (step < 3) setStep(step + 1);
        else startAnalysis();
    };

    const startAnalysis = () => {
        setStep(4);
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setStep(5);
        }, 2000);
    };

    return (
        <div className={`wizard-overlay ${isOpen ? 'open' : ''}`}>
            <div className="wizard-container">
                <button className="wizard-close" onClick={onClose}><X size={24} /></button>

                {/* Step 1: Goal */}
                <div className={`wizard-step ${step === 1 ? 'active' : ''}`}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center', color: '#fff' }}>Primary Investment Goal?</h3>
                    <button className="wizard-option" onClick={() => handleQuizSelect('goal', 'Aggressive Growth')}>
                        <TrendingUp size={24} style={{ display: 'inline', marginRight: '15px', verticalAlign: 'middle', color: 'var(--color-primary)' }} />
                        Aggressive Growth (Target 7%+ Monthly)
                    </button>
                    <button className="wizard-option" onClick={() => handleQuizSelect('goal', 'Steady Income')}>
                        <DollarSign size={24} style={{ display: 'inline', marginRight: '15px', verticalAlign: 'middle', color: 'var(--color-primary)' }} />
                        Steady Passive Income
                    </button>
                    <button className="wizard-option" onClick={() => handleQuizSelect('goal', 'Wealth Preservation')}>
                        <ShieldCheck size={24} style={{ display: 'inline', marginRight: '15px', verticalAlign: 'middle', color: 'var(--color-primary)' }} />
                        Wealth Preservation
                    </button>
                </div>

                {/* Step 2: Liquidity */}
                <div className={`wizard-step ${step === 2 ? 'active' : ''}`}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center', color: '#fff' }}>Preferred Liquidity?</h3>
                    <button className="wizard-option" onClick={() => handleQuizSelect('liquidity', 'Monthly')}>
                        <Calendar size={24} style={{ display: 'inline', marginRight: '15px', verticalAlign: 'middle', color: 'var(--color-primary)' }} />
                        Monthly Withdrawals
                    </button>
                    <button className="wizard-option" onClick={() => handleQuizSelect('liquidity', 'Quarterly')}>
                        <PieChart size={24} style={{ display: 'inline', marginRight: '15px', verticalAlign: 'middle', color: 'var(--color-primary)' }} />
                        Quarterly Compounding
                    </button>
                </div>

                {/* Step 3: Capital */}
                <div className={`wizard-step ${step === 3 ? 'active' : ''}`}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center', color: '#fff' }}>Initial Capital Allocation?</h3>
                    <button className="wizard-option" onClick={() => handleQuizSelect('amount', '10k-50k')}>
                        $10,000 - $50,000
                    </button>
                    <button className="wizard-option" onClick={() => handleQuizSelect('amount', '50k-250k')}>
                        $50,000 - $250,000
                    </button>
                    <button className="wizard-option" onClick={() => handleQuizSelect('amount', '250k+')}>
                        $250,000+ (Institutional)
                    </button>
                </div>

                {/* Step 4: Analysis Animation */}
                <div className={`wizard-step ${step === 4 ? 'active' : ''}`} style={{ textAlign: 'center', padding: '60px 0' }}>
                    <div style={{ marginBottom: '30px' }}>
                        <Lock size={64} className="text-primary" style={{ margin: '0 auto', animation: 'pulse 1s infinite' }} />
                    </div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '15px', color: '#fff' }}>Analyzing Strategy...</h3>
                    <p style={{ color: '#848e9c', fontSize: '1.2rem' }}>Matching your profile with our high-yield portfolios.</p>
                </div>

                {/* Step 5: Result & Contact */}
                <div className={`wizard-step ${step === 5 ? 'active' : ''}`}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <CheckCircle2 size={64} style={{ color: 'var(--color-primary)', margin: '0 auto 15px' }} />
                        <h3 style={{ fontSize: '2rem', marginBottom: '10px', color: '#fff' }}>Strategy Unlocked</h3>
                        <p style={{ color: '#848e9c', fontSize: '1.1rem' }}>
                            You qualify for the <strong>Titanium Growth Fund</strong>.
                        </p>
                    </div>

                    <div style={{ background: 'rgba(252, 213, 53, 0.05)', padding: '25px', borderRadius: '4px', marginBottom: '30px', border: '1px solid var(--color-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.1rem' }}>
                            <span>Projected Monthly Return:</span>
                            <span className="text-primary" style={{ fontWeight: 'bold' }}>7.2% - 12.5%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
                            <span>Management Fee:</span>
                            <span className="text-primary" style={{ fontWeight: 'bold' }}>0%</span>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <p style={{ marginBottom: '20px', color: '#fff' }}>
                            To proceed, we require a <strong>30-minute 1-1 Video Conference</strong> with a Senior Wealth Manager.
                        </p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); setStep(6); }}>
                        <input type="text" placeholder="Full Name" className="input-field" required />
                        <input type="email" placeholder="Email Address" className="input-field" required />
                        <input type="tel" placeholder="Phone Number (WhatsApp)" className="input-field" required />
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '18px' }}>
                            Request Video Conference Slot
                        </button>
                    </form>
                    <p style={{ fontSize: '0.9rem', color: '#848e9c', marginTop: '20px', textAlign: 'center' }}>
                        <Lock size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Your data is encrypted. No spam, ever.
                    </p>
                </div>

                {/* Step 6: Confirmation */}
                <div className={`wizard-step ${step === 6 ? 'active' : ''}`} style={{ textAlign: 'center', padding: '40px 0' }}>
                    <Video size={64} className="text-primary" style={{ margin: '0 auto 30px' }} />
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#fff' }}>Request Received</h3>
                    <p style={{ color: '#848e9c', fontSize: '1.2rem', marginBottom: '30px', lineHeight: '1.6' }}>
                        Thank you. Our team is currently checking availability for your <strong>1-1 Video Onboarding</strong>.
                        <br /><br />
                        We will contact you shortly via WhatsApp/Email to confirm your 30-minute slot.
                    </p>
                    <div style={{ background: '#1e2329', padding: '20px', borderRadius: '4px', display: 'inline-block', border: '1px solid #2b3139' }}>
                        <p style={{ color: '#848e9c' }}>Expected Response Time: <strong>&lt; 2 Hours</strong></p>
                    </div>
                    <br />
                    <button className="btn btn-outline" style={{ marginTop: '40px' }} onClick={onClose}>
                        Return to Website
                    </button>
                </div>

            </div>
        </div>
    );
}
