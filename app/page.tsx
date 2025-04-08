'use client';

import { useState } from 'react';
import Image from "next/image";
import LoginModal from './components/LoginModal';
import Link from 'next/link';

interface FeatureDetail {
  title: string;
  shortDescription: string;
  fullDescription: string;
}

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const features = [
    {
      title: "AI-Powered Matching",
      shortDescription: "Find the perfect code with our AI matching system.",
      fullDescription: "It analyzes your needs and connects you to the best solutions, saving time and ensuring quality.",
      icon: (
        <Image
          src="/images/ai-icon.svg"
          alt="AI Icon"
          width={80}
          height={80}
          className="icon"
        />
      )
    },
    {
      title: "Crypto Payments",
      shortDescription: "Securely process transactions using blockchain technology.",
      fullDescription: "Enable fast, borderless payments with multiple cryptocurrency options. Implement smart contracts for automated and trustless transactions.",
      icon: (
        <Image
          src="/images/crypto-icon.svg"
          alt="Crypto Icon"
          width={80}
          height={80}
          className="icon"
        />
      )
    },
    {
      title: "Trustless Trading",
      shortDescription: "Trade with confidence in our secure, decentralized marketplace.",
      fullDescription: "Smart contracts ensure fair transactions while our escrow system protects both buyers and sellers. Experience truly trustless trading.",
      icon: (
        <Image
          src="/images/trading-icon.svg"
          alt="Trading Icon"
          width={80}
          height={80}
          className="icon"
        />
      )
    },
    {
      title: "Global Marketplace",
      shortDescription: "Connect with developers worldwide in our thriving marketplace.",
      fullDescription: "Access a diverse range of code solutions, collaborate on projects, and expand your reach in the global developer community.",
      icon: (
        <Image
          src="/images/globe-icon.svg"
          alt="Globe Icon"
          width={80}
          height={80}
          className="icon"
        />
      )
    }
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlock the <span style={{ color: '#2563eb' }}>Future</span> of Code Trading
          </h1>
          <h2 className="hero-subtitle">
            — AI-Powered, Crypto-Secured
          </h2>
          <p className="hero-description">
            Trade Smarter, Build Faster<br />
            Where Developers Thrive in a<br />
            Trustless Global Marketplace
          </p>
        </div>
        <div className="button-group">
          <button className="button button-primary" onClick={() => setIsLoginModalOpen(true)}>
            <span>Get Started</span>
            <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link href="/market" className="button button-secondary">
            <span>Explore the Marketplace</span>
          </Link>
        </div>
      </section>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-card ${selectedCardIndex === index ? 'expanded' : ''}`}
            onClick={() => setSelectedCardIndex(selectedCardIndex === index ? null : index)}
          >
            <h3 className="feature-title">{feature.title}</h3>
            <div className="feature-icon">
              {feature.icon}
            </div>
            <p className="feature-description">
              {selectedCardIndex === index ? feature.fullDescription : feature.shortDescription}
            </p>
            {selectedCardIndex === index && (
              <button 
                className="feature-detail-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCardIndex(null);
                }}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </main>
  );
}
