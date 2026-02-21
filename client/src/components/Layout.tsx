import React, { ReactNode } from 'react';
import { LayoutDashboard, Truck, Users, Settings, LogOut, Navigation } from 'lucide-react';
import './Layout.css';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="layout-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar glass-panel">
                <div className="sidebar-brand">
                    <Navigation className="brand-icon" size={28} />
                    <h2>FleetFlow</h2>
                </div>

                <nav className="sidebar-nav">
                    <a href="#" className="nav-item active">
                        <LayoutDashboard size={20} />
                        <span>Command Center</span>
                    </a>
                    <a href="#" className="nav-item">
                        <Truck size={20} />
                        <span>Vehicles</span>
                    </a>
                    <a href="#" className="nav-item">
                        <Users size={20} />
                        <span>Drivers</span>
                    </a>
                    <a href="#" className="nav-item">
                        <Settings size={20} />
                        <span>Settings</span>
                    </a>
                </nav>

                <div className="sidebar-footer">
                    <button className="nav-item logout-btn">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <header className="top-header">
                    <div className="header-info">
                        <span className="user-role-badge">MANAGER</span>
                        <span className="user-email">admin@fleetflow.com</span>
                    </div>
                </header>

                <div className="content-area animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
