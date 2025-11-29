"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ShieldCheck, Terminal, AlertTriangle } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, error, success
    const [cursorVisible, setCursorVisible] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible((v) => !v);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setError("");

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                // Simulate 2FA delay
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                setError(data.message || "Login failed");
                setStatus("error");
            }
        } catch (err) {
            setError("Connection error");
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen flex flex-col" style={{ background: '#050505', color: '#00ff41', fontFamily: '"Courier New", Courier, monospace' }}>

            {/* Top Bar */}
            <div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#848e9c', textDecoration: 'none', fontSize: '0.9rem' }}>
                    <ArrowLeft size={16} /> RETURN_TO_PUBLIC_SITE
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#848e9c' }}>
                    <ShieldCheck size={14} /> CONNECTION_SECURE_TLS_1.3
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div style={{ maxWidth: '450px', width: '100%' }}>

                    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                        <Terminal size={48} style={{ color: 'var(--color-primary)', marginBottom: '20px' }} />
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#fff', letterSpacing: '2px' }}>INSTITUTIONAL_ACCESS</h1>
                        <p style={{ color: '#848e9c', fontSize: '0.9rem' }}>AUTHORIZED_PERSONNEL_ONLY</p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #333', padding: '30px', borderRadius: '4px' }}>

                        <form onSubmit={handleLogin}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: '#848e9c' }}>CLIENT_ID / EMAIL</label>
                                <div style={{ display: 'flex', alignItems: 'center', background: '#000', border: '1px solid #333', padding: '12px' }}>
                                    <span style={{ color: 'var(--color-primary)', marginRight: '10px' }}>&gt;</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontFamily: 'inherit' }}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: '#848e9c' }}>ACCESS_KEY</label>
                                <div style={{ display: 'flex', alignItems: 'center', background: '#000', border: '1px solid #333', padding: '12px' }}>
                                    <span style={{ color: 'var(--color-primary)', marginRight: '10px' }}>&gt;</span>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontFamily: 'inherit' }}
                                    />
                                </div>
                            </div>

                            {status === 'error' && (
                                <div style={{ marginBottom: '20px', padding: '10px', background: 'rgba(246, 70, 93, 0.1)', border: '1px solid var(--color-danger)', color: 'var(--color-danger)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <AlertTriangle size={16} /> {error || "ACCESS_DENIED"}
                                </div>
                            )}

                            {status === 'loading' && (
                                <div style={{ marginBottom: '20px', color: 'var(--color-primary)', fontSize: '0.8rem' }}>
                                    AUTHENTICATING{cursorVisible ? '_' : ' '}
                                </div>
                            )}

                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    background: 'var(--color-primary)',
                                    color: '#000',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}
                            >
                                Initialize_Session
                            </button>
                        </form>

                        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem' }}>
                            <a href="#" style={{ color: '#848e9c', textDecoration: 'underline' }}>FORGOT_ACCESS_KEY?</a>
                        </div>

                    </div>

                    <div style={{ marginTop: '40px', borderTop: '1px solid #333', paddingTop: '20px', fontSize: '0.7rem', color: '#555', lineHeight: '1.6' }}>
                        <p>SYSTEM_NOTICE:</p>
                        <p>UNAUTHORIZED ACCESS ATTEMPTS ARE LOGGED AND REPORTED. IP_ADDRESS: [REDACTED]</p>
                        <p>SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                    </div>

                </div>
            </div>
        </main>
    );
}
