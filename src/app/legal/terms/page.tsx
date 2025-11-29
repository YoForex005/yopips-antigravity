"use client";

import { ShieldCheck, ArrowLeft, AlertTriangle } from "lucide-react";

export default function TermsOfService() {
    return (
        <main className="min-h-screen pt-[40px] pb-[100px]">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ marginBottom: '40px' }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary)', fontWeight: '600' }}>
                        <ArrowLeft size={20} /> Return to Home
                    </a>
                </div>

                <h1 className="section-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>Terms of Service</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '60px' }}>Last Updated: October 24, 2024</p>

                <div className="card" style={{ lineHeight: '1.8', color: '#ccc' }}>

                    <div style={{ background: 'rgba(246, 70, 93, 0.1)', border: '1px solid var(--color-danger)', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-danger)', fontWeight: 'bold', marginBottom: '10px' }}>
                            <AlertTriangle size={24} /> RISK DISCLOSURE
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#fff' }}>
                            Trading in financial markets involves a high degree of risk and may not be suitable for all investors. You could lose some or all of your initial investment; do not invest money that you cannot afford to lose.
                        </p>
                    </div>

                    <h2 style={{ color: '#fff', marginBottom: '20px' }}>1. Agreement to Terms</h2>
                    <p style={{ marginBottom: '20px' }}>
                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and YoPips Hedge Fund ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                    </p>

                    <h2 style={{ color: '#fff', marginBottom: '20px', marginTop: '40px' }}>2. Intellectual Property Rights</h2>
                    <p style={{ marginBottom: '20px' }}>
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
                    </p>

                    <h2 style={{ color: '#fff', marginBottom: '20px', marginTop: '40px' }}>3. User Representations</h2>
                    <p style={{ marginBottom: '20px' }}>
                        By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
                    </p>

                    <h2 style={{ color: '#fff', marginBottom: '20px', marginTop: '40px' }}>4. Limitation of Liability</h2>
                    <p style={{ marginBottom: '20px' }}>
                        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                    </p>

                    <h2 style={{ color: '#fff', marginBottom: '20px', marginTop: '40px' }}>5. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and defined following the laws of the United Kingdom. YoPips Hedge Fund and yourself irrevocably consent that the courts of the United Kingdom shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                    </p>
                </div>
            </div>
        </main>
    );
}
