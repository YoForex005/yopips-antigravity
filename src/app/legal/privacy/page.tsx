"use client";

import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen pt-[40px] pb-[100px]">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ marginBottom: '40px' }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary)', fontWeight: '600' }}>
                        <ArrowLeft size={20} /> Return to Home
                    </a>
                </div>

                <h1 className="section-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>Privacy Policy</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '60px' }}>Last Updated: October 24, 2024</p>

                <div className="card" style={{ lineHeight: '1.8', color: '#ccc' }}>
                    <h2 style={{ color: '#fff', marginBottom: '20px' }}>1. Introduction</h2>
                    <p style={{ marginBottom: '20px' }}>
                        YoPips Hedge Fund ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website or use our institutional investment services.
                    </p>

                    <h2 style={{ color: '#fff', marginBottom: '20px', marginTop: '40px' }}>2. Data Collection</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We collect personal information that you voluntarily provide to us when you register for a managed account, express interest in obtaining information about us or our products and services, when you participate in activities on the Site, or otherwise when you contact us.
                    </p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                        <li>Personal Data (Name, Email, Phone Number)</li>
                        <li>Financial Data (Investment Goals, Capital Allocation)</li>
                        <li>Technical Data (IP Address, Browser Type)</li>
                    </ul>

                    <h2 style={{ color: '#fff', marginBottom: '20px', marginTop: '40px' }}>3. Use of Information</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We use the information we collect or receive:
                    </p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                        <li>To facilitate account creation and logon process.</li>
                        <li>To send you administrative information.</li>
                        <li>To fulfill and manage your orders.</li>
                        <li>To enforce our terms, conditions, and policies.</li>
                    </ul>

                    <h2 style={{ color: '#fff', marginBottom: '20px', marginTop: '40px' }}>4. Security</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                    </p>

                    <h2 style={{ color: '#fff', marginBottom: '20px', marginTop: '40px' }}>5. Contact Us</h2>
                    <p>
                        If you have questions or comments about this policy, you may email us at legal@yopips.fund or by post to:
                        <br /><br />
                        YoPips Hedge Fund Ltd.<br />
                        Canary Wharf, London<br />
                        United Kingdom
                    </p>
                </div>
            </div>
        </main>
    );
}
