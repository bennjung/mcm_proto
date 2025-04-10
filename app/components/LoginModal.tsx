'use client';

import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 로그인 로직 구현
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2 className="modal-title">로그인</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-input"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-input"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <div className="login-footer">
          <p>계정이 없으신가요? <a href="#">회원가입</a></p>
        </div>
      </div>
    </div>
  );
} 