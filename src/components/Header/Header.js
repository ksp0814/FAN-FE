import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logoImg from '../../assets/logo.png';

const navItems = [
  { path: '/about', label: '회사소개' },
  { path: '/service', label: '서비스 소개' },
  { path: '/inquiry', label: '견적 문의', primary: true }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo-link" onClick={closeMenu} aria-label="경일이엔지 홈">
          <img src={logoImg} alt="경일이엔지" className="logo-image" />
        </Link>

        <button
          type="button"
          className={`hamburger ${isMenuOpen ? 'hamburger--active' : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-navigation" className={`nav ${isMenuOpen ? 'nav--open' : ''}`} aria-label="주 메뉴">
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeMenu}
                  className={`nav-link ${item.primary ? 'nav-link--primary' : ''} ${location.pathname === item.path ? 'nav-link--active' : ''}`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="nav-phone-item">
              <a className="nav-phone" href="tel:01052269487" onClick={closeMenu}>010-5226-9487</a>
            </li>
            <li>
              <Link to="/login" className="nav-admin" onClick={closeMenu}>관리자</Link>
            </li>
          </ul>
        </nav>

        {isMenuOpen && (
          <button type="button" className="menu-overlay" onClick={closeMenu} aria-label="메뉴 닫기" />
        )}
      </div>
    </header>
  );
};

export default Header;
