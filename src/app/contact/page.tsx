import { Metadata } from 'next';
import { ArrowLeft, Mail, MapPin, Phone, Globe, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
    title: 'Contact Institutional Sales | YoPips Hedge Fund',
    description: 'Contact our London, Dubai, or Singapore offices for institutional inquiries.',
};

export default function Contact() {
    return (
        <main className="min-h-screen pt-[40px] pb-[100px]">
            <div className="container">
                {/* Nav */}
                <div style={{ marginBottom: '40px' }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary)', fontWeight: '600' }}>
                        <ArrowLeft size={20} /> Return to Home
                    </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>

                    {/* Left: Content */}
                    <div>
                        <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Global Reach. <br /> Local Presence.</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '60px' }}>
                            We operate 24/7 across three major financial hubs. Whether you are in New York, London, or Tokyo, our team is awake.
                        </p>

                        <div style={{ display: 'grid', gap: '30px' }}>

                            <div className="card" style={{ padding: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Mail size={24} className="text-primary" /> Institutional Sales
                                </h3>
                                <p style={{ color: '#ccc', marginBottom: '15px' }}>For new capital allocations above $50,000.</p>
                                <a href="mailto:institutional@yopips.com" style={{ color: '#fff', textDecoration: 'underline' }}>institutional@yopips.com</a>
                            </div>

                            <div className="card" style={{ padding: '30px', borderLeft: '4px solid var(--color-accent)' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <MessageSquare size={24} className="text-accent" /> Client Support
                                </h3>
                                <p style={{ color: '#ccc', marginBottom: '15px' }}>For existing partners and technical inquiries.</p>
                                <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
                                    <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>WhatsApp Support</a>
                                    <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>Schedule 1-1 Video</a>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '30px', borderLeft: '4px solid #fff' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <MapPin size={24} className="text-white" /> Visit Us
                                </h3>
                                <p style={{ color: '#ccc', marginBottom: '15px' }}>Come see our trading floor. Open to investors with $50k+ active balance.</p>
                                <div style={{ color: '#848e9c', fontSize: '0.9rem' }}>
                                    Canary Wharf, London<br />
                                    DIFC, Dubai<br />
                                    Marina Bay, Singapore
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right: Visual Map (Abstract) */}
                    <div style={{ position: 'relative', height: '500px', background: 'radial-gradient(circle at center, #1e2329 0%, #0b0e11 70%)', borderRadius: '24px', border: '1px solid #2b3139', overflow: 'hidden' }}>
                        {/* Map Dots */}
                        <div style={{ position: 'absolute', top: '30%', left: '48%', width: '12px', height: '12px', background: 'var(--color-primary)', borderRadius: '50%', boxShadow: '0 0 20px var(--color-primary)' }}></div> {/* London */}
                        <div style={{ position: 'absolute', top: '30%', left: '48%', color: '#fff', fontSize: '0.8rem', transform: 'translate(20px, -5px)' }}>London (HQ)</div>

                        <div style={{ position: 'absolute', top: '45%', left: '65%', width: '12px', height: '12px', background: 'var(--color-primary)', borderRadius: '50%', boxShadow: '0 0 20px var(--color-primary)' }}></div> {/* Dubai */}
                        <div style={{ position: 'absolute', top: '45%', left: '65%', color: '#fff', fontSize: '0.8rem', transform: 'translate(20px, -5px)' }}>Dubai</div>

                        <div style={{ position: 'absolute', top: '55%', left: '80%', width: '12px', height: '12px', background: 'var(--color-primary)', borderRadius: '50%', boxShadow: '0 0 20px var(--color-primary)' }}></div> {/* Singapore */}
                        <div style={{ position: 'absolute', top: '55%', left: '80%', color: '#fff', fontSize: '0.8rem', transform: 'translate(20px, -5px)' }}>Singapore</div>

                        {/* Connecting Lines */}
                        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                            <path d="M 280 150 Q 380 200 380 225 T 470 275" stroke="rgba(252, 213, 53, 0.2)" strokeWidth="2" fill="none" />
                        </svg>

                        <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#555', fontSize: '0.8rem' }}>
                            * Offices are for administrative purposes only. Client meetings by appointment.
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
