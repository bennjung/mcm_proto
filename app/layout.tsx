'use client';

import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import MarketIcon from "../public/images/market-icon.svg";
import MyPageIcon from "../public/images/mypage-icon.svg";
import AiAuditIcon from "../public/images/ai-icon.svg";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import './styles/ai-audit.css';
import './styles/code-nft.module.css';
import './styles/loading-transition.css';
import type { Metadata } from "next";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 랜딩 페이지일 때는 사이드바를 펼치고, 그 외에는 접기
    setIsSidebarCollapsed(pathname !== '/');
  }, [pathname]);

  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="layout-container">
          <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
              <Link href="/" className="logo-link">
                <Image
                  src="/images/mcs-logo.svg"
                  alt="MCS"
                  width={48}
                  height={20}
                  className="dark:invert"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>
            </div>
            <nav className="sidebar-nav">
              <Link href="/market" className={`nav-item ${pathname === '/market' ? 'active' : ''}`}>
                <MarketIcon className="icon" width={24} height={24} />
                <span className="text">market</span>
              </Link>
              <Link href="/ai-audit" className={`nav-item ${pathname === '/ai-audit' ? 'active' : ''}`}>
                <AiAuditIcon className="icon" width={24} height={24} />
                <span className="text">ai-audit</span>
              </Link>
              <Link href="/mypage" className={`nav-item ${pathname === '/mypage' ? 'active' : ''}`}>
                <MyPageIcon className="icon" width={24} height={24} />
                <span className="text">my page</span>
              </Link>
              <Link href="/report" className={`nav-item report-error ${pathname === '/report' ? 'active' : ''}`}>
                <svg className="icon" viewBox="0 0 32 32" width="24" height="24" fill="currentColor">
                  <path d="M29.3,2.6c-0.3-0.2-0.7-0.3-1-0.2L3,11.7c-0.4,0.1-0.7,0.5-0.7,0.9c0,0.4,0.3,0.8,0.7,0.9l10.2,3.8l10-10c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-9.8,9.8l6.6,10.6c0.2,0.3,0.5,0.5,0.8,0.5c0.1,0,0.1,0,0.2,0c0.4-0.1,0.7-0.4,0.8-0.7l6.2-25.2C29.7,3.3,29.6,2.9,29.3,2.6z"/>
                </svg>
                <span className="text">report</span>
              </Link>
            </nav>
            <button 
              className="sidebar-toggle"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              {isSidebarCollapsed ? '>>' : '<<'}
            </button>
          </aside>
          <main className={`main-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
