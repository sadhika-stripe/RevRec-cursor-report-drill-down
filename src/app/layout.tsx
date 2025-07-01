"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  Home,
  BarChart3,
  Users,
  CreditCard,
  Package,
  FileText,
  TrendingUp,
  MoreHorizontal,
  Settings,
  Plus,
  LayoutGrid,
  Wallet,
  Receipt,
  LineChart,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  List,
  Clock,
  Box,
  User,
  Layers,
  Folder,
  BookOpen,
  ArrowRightLeft,
  DollarSign,
  FileText as FileTextIcon,
} from 'lucide-react';
import { useState } from 'react';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Collapsible state for product sections
  const [openProducts, setOpenProducts] = useState<Record<string, boolean>>({
    Connect: false,
    Payments: false,
    Billing: false,
    Accounting: true,
    More: false,
  });
  const toggleProduct = (key: string) => setOpenProducts(s => ({ ...s, [key]: !s[key] }));

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans bg-white`}>
        <div className="flex min-h-screen">
          {/* Global Sidebar */}
          <aside className="w-72 bg-white border-r border-r-gray-200 flex flex-col py-6 px-4">
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 mb-6">
              <span className="w-9 h-9 flex items-center justify-center rounded-lg animate-gradient-move text-2xl">🦙</span>
              <span className="font-semibold text-base text-gray-900 leading-none">Drama Llama</span>
            </div>
            {/* Main Navigation */}
            <nav className="flex-1 flex flex-col text-[15px]">
              <SidebarLink icon={<Home className="w-5 h-5" />} label="Home" className="mb-1" />
              <SidebarLink icon={<List className="w-5 h-5" />} label="Balances" className="mb-1" />
              <SidebarLink icon={<ArrowRightLeft className="w-5 h-5" />} label="Transactions" className="mb-1" />
              <SidebarLink icon={<User className="w-5 h-5" />} label="Directory" className="mb-1" />
              <SidebarLink icon={<Box className="w-5 h-5" />} label="Product catalog" className="mb-1" />
              {/* Shortcuts */}
              <div className="mt-6 mb-1 text-xs text-gray-500 font-semibold px-2 tracking-wide">Shortcuts</div>
              <SidebarLink icon={<Layers className="w-5 h-5" />} label="Fraud tools" className="mb-1" />
              <SidebarLink icon={<Clock className="w-5 h-5" />} label="Terminal" className="mb-1" />
              {/* Products */}
              <div className="mt-6 mb-1 text-xs text-gray-500 font-semibold px-2 tracking-wide">Products</div>
              {/* Connect */}
              <SidebarProduct
                icon={<Wallet className="w-5 h-5" />} label="Connect"
                open={openProducts.Connect}
                onClick={() => toggleProduct('Connect')}
                children={null}
                className="mb-1"
              />
              {/* Payments */}
              <SidebarProduct
                icon={<CreditCard className="w-5 h-5" />} label="Payments"
                open={openProducts.Payments}
                onClick={() => toggleProduct('Payments')}
                children={null}
                className="mb-1"
              />
              {/* Billing */}
              <SidebarProduct
                icon={<Receipt className="w-5 h-5" />} label="Billing"
                open={openProducts.Billing}
                onClick={() => toggleProduct('Billing')}
                children={null}
                className="mb-1"
              />
              {/* Accounting */}
              <SidebarProduct
                icon={<LineChart className="w-5 h-5" />} label="Accounting"
                open={openProducts.Accounting}
                onClick={() => toggleProduct('Accounting')}
                children={
                  <div className="ml-7 flex flex-col gap-1 mt-1">
                    <SidebarSubLink label="Overview" />
                    <SidebarSubLink label="Summary entries" />
                    <SidebarSubLink label="Statements" active />
                    <SidebarSubLink label="Chart of accounts" />
                    <SidebarSubLink label="Customizations" />
                  </div>
                }
                className="mb-1"
              />
              {/* More */}
              <SidebarProduct
                icon={<Ellipsis className="w-5 h-5" />} label="More"
                open={openProducts.More}
                onClick={() => toggleProduct('More')}
                children={null}
              />
            </nav>
          </aside>
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Top Bar */}
            <header className="flex items-center justify-end h-14 bg-white px-4 mt-4">
              <div className="flex items-center gap-6">
                <span className="text-sm text-gray-700 font-medium">Developers</span>
                <span className="text-sm text-gray-700 font-medium">Sandboxes</span>
                <button className="p-2 rounded-full hover:bg-gray-100"><Settings className="w-5 h-5 text-gray-500" /></button>
                <button className="p-2 rounded-full hover:bg-gray-100"><Plus className="w-5 h-5 text-gray-500" /></button>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">S</div>
              </div>
            </header>
            {/* Page Content */}
            <main className="flex-1 p-0 pt-4 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

function SidebarLink({ icon, label, active, className }: { icon: React.ReactNode; label: string; active?: boolean; className?: string }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${active ? 'text-[#635bff] font-bold bg-[#f5f8ff]' : 'text-gray-700 hover:bg-gray-50'} ${className ?? ''}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function SidebarProduct({ icon, label, open, onClick, children, className }: { icon: React.ReactNode; label: string; open: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <button
        className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-gray-700 hover:bg-gray-50"
        onClick={onClick}
        type="button"
      >
        {icon}
        <span>{label}</span>
        <span className="ml-auto">{open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
      </button>
      {open && children}
    </div>
  );
}

function SidebarSubLink({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`w-full text-left px-3 py-1.5 rounded-md transition-colors ${active ? 'text-[#635bff] font-bold bg-[#f5f8ff]' : 'text-gray-700 hover:bg-gray-50'}`}
    >
      {label}
    </button>
  );
}
