
"use client";

import { useState, useEffect } from "react";
import { User, Lock, Bell, Globe, Shield, Save, ChevronRight, Terminal, CheckCircle, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Profile State
    const [profile, setProfile] = useState({
        firstName: "INSTITUTIONAL",
        lastName: "CLIENT",
        email: "client@institution.com",
        institutionId: "GLOBAL_VENTURES_LTD"
    });

    // Security State
    const [security, setSecurity] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Preferences State
    const [prefs, setPrefs] = useState({
        currency: "USD",
        language: "EN",
        timezone: "EST"
    });

    // Notifications State
    const [notifications, setNotifications] = useState({
        deposit: true,
        withdrawal: true,
        trade: true,
        pnl: true,
        security: true,
        marketing: false
    });

    const [showTwoFA, setShowTwoFA] = useState(false);
    const [twoFACode, setTwoFACode] = useState("");
    const [twoFAStatus, setTwoFAStatus] = useState<"IDLE" | "VERIFYING" | "SUCCESS" | "ERROR">("IDLE");

    const handleVerifyTwoFA = async (e: React.FormEvent) => {
        e.preventDefault();
        setTwoFAStatus("VERIFYING");
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (twoFACode === "123456") {
            setTwoFAStatus("SUCCESS");
            setTimeout(() => {
                setShowTwoFA(false);
                setSuccessMsg("2FA_ENABLED_SUCCESSFULLY");
                setTwoFACode("");
                setTwoFAStatus("IDLE");
            }, 2000);
        } else {
            setTwoFAStatus("ERROR");
        }
    };

    const handleSave = async (section: string) => {
        setLoading(true);
        setSuccessMsg(null);

        if (section === "CREDENTIALS") {
            if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
                setLoading(false);
                alert("ERROR: ALL_FIELDS_REQUIRED");
                return;
            }
            if (security.newPassword !== security.confirmPassword) {
                setLoading(false);
                alert("ERROR: PASSWORDS_DO_NOT_MATCH");
                return;
            }
        }

        // Simulate API Call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setSuccessMsg(`${section}_UPDATED_SUCCESSFULLY`);

        if (section === "CREDENTIALS") {
            setSecurity({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        }

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMsg(null), 3000);
    };

    return (
        <div className="max-w-5xl mx-auto relative">
            {/* 2FA Modal */}
            {showTwoFA && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="card max-w-md w-full border-[var(--color-primary)] shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white uppercase tracking-widest text-glow">Configure_2FA</h2>
                                <p className="text-[10px] text-[var(--color-text-secondary)] font-mono mt-1">:: ENHANCED_SECURITY_PROTOCOL ::</p>
                            </div>
                            <button onClick={() => setShowTwoFA(false)} className="text-[var(--color-text-secondary)] hover:text-white">
                                <Terminal size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="w-48 h-48 bg-white p-2 rounded-lg">
                                    {/* Mock QR Code */}
                                    <div className="w-full h-full bg-black pattern-grid-lg opacity-80 flex items-center justify-center">
                                        <div className="text-black font-bold text-xs text-center">
                                            [ QR_CODE_MATRIX ]
                                            <br />
                                            SCAN_WITH_AUTH_APP
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 p-3 text-center">
                                <p className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Manual_Entry_Key</p>
                                <p className="text-sm font-mono text-[var(--color-primary)] font-bold tracking-widest">X7Y2-9L4M-3P8Q-5R1Z</p>
                            </div>

                            <form onSubmit={handleVerifyTwoFA} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Verification_Code</label>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        placeholder="000000"
                                        className="input-field text-center text-2xl tracking-[0.5em] font-mono"
                                        value={twoFACode}
                                        onChange={(e) => setTwoFACode(e.target.value.replace(/[^0-9]/g, ''))}
                                    />
                                </div>

                                {twoFAStatus === "ERROR" && (
                                    <div className="text-xs text-[var(--color-danger)] font-bold text-center uppercase tracking-wider flex items-center justify-center">
                                        <AlertTriangle size={14} className="mr-2" />
                                        Invalid_Code_Try_123456
                                    </div>
                                )}

                                {twoFAStatus === "SUCCESS" && (
                                    <div className="text-xs text-[var(--color-success)] font-bold text-center uppercase tracking-wider flex items-center justify-center">
                                        <CheckCircle size={14} className="mr-2" />
                                        Verification_Successful
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={twoFAStatus === "VERIFYING" || twoFAStatus === "SUCCESS"}
                                    className="btn btn-primary w-full py-3 text-xs font-bold"
                                >
                                    {twoFAStatus === "VERIFYING" ? "VERIFYING..." : "ACTIVATE_2FA"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-8 border-b border-[var(--border-color)] pb-6">
                <h1 className="text-2xl font-bold text-white tracking-widest uppercase text-glow">System_Config</h1>
                <p className="text-[var(--color-text-secondary)] text-[10px] mt-1 font-mono">:: USER_PREFERENCES_AND_SECURITY ::</p>
            </div>

            {successMsg && (
                <div className="mb-6 p-4 border border-[var(--color-success)] bg-[var(--color-success)]/10 flex items-center animate-fade-in">
                    <CheckCircle size={16} className="text-[var(--color-success)] mr-3" />
                    <span className="text-xs font-bold text-[var(--color-success)] uppercase tracking-wider">{successMsg}</span>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Settings Sidebar */}
                <div className="w-full lg:w-72 flex-shrink-0">
                    <div className="card p-0 border-[var(--border-color)]">
                        <div className="p-3 border-b border-[var(--border-color)] bg-black/40 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                            Config_Modules
                        </div>
                        <nav className="flex flex-col p-2 space-y-1">
                            {[
                                { id: "profile", name: "PROFILE_DATA", icon: User, desc: "ID_VERIFICATION" },
                                { id: "security", name: "SECURITY_PROTOCOLS", icon: Lock, desc: "2FA_ENCRYPTION" },
                                { id: "preferences", name: "SYSTEM_PREFS", icon: Globe, desc: "LOCALE_TIME" },
                                { id: "notifications", name: "ALERT_MATRIX", icon: Bell, desc: "SIGNAL_ROUTING" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { setActiveTab(item.id); setSuccessMsg(null); }}
                                    className={`flex items-center p-3 transition-all text-left group border ${activeTab === item.id
                                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)] shadow-[0_0_10px_rgba(255,215,0,0.2)]"
                                        : "text-[var(--color-text-secondary)] border-transparent hover:border-[var(--color-primary)]/30 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <div className={`p-2 mr-3 border ${activeTab === item.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]/20" : "border-[var(--border-color)] bg-black"}`}>
                                        <item.icon size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-xs tracking-wider">{item.name}</div>
                                        <div className="text-[10px] font-mono opacity-60">{item.desc}</div>
                                    </div>
                                    {activeTab === item.id && <div className="w-1.5 h-1.5 bg-[var(--color-primary)] animate-pulse"></div>}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                    <div className="card p-0 border-[var(--border-color)]">
                        {activeTab === "profile" && (
                            <div className="animate-fade-in">
                                <div className="border-b border-[var(--border-color)] p-6 bg-black/40">
                                    <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                        <User size={16} className="mr-2 text-[var(--color-primary)]" />
                                        Profile_Information
                                    </h2>
                                </div>

                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">First_Name</label>
                                        <input
                                            type="text"
                                            value={profile.firstName}
                                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Last_Name</label>
                                        <input
                                            type="text"
                                            value={profile.lastName}
                                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                            className="input-field"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Email_Address</label>
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className="input-field"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Institution_ID</label>
                                        <input
                                            type="text"
                                            value={profile.institutionId}
                                            readOnly
                                            className="input-field opacity-50 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="p-6 border-t border-[var(--border-color)] bg-black/40 flex justify-end">
                                    <button
                                        onClick={() => handleSave("PROFILE")}
                                        disabled={loading}
                                        className="btn btn-primary text-xs font-bold"
                                    >
                                        {loading ? "SAVING..." : <><Save size={16} className="mr-2" /> SAVE_CHANGES</>}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="animate-fade-in">
                                <div className="border-b border-[var(--border-color)] p-6 bg-black/40">
                                    <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                        <Lock size={16} className="mr-2 text-[var(--color-primary)]" />
                                        Security_Protocols
                                    </h2>
                                </div>

                                <div className="p-6 space-y-8">
                                    <div className="p-4 bg-[var(--color-success)]/5 border border-[var(--color-success)]/30 flex items-start">
                                        <div className="p-2 border border-[var(--color-success)] text-[var(--color-success)] mr-4 bg-[var(--color-success)]/10">
                                            <Shield size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-[var(--color-success)] font-bold mb-1 uppercase tracking-wider text-xs">2FA_Encryption_Active</h3>
                                            <p className="text-[10px] text-[var(--color-text-secondary)] mb-4 font-mono">:: SECURE_CHANNEL_ESTABLISHED ::</p>
                                            <button
                                                onClick={() => setShowTwoFA(true)}
                                                className="text-[var(--color-success)] text-[10px] font-bold hover:text-white transition-colors border border-[var(--color-success)] px-3 py-1 uppercase tracking-wider hover:bg-[var(--color-success)] hover:text-black"
                                            >
                                                CONFIGURE_2FA
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-wider border-b border-[var(--border-color)] pb-2 inline-block">Change_Access_Key</h3>
                                        <div className="space-y-4 max-w-md">
                                            <div>
                                                <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Current_Password</label>
                                                <input
                                                    type="password"
                                                    value={security.currentPassword}
                                                    onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                                                    className="input-field"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">New_Password</label>
                                                <input
                                                    type="password"
                                                    value={security.newPassword}
                                                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                                                    className="input-field"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Confirm_New_Password</label>
                                                <input
                                                    type="password"
                                                    value={security.confirmPassword}
                                                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                                                    className="input-field"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-[var(--border-color)] bg-black/40 flex justify-end">
                                    <button
                                        onClick={() => handleSave("CREDENTIALS")}
                                        disabled={loading}
                                        className="btn btn-primary text-xs font-bold"
                                    >
                                        {loading ? "UPDATING..." : <><Save size={16} className="mr-2" /> UPDATE_CREDENTIALS</>}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "preferences" && (
                            <div className="animate-fade-in">
                                <div className="border-b border-[var(--border-color)] p-6 bg-black/40">
                                    <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                        <Globe size={16} className="mr-2 text-[var(--color-primary)]" />
                                        System_Preferences
                                    </h2>
                                </div>

                                <div className="p-6 space-y-6 max-w-md">
                                    <div>
                                        <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Display_Currency</label>
                                        <select
                                            value={prefs.currency}
                                            onChange={(e) => setPrefs({ ...prefs, currency: e.target.value })}
                                            className="input-field appearance-none uppercase"
                                        >
                                            <option value="USD">USD - US DOLLAR</option>
                                            <option value="EUR">EUR - EURO</option>
                                            <option value="GBP">GBP - BRITISH POUND</option>
                                            <option value="JPY">JPY - JAPANESE YEN</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Interface_Language</label>
                                        <select
                                            value={prefs.language}
                                            onChange={(e) => setPrefs({ ...prefs, language: e.target.value })}
                                            className="input-field appearance-none uppercase"
                                        >
                                            <option value="EN">ENGLISH (US)</option>
                                            <option value="ES">SPANISH</option>
                                            <option value="FR">FRENCH</option>
                                            <option value="DE">GERMAN</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Time_Zone</label>
                                        <select
                                            value={prefs.timezone}
                                            onChange={(e) => setPrefs({ ...prefs, timezone: e.target.value })}
                                            className="input-field appearance-none uppercase"
                                        >
                                            <option value="EST">(GMT-05:00) EASTERN TIME</option>
                                            <option value="GMT">(GMT+00:00) LONDON</option>
                                            <option value="CET">(GMT+01:00) PARIS</option>
                                            <option value="JST">(GMT+09:00) TOKYO</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-[var(--border-color)] bg-black/40 flex justify-end">
                                    <button
                                        onClick={() => handleSave("PREFERENCES")}
                                        disabled={loading}
                                        className="btn btn-primary text-xs font-bold"
                                    >
                                        {loading ? "SAVING..." : <><Save size={16} className="mr-2" /> SAVE_PREFS</>}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="animate-fade-in">
                                <div className="border-b border-[var(--border-color)] p-6 bg-black/40">
                                    <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                        <Bell size={16} className="mr-2 text-[var(--color-primary)]" />
                                        Alert_Matrix
                                    </h2>
                                </div>

                                <div className="p-6 space-y-4">
                                    {[
                                        { id: "deposit", label: "DEPOSIT_CONFIRMATION_EMAIL" },
                                        { id: "withdrawal", label: "WITHDRAWAL_ALERT_EMAIL" },
                                        { id: "trade", label: "TRADE_EXECUTION_SIGNAL" },
                                        { id: "pnl", label: "DAILY_PNL_REPORT" },
                                        { id: "security", label: "SECURITY_BREACH_ALERT" },
                                        { id: "marketing", label: "MARKETING_COMMUNICATION" }
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 border border-[var(--border-color)] bg-black/60 hover:border-[var(--color-primary)] transition-colors group">
                                            <span className="text-[var(--color-text)] font-bold text-xs tracking-wider">{item.label}</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications[item.id as keyof typeof notifications]}
                                                    onChange={(e) => {
                                                        setNotifications({ ...notifications, [item.id]: e.target.checked });
                                                        // Auto-save for toggles
                                                        // handleSave("ALERT_SETTING"); 
                                                    }}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-10 h-5 bg-[var(--border-color)] peer-focus:outline-none peer-checked:bg-[var(--color-primary)] transition-all relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border after:border-gray-500 after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-black"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 border-t border-[var(--border-color)] bg-black/40 flex justify-end">
                                    <button
                                        onClick={() => handleSave("NOTIFICATIONS")}
                                        disabled={loading}
                                        className="btn btn-primary text-xs font-bold"
                                    >
                                        {loading ? "SAVING..." : <><Save size={16} className="mr-2" /> SAVE_CONFIG</>}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
