'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/mypage.module.css';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [activeMenu, setActiveMenu] = useState('profile');
  
  const cardBackgrounds = [
    '/images/market-card-background.png',
    '/images/my-page-background.png'
  ];
  
  const getRandomBackground = () => {
    return cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)];
  };
  
  const modules = [
    {
      id: 1,
      name: 'Eliza Plugin',
      date: '2025.03.12',
      tags: ['AI', 'Chat']
    },
    {
      id: 2,
      name: 'Chain Sync',
      date: '2025.03.14',
      tags: ['Sync', 'Data']
    },
    {
      id: 3,
      name: 'Wallet Shield',
      date: '2025.03.18',
      tags: ['Sec', 'Tx']
    },
    {
      id: 4,
      name: 'Token Forge',
      date: '2025.03.14', 
      tags: ['Token']
    },
    {
      id: 5,
      name: 'Vote Chain',
      date: '2025.03.11',
      tags: ['AI']
    },
    {
      id: 6,
      name: 'Stake Master',
      date: '2025.03.18',
      tags: ['Stake']
    },
    {
      id: 7,
      name: 'Zk Prover',
      date: '2025.03.18',
      tags: ['ZKP']
    },
    {
      id: 8,
      name: 'Trade bit',
      date: '2025.03.18',
      tags: ['Trade']
    },
    {
      id: 9,
      name: 'Vote Chain',
      date: '2025.03.11',
      tags: ['AI']
    },
    {
      id: 10,
      name: 'Stake Master',
      date: '2025.03.18',
      tags: ['Stake']
    }
  ];

  const moduleBackgrounds = [
    'linear-gradient(135deg, rgba(224, 242, 254, 0.5) 0%, rgba(186, 230, 253, 0.75) 100%)',  // 하늘색 그라데이션
    'linear-gradient(135deg, rgba(220, 252, 231, 0.5) 0%, rgba(134, 239, 172, 0.75) 100%)',  // 민트 그라데이션
    'linear-gradient(135deg, rgba(254, 243, 199, 0.5) 0%, rgba(252, 211, 77, 0.75) 100%)',   // 노란색 그라데이션
    'linear-gradient(135deg, rgba(255, 237, 213, 0.5) 0%, rgba(253, 186, 116, 0.75) 100%)',  // 오렌지 그라데이션
    'linear-gradient(135deg, rgba(237, 233, 254, 0.5) 0%, rgba(196, 181, 253, 0.75) 100%)',  // 보라색 그라데이션
    'linear-gradient(135deg, rgba(254, 226, 226, 0.5) 0%, rgba(252, 165, 165, 0.75) 100%)',  // 핑크 그라데이션
    'linear-gradient(135deg, rgba(219, 234, 254, 0.5) 0%, rgba(147, 197, 253, 0.75) 100%)',  // 파란색 그라데이션
    'linear-gradient(135deg, rgba(243, 244, 246, 0.5) 0%, rgba(209, 213, 219, 0.75) 100%)',  // 회색 그라데이션
  ];

  const ProfileContent = () => (
    <div className={styles.contentSection}>
      <h2 className={styles.sectionTitle}>내 프로필</h2>
      <div className={styles.profileSection}>
        <div className={styles.profileHeader}>
          <div className={styles.profileAvatar}>👤</div>
          <h3 className={styles.profileName}>개발자 김코딩</h3>
          <p className={styles.profileEmail}>dev.kimcoding@example.com</p>
        </div>
        <div className={styles.profileStats}>
          <div className={styles.statBox}>
            <span className={styles.statValue}>24</span>
            <span className={styles.statLabel}>총 모듈 수</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>15</span>
            <span className={styles.statLabel}>검증된 모듈</span>
          </div>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>가입일</span>
            <span className={styles.infoValue}>2023년 11월 15일</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>최근 활동</span>
            <span className={styles.infoValue}>2025년 3월 18일</span>
          </div>
        </div>
      </div>
    </div>
  );

  const SocialContent = () => (
    <div className={styles.contentSection}>
      <h2 className={styles.sectionTitle}>소셜 연결</h2>
      <div className={styles.socialSection}>
        <div className={styles.connectedAccount}>
          <div className={styles.accountIcon}>
            <span className={styles.accountEmoji}>🐙</span>
          </div>
          <div className={styles.accountInfo}>
            <h3 className={styles.accountName}>GitHub</h3>
            <p className={styles.accountHandle}>@kimcoding</p>
          </div>
          <button className={styles.disconnectButton}>연결 해제</button>
        </div>
        <div className={styles.connectedAccount}>
          <div className={styles.accountIcon}>
            <span className={styles.accountEmoji}>🐦</span>
          </div>
          <div className={styles.accountInfo}>
            <h3 className={styles.accountName}>Twitter</h3>
            <p className={styles.accountHandle}>@kimcoding_dev</p>
          </div>
          <button className={styles.disconnectButton}>연결 해제</button>
        </div>
        <div className={styles.connectAccount}>
          <div className={styles.accountIcon}>
            <span className={styles.accountEmoji}>📱</span>
          </div>
          <div className={styles.accountInfo}>
            <h3 className={styles.accountName}>Discord</h3>
            <p className={styles.accountPrompt}>계정을 연결하여 커뮤니티에 참여하세요</p>
          </div>
          <button className={styles.connectButton}>연결하기</button>
        </div>
      </div>
    </div>
  );

  const WalletContent = () => (
    <div className={styles.contentSection}>
      <h2 className={styles.sectionTitle}>지갑 관리</h2>
      <div className={styles.walletSection}>
        <div className={styles.connectedWallet}>
          <div className={styles.walletHeader}>
            <h3 className={styles.walletTitle}>연결된 지갑</h3>
            <span className={styles.walletStatus}>활성</span>
          </div>
          <div className={styles.walletAddress}>
            <span className={styles.addressLabel}>주소</span>
            <span className={styles.addressValue}>0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
            <button className={styles.copyButton}>복사</button>
          </div>
          <div className={styles.walletBalance}>
            <div className={styles.balanceItem}>
              <span className={styles.tokenName}>ETH</span>
              <span className={styles.tokenValue}>2.457</span>
            </div>
            <div className={styles.balanceItem}>
              <span className={styles.tokenName}>USDC</span>
              <span className={styles.tokenValue}>1,250.00</span>
            </div>
          </div>
          <div className={styles.walletActions}>
            <button className={styles.walletButton}>연결 해제</button>
            <button className={styles.walletButton}>거래 내역</button>
          </div>
        </div>
        <div className={styles.walletSettings}>
          <h3 className={styles.walletSettingsTitle}>설정</h3>
          <div className={styles.settingItem}>
            <span className={styles.settingLabel}>자동 연결</span>
            <label className={styles.toggleSwitch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <span className={styles.settingLabel}>거래 알림</span>
            <label className={styles.toggleSwitch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const ModulesContent = () => (
    <section className={styles.modulesSection}>
      <h2 className={styles.sectionTitle}>Verified Modules</h2>
      
      <div className={styles.moduleGrid}>
        {modules.map((module, index) => (
          <div 
            key={module.id} 
            className={styles.moduleCard}
            style={{ 
              backgroundImage: `url(${getRandomBackground()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <h3 className={styles.moduleName}>{module.name}</h3>
            <div className={styles.moduleDate}>
              <div className={styles.verificationLabel}>verification date</div>
              <div className={styles.verificationDate}>{module.date}</div>
            </div>
            <div className={styles.moduleTags}>
              {module.tags.map((tag, index) => (
                <span key={index} className={styles.moduleTag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderContent = () => {
    switch(activeMenu) {
      case 'profile':
        return <ProfileContent />;
      case 'social':
        return <SocialContent />;
      case 'wallet':
        return <WalletContent />;
      case 'modules':
      default:
        return <ModulesContent />;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <div className={styles.pageTitle}>
          <Image src="/images/ai-audit-icon.svg" alt="Logo" width={32} height={32} className={styles.pageLogo} style={{ color: '#3b82f6', filter: 'invert(43%) sepia(58%) saturate(2406%) hue-rotate(202deg) brightness(101%) contrast(96%)' }} />
          <div className={styles.titleWrapper}>
            <h1>My Page</h1>
            <div className={styles.titleUnderline}>
              <Image src="/images/mypage-underline.svg" alt="Underline" width={229} height={27} />
            </div>
          </div>
        </div>
      </header>
      
      <div className={styles.pageContent}>
        <div className={styles.sidebar}>
          <nav className={styles.sideNav}>
            <button 
              className={`${styles.navItem} ${activeMenu === 'profile' ? styles.active : ''}`}
              onClick={() => {
                setActiveMenu('profile');
                setActiveTab('profile');
              }}
            >
              <span className={styles.navIcon}>👤</span>
              My Profile
            </button>
            <button 
              className={`${styles.navItem} ${activeMenu === 'social' ? styles.active : ''}`}
              onClick={() => {
                setActiveMenu('social');
                setActiveTab('social');
              }}
            >
              <span className={styles.navIcon}>🔗</span>
              Social Connect
            </button>
            <button 
              className={`${styles.navItem} ${activeMenu === 'wallet' ? styles.active : ''}`}
              onClick={() => {
                setActiveMenu('wallet');
                setActiveTab('wallet');
              }}
            >
              <span className={styles.navIcon}>💼</span>
              Wallet
            </button>
            <button 
              className={`${styles.navItem} ${activeMenu === 'modules' ? styles.active : ''}`}
              onClick={() => {
                setActiveMenu('modules');
                setActiveTab('modules');
              }}
            >
              <span className={styles.navIcon}>📦</span>
              My Modules
            </button>
          </nav>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.contentHeader}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'profile' ? styles.activeTab : ''}`}
                onClick={() => {
                  setActiveTab('profile');
                  setActiveMenu('profile');
                }}
              >
                My Profile
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'social' ? styles.activeTab : ''}`}
                onClick={() => {
                  setActiveTab('social');
                  setActiveMenu('social');
                }}
              >
                Social Connect
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'wallet' ? styles.activeTab : ''}`}
                onClick={() => {
                  setActiveTab('wallet');
                  setActiveMenu('wallet');
                }}
              >
                Wallet
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'modules' ? styles.activeTab : ''}`}
                onClick={() => {
                  setActiveTab('modules');
                  setActiveMenu('modules');
                }}
              >
                My Modules
              </button>
            </div>
            <button className={styles.moreButton}>+ more</button>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
