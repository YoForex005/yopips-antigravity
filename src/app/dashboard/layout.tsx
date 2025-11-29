"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PieChart,
    History,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    User,
    ChevronRight,
    Terminal,
    Wallet,
    Shield,
    MessageSquare
} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "OVERVIEW", href: "/dashboard", icon: LayoutDashboard },
        { name: "INVESTMENT_HUB", href: "/dashboard/invest", icon: PieChart },
        { name: "WALLET_&_BANKING", href: "/dashboard/wallet", icon: Wallet },
        { name: "TRANSACTIONS", href: "/dashboard/transactions", icon: History },
        { name: "KYC_VERIFICATION", href: "/dashboard/kyc", icon: Shield },
        { name: "SUPPORT_CENTER", href: "/dashboard/support", icon: MessageSquare },
        { name: "SYSTEM_CONFIG", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex font-mono selection:bg-[var(--color-primary)] selection:text-black">
            {/* Scanline Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 scanline opacity-20"></div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-black/50 backdrop-blur-md border-r border-[var(--border-color)] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="h-full flex flex-col relative">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-primary)]"></div>

                    {/* Logo */}
                    <div className="h-24 flex flex-col justify-center px-8 border-b border-[var(--border-color)] bg-black/20">
                        <div className="flex items-center gap-3 mb-1">
                            <Terminal size={24} className="text-[var(--color-primary)]" />
                            <span className="text-xl font-bold text-white tracking-widest text-glow">YOPIPS</span>
                        </div>
                        <div className="text-[10px] text-[var(--color-primary)] tracking-[0.2em] opacity-80 pl-9">
                            INSTITUTIONAL_ACCESS_V2.0
                        </div>
                        <button
                            className="absolute top-6 right-6 lg:hidden text-[var(--color-text-secondary)] hover:text-white"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 py-8 px-4 space-y-2">
                        <div className="px-4 mb-4 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--border-color)] pb-2">
                            // NAVIGATION_MODULE
                        </div>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center justify-between px-4 py-3 border border-transparent transition-all duration-200 ${isActive
                                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/30 shadow-[0_0_10px_rgba(255,215,0,0.1)]"
                                        : "text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 hover:border-white/10"
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <item.icon size={18} className={`mr-3 ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)] group-hover:text-white"}`} />
                                        <span className="tracking-wider text-sm">{item.name}</span>
                                    </div>
                                    {isActive && <div className="w-1.5 h-1.5 bg-[var(--color-primary)] shadow-[0_0_5px_var(--color-primary)]"></div>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile / Logout */}
                    <div className="p-6 border-t border-[var(--border-color)] bg-black/40">
                        <div className="flex items-center mb-4 p-3 border border-[var(--border-color)] bg-black/40">
                            <div className="w-10 h-10 flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
                                <User size={20} />
                            </div>
                            <div className="ml-3 overflow-hidden">
                                <div className="text-xs font-bold text-white truncate tracking-wider">INSTITUTIONAL_CLIENT</div>
                                <div className="text-[10px] text-[var(--color-text-muted)] truncate font-mono">ID: 8829102-X</div>
                            </div>
                        </div>
                        <Link
                            href="/login"
                            className="flex items-center justify-center w-full px-4 py-2 text-xs font-bold text-[var(--color-danger)] border border-[var(--color-danger)]/30 hover:bg-[var(--color-danger)] hover:text-black transition-all uppercase tracking-wider"
                        >
                            <LogOut size={16} className="mr-2" />
                            TERMINATE_SESSION
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* Header */}
                <header className="h-20 border-b border-[var(--border-color)] bg-black/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10">
                    <div className="flex items-center">
                        <button
                            className="lg:hidden text-[var(--color-text-secondary)] hover:text-white mr-4"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="hidden sm:flex items-center">
                            <span className="text-[var(--color-primary)] mr-2">&gt;</span>
                            <h2 className="text-lg font-bold text-white tracking-widest uppercase">
                                {navItems.find(i => i.href === pathname)?.name || 'DASHBOARD'}
                            </h2>
                            <span className="ml-2 animate-pulse text-[var(--color-primary)]">_</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex items-center px-3 py-1 border border-[var(--color-success)]/30 bg-[var(--color-success)]/5">
                            <div className="w-2 h-2 bg-[var(--color-success)] mr-2 shadow-[0_0_5px_var(--color-success)] animate-pulse"></div>
                            <span className="text-[10px] font-bold text-[var(--color-success)] tracking-wider uppercase">SYSTEM_ONLINE</span>
                        </div>

                        <div className="h-6 w-px bg-[var(--border-color)] hidden md:block"></div>

                        <div className="relative group">
                            <button className="relative p-2 text-[var(--color-text-secondary)] hover:text-white transition-colors border border-transparent hover:border-[var(--border-color)]">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[var(--color-danger)] shadow-[0_0_5px_var(--color-danger)] animate-pulse"></span>
                            </button>

                            {/* Dropdown */}
                            <div className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-md border border-[var(--border-color)] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="p-3 border-b border-[var(--border-color)]">
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">System_Notifications</h3>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {[
                                        { id: 1, text: "KYC Verification Required", time: "2m ago", type: "alert" },
                                        { id: 2, text: "Market Update: Gold +2.4%", time: "1h ago", type: "info" },
                                        { id: 3, text: "New Asset Listed: Quantum AI", time: "3h ago", type: "success" }
                                    ].map(notif => (
                                        <div key={notif.id} className="p-3 border-b border-[var(--border-color)]/50 hover:bg-[var(--color-primary)]/5 transition-colors cursor-pointer">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${notif.type === 'alert' ? 'text-[var(--color-danger)]' :
                                                        notif.type === 'success' ? 'text-[var(--color-success)]' : 'text-[var(--color-primary)]'
                                                    }`}>
                                                    [{notif.type}]
                                                </span>
                                                <span className="text-[10px] text-[var(--color-text-muted)] font-mono">{notif.time}</span>
                                            </div>
                                            <p className="text-xs text-[var(--color-text-secondary)] font-mono">{notif.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 text-center border-t border-[var(--border-color)]">
                                    <button className="text-[10px] text-[var(--color-primary)] hover:text-white uppercase tracking-widest font-bold">
                                        Mark_All_Read
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
                    {/* Grid Background Effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                            backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
