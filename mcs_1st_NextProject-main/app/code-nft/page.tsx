'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/code-nft.module.css';

interface NFTData {
  code: string;
  auditResult: any;
}

export default function CodeNFTPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [nftData, setNftData] = useState<NFTData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nftName, setNftName] = useState('Eliza Plugin');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [walletAddress, setWalletAddress] = useState('0xdf23edfef');
  const [tempAddress, setTempAddress] = useState('');
  const [releaseDate, setReleaseDate] = useState('2025.04.07');
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fetchNFTData = async () => {
      if (!sessionId) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/code-nft?sessionId=${sessionId}`);
        const data = await response.json();

        if (data.success) {
          setNftData(data.nftData);
        }
      } catch (error) {
        console.error('Error fetching NFT data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTData();
  }, [sessionId]);

  useEffect(() => {
    // 현재 날짜를 YYYY.MM.DD 형식으로 변환
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setReleaseDate(`${year}.${month}.${day}`);
  }, []);

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const handleMint = () => {
    if (!isWalletConnected) return;
    
    setIsFadingOut(true);
    
    setTimeout(() => {
      setIsMinting(true);
      
      setTimeout(() => {
        setIsMinted(true);
        setIsMinting(false);
        setIsFadingOut(false);
      }, 1200);
    }, 400);
  };

  const handleFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handleAddressChange = () => {
    setIsEditingAddress(true);
    setTempAddress(walletAddress);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempAddress.trim()) {
      setWalletAddress(tempAddress.trim());
      setIsEditingAddress(false);
    }
  };

  const handleAddressCancel = () => {
    setIsEditingAddress(false);
    setTempAddress('');
  };

  const handleNameChange = () => {
    if (!isMinted) {
      setIsEditingName(true);
      setTempName(nftName);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setNftName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const handleNameCancel = () => {
    setIsEditingName(false);
    setTempName('');
  };

  if (isLoading) {
    return <div className={styles.loadingState}>Loading NFT data...</div>;
  }

  return (
    <div className={styles.nftPage}>
      <div className={styles.nftContainer}>
        <div className={`${styles.header} ${isMinted ? styles.headerMinted : ''}`}>
          <p className={styles.headerSubtitle}>Modular Code Marketplace</p>
          <h1 className={styles.headerTitle}>
            <Image
              src="/images/marketplace-icon.svg"
              alt="Logo"
              width={32}
              height={32}
              className={styles.headerLogo}
            />
            Code NFT Mint
            <div className={styles.headerUnderline} />
          </h1>
          {isMinted ? (
            <p className={styles.headerDescription}>Congratulations! Your NFT Mint is successfully completed!</p>
          ) : (
            <p className={styles.headerDescription}>Name your NFT and verify to Mint!</p>
          )}
        </div>

        <div className={`${styles.cardsContainer} ${isMinted ? styles.cardsMinted : ''}`}>
          <div className={`${styles.cardWrapper} ${isMinted ? styles.cardMinted : ''} ${isFadingOut ? styles.cardFadingOut : ''}`}>
            <div className={`${styles.nftCard} ${isCardFlipped ? styles.flipped : ''}`}>
              <div className={styles.cardFront}>
                <Image
                  src="/images/star.svg"
                  alt="Star"
                  width={24}
                  height={24}
                  className={`${styles.starIcon} ${isMinted ? styles.starIconMinted : ''}`}
                  style={{
                    filter: isMinted ? 'brightness(0) saturate(100%) invert(43%) sepia(93%) saturate(1752%) hue-rotate(210deg) brightness(101%) contrast(101%)' : 'none'
                  }}
                />
                <div className={styles.nftTag}>NFT</div>
                {isMinted ? (
                  <div className={styles.nftInfo} style={{ '--display-line': 'none' } as React.CSSProperties}>
                    <div className={styles.nftTitle}>
                      Eliza Plugin
                    </div>
                    <div className={`${styles.nftSubtitle} ${styles.mintedSubtitle}`}>
                      by "0xdf23edfef"
                    </div>
                    <div className={`${styles.nftCreator} ${styles.mintedCreator}`}>
                      Mint Tx Hash
                    </div>
                    <div className={styles.resultReport}>
                      <div className={styles.resultRow}>
                        <span className={styles.resultLabel}>Security Status</span>
                        <a href="https://example.com" className={styles.resultValue}>https:/// example.com</a>
                      </div>
                      <div className={styles.resultRow}>
                        <span className={styles.resultLabel}>Scan Log.</span>
                        <a href="https://example.com" className={styles.resultValue}>https:/// example.com</a>
                      </div>
                    </div>
                    <div className={styles.dateBox}>
                      <div className={styles.dateLabel}>Date of Release</div>
                      <div className={styles.dateValue}>2025.04.12</div>
                    </div>
                  </div>
                ) : (
                  <>
                    {isEditingName ? (
                      <form onSubmit={handleNameSubmit} className={styles.nameForm}>
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className={styles.nameInput}
                          placeholder="Enter NFT name"
                          autoFocus
                        />
                        <div className={styles.nameActions}>
                          <button type="submit" className={styles.nameSubmit}>Save</button>
                          <button type="button" onClick={handleNameCancel} className={styles.nameCancel}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <h2 
                        className={`${styles.nftTitle} ${!isMinted ? styles.editable : ''}`} 
                        onClick={handleNameChange}
                      >
                        {nftName}
                        <span className={styles.nftTitleUnderline}></span>
                      </h2>
                    )}
                    <p className={styles.nftSubtitle}>
                      give your NFT a name!
                    </p>
                    <div className={styles.nftInfo}>
                      <div className={styles.nftCreator}>Creator: DEV1</div>
                      <div className={styles.dateBox}>
                        <div className={styles.dateLabel}>Date of Release</div>
                        <div className={styles.dateValue}>{releaseDate}</div>
                      </div>
                    </div>
                    <button className={styles.openCodesButton} onClick={handleFlip}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      open my codes
                    </button>
                  </>
                )}
              </div>

              <div className={styles.cardBack}>
                <button className={styles.closeButton} onClick={handleFlip}>×</button>
                <h3 className={styles.backTitle}>Verified Code</h3>
                <div className={styles.codeContent}>
                  <pre>
                    {nftData?.code || `// Example Verified Code
function elizaPlugin() {
  // AI 기반 대화형 인터페이스
  class ElizaBot {
    constructor() {
      this.memory = new Map();
      this.patterns = [
        /* 검증된 패턴 매칭 로직 */
      ];
    }

    async processInput(input) {
      // 사용자 입력 처리
      const response = await this.analyze(input);
      return this.formatResponse(response);
    }

    analyze(input) {
      // 고급 자연어 처리
      return this.patterns.find(
        pattern => pattern.match(input)
      );
    }
  }

  return new ElizaBot();
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {!isMinted && (
            <div className={`${styles.mintingSection} ${isMinting || isMinted ? styles.minting : ''} ${isFadingOut ? styles.mintingFadingOut : ''}`}>
              <div className={`${styles.mintPrompt} ${isWalletConnected ? styles.hidden : ''}`}>
                <div className={styles.mintArrow}>
                  <Image src="/images/arrow-curve.svg" alt="Arrow" width={48} height={48} />
                </div>
                <p className={styles.mintReadyText}>ready to mint?</p>
              </div>

              <div className={styles.mintBox}>
                {isWalletConnected && (
                  <div className={styles.walletAddressBox}>
                    <h3>Web3 Wallet Address</h3>
                    <Image src="/images/wallet.svg" alt="Wallet" width={20} height={20} />
                    {isEditingAddress ? (
                      <form onSubmit={handleAddressSubmit} className={styles.addressForm}>
                        <input
                          type="text"
                          value={tempAddress}
                          onChange={(e) => setTempAddress(e.target.value)}
                          className={styles.addressInput}
                          placeholder="Enter wallet address"
                        />
                        <div className={styles.addressActions}>
                          <button type="submit" className={styles.addressSubmit}>Save</button>
                          <button type="button" onClick={handleAddressCancel} className={styles.addressCancel}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <p className={styles.walletAddress}>{walletAddress}</p>
                        <div className={styles.changeWalletText} onClick={handleAddressChange}>
                          Change wallet address
                        </div>
                      </>
                    )}
                  </div>
                )}

                <p className={styles.walletMessage}>
                  "Make sure to connect your<br />
                  <strong>Web3 Wallet</strong> to continue!"
                </p>
                
                {isWalletConnected ? (
                  <button className={`${styles.connectWalletButton} ${styles.connected}`}>
                    <Image src="/images/checkbox.svg" alt="Connected" width={20} height={20} />
                    Wallet Connected
                  </button>
                ) : (
                  <button onClick={handleConnectWallet} className={styles.connectWalletButton}>
                    CONNECT WALLET
                    <Image src="/images/wallet.svg" alt="Wallet" width={20} height={20} />
                  </button>
                )}

                <button
                  className={`${styles.mintButton} ${isWalletConnected ? styles.mintButtonEnabled : styles.mintButtonDisabled}`}
                  onClick={handleMint}
                  disabled={!isWalletConnected}
                >
                  <Image 
                    src="/images/rocket.svg" 
                    alt="Rocket" 
                    width={20} 
                    height={20} 
                    className={styles.rocketIcon}
                  />
                  <span>Mint</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 