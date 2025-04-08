"use client";

import '../styles/ai-audit.css';
import '../styles/loading-transition.css';
import React, { useRef, useEffect, useState } from 'react';
import { analyzeContract, type AnalysisResult, type CheckResult, statusColors } from '../services/ai-audit/ai-auditApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingTransition from '../components/LoadingTransition';

interface Message {
  type: 'user' | 'assistant' | 'system';
  content: string;
  isRemoving?: boolean;
  isVisible?: boolean;
  analysisResult?: AnalysisResult;
  openChecks?: Record<string, boolean>;
}

interface CheckboardProps {
  check: CheckResult;
  isOpen: boolean;
  onToggle: () => void;
}

const Checkboard = ({ check, isOpen, onToggle }: CheckboardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const content = contentRef.current;
      
      // ResizeObserver를 사용하여 컨텐츠 크기 변화 감지
      const resizeObserver = new ResizeObserver(() => {
        const contentRect = content.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // 컨텐츠가 화면 밖으로 벗어났는지 확인
        if (contentRect.bottom > viewportHeight) {
          content.scrollIntoView({ 
            behavior: 'smooth',
            block: 'nearest' // 가장 가까운 위치로 스크롤
          });
        }
      });

      // 컨텐츠 관찰 시작
      resizeObserver.observe(content);

      // cleanup
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isOpen]);

  return (
    <div className="checkboard">
      <div className="checkboard-header" onClick={onToggle}>
        <div 
          className="status-indicator"
          style={{ background: statusColors[check.status] }}
        />
        <span className="checkboard-title">{check.title}</span>
        <Image
          src="/images/chevron-down.svg"
          alt="Toggle"
          width={16}
          height={16}
          className={`toggle-icon ${isOpen ? 'open' : ''}`}
        />
      </div>
      <div 
        ref={contentRef}
        className={`checkboard-content ${isOpen ? 'open' : ''}`}
      >
        {check.code ? (
          <pre className="code-preview">
            {check.code}
          </pre>
        ) : (
          check.details
        )}
      </div>
    </div>
  );
};

export default function AiAuditPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'system',
      content: `Welcome to AI-Audit! Here are some guidelines:

1. Paste your smart contract code in the input box below
2. Make sure your code is complete and properly formatted
3. We support Solidity version 0.8.0 and above
4. The analysis will check for common vulnerabilities and best practices`,
      isVisible: false,
      openChecks: {}
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [lastAnalyzedCode, setLastAnalyzedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // 초기 시스템 메시지 페이드인
    setTimeout(() => {
      setMessages(prev => prev.map(msg => ({ ...msg, isVisible: true })));
      setShouldScroll(true);
    }, 50);
  }, []);

  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
      setShouldScroll(false);
    }
  }, [messages, shouldScroll]);

  // 키보드 이벤트 핸들러 추가
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // '/' 키를 눌렀을 때 입력창에 포커스
      if (e.key === '/' && !isLoading) {
        e.preventDefault(); // 기본 동작 방지
        textareaRef.current?.focus();
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('keydown', handleKeyPress);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isLoading]);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const newValue = textarea.value;
    setInputValue(newValue);
    
    // 자동 높이 조절
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleCheck = (messageIndex: number, checkId: string) => {
    setMessages(prev => prev.map((msg, idx) => {
      if (idx === messageIndex) {
        return {
          ...msg,
          openChecks: {
            ...msg.openChecks,
            [checkId]: !msg.openChecks?.[checkId]
          }
        };
      }
      return msg;
    }));
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;
    setIsLoading(true);
    setLastAnalyzedCode(inputValue.trim());  // 분석된 코드 저장
    setShouldScroll(true);

    // 시스템 메시지가 있는 경우 제거
    if (messages.length === 1 && messages[0].type === 'system') {
      setMessages(prev => prev.map(msg => 
        msg.type === 'system' ? { ...msg, isRemoving: true } : msg
      ));
      await new Promise(resolve => setTimeout(resolve, 300));
      setMessages([]);
    }

    // 사용자 메시지 추가
    const userMessage: Message = { 
      type: 'user', 
      content: inputValue.trim(), 
      isVisible: false,
      openChecks: {}
    };
    setMessages(prev => [...prev, userMessage]);
    
    // 사용자 메시지 애니메이션
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg === userMessage ? { ...msg, isVisible: true } : msg
      ));
    }, 50);

    resetTextarea();

    try {
      // 로딩 메시지 추가
      const loadingMessage: Message = { 
        type: 'assistant', 
        content: "Analyzing in process", 
        isVisible: false,
        openChecks: {}
      };
      setMessages(prev => [...prev, loadingMessage]);
      
      // 로딩 메시지 애니메이션
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg === loadingMessage ? { ...msg, isVisible: true } : msg
        ));
      }, 50);

      // 로딩 애니메이션
      let dots = 0;
      const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.type === 'assistant') {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: `Analyzing in process${'.'.repeat(dots)}` }
            ];
          }
          return prev;
        });
      }, 500);

      // 분석 결과를 기다림
      await new Promise(resolve => setTimeout(resolve, 3000)); // 로딩 시간 증가
      const result = await analyzeContract(inputValue.trim());

      // 로딩 애니메이션 중지
      clearInterval(loadingInterval);

      // 로딩 메시지를 분석 결과로 교체
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.type === 'assistant') {
          return [
            ...prev.slice(0, -1),
            { 
              ...lastMessage, 
              content: result.message, 
              isVisible: true, 
              analysisResult: result,
              openChecks: {}
            }
          ];
        }
        return prev;
      });

    } catch (error) {
      console.error('Error:', error);
      // 에러 메시지로 교체
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.type === 'assistant') {
          return [
            ...prev.slice(0, -1),
            { 
              type: 'assistant',
              content: "Sorry, an error occurred while processing your request.",
              isVisible: true 
            }
          ];
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetTextarea = () => {
    setInputValue('');  // React 상태 초기화
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleExportNFT = async () => {
    setIsExporting(true);
    
    try {
      const response = await fetch('/api/code-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: lastAnalyzedCode,
          auditResult: messages[messages.length - 1].analysisResult,
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        console.log('Navigating to:', `/code-nft?sessionId=${data.sessionId}`);
        // 로딩 페이지를 유지한 채로 페이지 이동
        window.location.href = `/code-nft?sessionId=${data.sessionId}`;
      } else {
        console.error('API Error:', data.error);
        alert('NFT 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
        setIsExporting(false); // 에러 시에만 로딩 상태 해제
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('서버 통신 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsExporting(false); // 에러 시에만 로딩 상태 해제
    }
  };

  const renderMessage = (message: Message, index: number) => {
    // NFT 버튼 활성화 조건 체크
    const isExportEnabled = message.type === 'assistant' && 
      message.analysisResult?.type === 'complete' &&
      message.analysisResult.checks &&
      Object.values(message.analysisResult.checks).every(check => check.status === 'success');

    return (
      <div key={index} className={`message ${message.type} ${message.isRemoving ? 'removing' : ''} ${message.isVisible ? 'visible' : ''}`}>
        {message.type === 'assistant' && (
          <div className="assistant-avatar">
            <img src="/images/ai-audit-icon.svg" alt="Assistant" />
          </div>
        )}
        <div className="message-content">
          {message.type === 'system' ? (
            <div className="code-block">
              <pre><code>{message.content}</code></pre>
            </div>
          ) : (
            <>
              {message.content}
              {message.type === 'assistant' && message.analysisResult?.type === 'complete' && (
                <div className="analysis-results">
                  {Object.entries(message.analysisResult.checks || {}).map(([key, check]) => (
                    <Checkboard
                      key={key}
                      check={check}
                      isOpen={message.openChecks?.[key] || false}
                      onToggle={() => toggleCheck(index, key)}
                    />
                  ))}
                  <div className="export-button-container">
                    <button 
                      className="export-button"
                      disabled={!isExportEnabled}
                      onClick={handleExportNFT}
                    >
                      Export as NFT
                      <Image src="/images/send-icon.svg" alt="Export" width={16} height={16} />
                    </button>
                    <span className="export-hint">looks like you are good to go :)</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {isExporting && <LoadingTransition />}
      <div className="ai-audit-container">
        <div className="ai-audit-header">
          <div className="header-logo">
            <div className="logo-icon">
              <img src="/images/ai-audit-icon.svg" alt="AI Audit Icon" />
            </div>
            <div className="header-text">
              <h1>AI-Audit</h1>
              <h2>
                <span className="title-with-underline">Smart Contract</span>
                <br />
                <span className="title-with-underline">Vulnerability Analysis</span>
              </h2>
            </div>
          </div>
          <div className="header-description">
            <p>
              "Enter your smart contract code"{" "}
              <br />
              <span className="highlight">click the <span className="button-text">Analyze</span> button to scan for vulnerabilities."</span>
            </p>
          </div>
        </div>

        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => renderMessage(message, index))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <div className="input-wrapper">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder="Enter your contract codes here..." //Press '/' to start typing... 
                rows={1}
              />
              <button 
                className="analyze-button" 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                <span>Analyze</span>
                <img src="/images/send-icon.svg" alt="Send" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 