'use client';

import React from 'react';
import Image from 'next/image';

export default function LoadingTransition() {
  return (
    <div className="loading-transition">
      <div className="loading-content">
        <div className="loading-icon">
          <Image 
            src="/images/marketplace-icon.svg" 
            alt="Loading" 
            width={60} 
            height={60}
            className="rotating"
          />
        </div>
        <div className="loading-text">
          <h2>Preparing Your NFT</h2>
          <p>Setting up your code for NFT generation...</p>
        </div>
      </div>
    </div>
  );
} 