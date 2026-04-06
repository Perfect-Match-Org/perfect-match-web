import React, { useState, useCallback, useMemo } from "react";
import {
    LayoutDashboard,
    FileCode,
    MessageSquare,
    Mail,
    ChevronLeft,
    ChevronRight,
    LogOut,
    User,
    Bell,
    Search,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

type AdminSection = "dashboard" | "api-docs" | "reviews" | "email-marketing";

interface AdminLayoutProps {
    /** Page content rendered in the main area */
    children: React.ReactNode;
    /** Currently active section ID */
    activeSection: AdminSection;
    /** Callback fired when the user clicks a sidebar nav item */
    onSectionChange: (section: AdminSection) => void;
}

interface NavItem {
    id: AdminSection;
    name: string;
    icon: React.ElementType;
}

export default function AdminLayout({ children, activeSection, onSectionChange }: AdminLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { data: session } = useSession();

    const menuItems = useMemo<NavItem[]>(
        () => [
            { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
            { id: "api-docs", name: "API Docs", icon: FileCode },
            { id: "reviews", name: "Reviews", icon: MessageSquare },
            { id: "email-marketing", name: "Email Marketing", icon: Mail },
        ],
        []
    );

    const toggleSidebar = useCallback(() => {
        setIsSidebarCollapsed((prev) => !prev);
    }, []);

    const handleSignOut = useCallback(() => {
        signOut({ callbackUrl: "/" });
    }, []);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Accessibility: skip to main content */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-pink-600 focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
                Skip to main content
            </a>

            {/* ── Sidebar ── */}
            <aside
                className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out z-30 ${
                    isSidebarCollapsed ? "w-20" : "w-64"
                }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center px-5 border-b border-gray-100 shrink-0">
                    <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-pink-200">
                        <span className="text-white font-bold text-lg leading-none">P</span>
                    </div>
                    {!isSidebarCollapsed && (
                        <span className="ml-3 font-bold text-xl tracking-tight text-gray-900 whitespace-nowrap overflow-hidden">
                            Perfect<span className="text-pink-600">Match</span>
                        </span>
                    )}
                </div>

                {/* Nav items */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => onSectionChange(item.id)}
                                title={isSidebarCollapsed ? item.name : undefined}
                                className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                    isActive
                                        ? "bg-pink-50 text-pink-600 shadow-sm"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <Icon
                                    className={`w-5 h-5 shrink-0 transition-colors ${
                                        isActive ? "text-pink-600" : "text-gray-400 group-hover:text-gray-600"
                                    }`}
                                />
                                {!isSidebarCollapsed && (
                                    <span className="ml-3 font-semibold text-sm">{item.name}</span>
                                )}
                                {!isSidebarCollapsed && isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 bg-pink-600 rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Collapse toggle */}
                <div className="p-4 border-t border-gray-100 shrink-0">
                    <button
                        onClick={toggleSidebar}
                        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                    >
                        {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                </div>
            </aside>

            {/* ── Main area ── */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-20">
                    {/* Search */}
                    <div className="flex items-center flex-1 max-w-xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search everything…"
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* Right side: notifications + user */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl relative transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white" />
                        </button>

                        <div className="h-8 w-px bg-gray-200" />

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-gray-900 leading-tight">
                                    {session?.user?.name ?? "Admin User"}
                                </p>
                                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest leading-tight">
                                    Super Admin
                                </p>
                            </div>
                            <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                                {session?.user?.image ? (
                                    <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 text-pink-600" />
                                )}
                            </div>
                            <button
                                onClick={handleSignOut}
                                title="Sign out"
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Scrollable content */}
                <div id="main-content" className="flex-1 overflow-y-auto scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
}
