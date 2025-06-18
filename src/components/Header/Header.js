// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImg from '../../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <img src={logoImg} alt="K-경일이엔지 로고" className="logo-image" />
          </Link>
        </div>
        
        {/* 햄버거 메뉴 버튼 */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="메뉴 열기/닫기"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li><Link to="/about" onClick={closeMenu}>회사소개</Link></li>
            <li><Link to="/service" onClick={closeMenu}>서비스 소개</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>견적 문의</Link></li>
          </ul>
        </nav>

        {/* 모바일 메뉴 오버레이 */}
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      </div>
    </header>
  );
};

export default Header;
