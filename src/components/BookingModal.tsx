"use client";

import { X, Calendar, Video } from "lucide-react";
import { useEffect } from "react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    calendlyUrl?: string;
}

export default function BookingModal({ isOpen, onClose, calendlyUrl = "https://calendly.com/your-username/30min" }: BookingModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Load Calendly widget script
    useEffect(() => {
        if (isOpen && !document.querySelector('script[src*="calendly"]')) {
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(10px)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: '#1e2329',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    maxWidth: '1000px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '20px 30px',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(180deg, rgba(252, 213, 53, 0.05) 0%, transparent 100%)'
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '5px' }}>
                            Book Your 1-on-1 Demo
                        </h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                            See live Gold trading performance & get your questions answered
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border-color)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--color-danger)';
                            e.currentTarget.style.borderColor = 'var(--color-danger)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Benefits */}
                <div style={{
                    padding: '20px 30px',
                    background: 'rgba(0,0,0,0.3)',
                    borderBottom: '1px solid var(--border-color)'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Video size={20} color="var(--color-success)" />
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                Live MyFXBook Walkthrough
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Calendar size={20} color="var(--color-primary)" />
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                30-Minute Session
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <X size={20} color="var(--color-danger)" />
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                No Commitment Required
                            </span>
                        </div>
                    </div>
                </div>

                {/* Calendly Embed */}
                <div
                    className="calendly-inline-widget"
                    data-url={calendlyUrl}
                    style={{
                        minWidth: '320px',
                        height: '700px',
                        overflow: 'auto'
                    }}
                ></div>
            </div>
        </div>
    );
}
