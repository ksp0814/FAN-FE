import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h2>경일이엔지</h2>
            <p>송풍기 · 공조기 제작 및 수리</p>
          </div>
          <div className="footer-column">
            <h3>연락처</h3>
            <ul>
              <li><span>전화</span><a href="tel:01052269487">010-5226-9487</a></li>
              <li><span>팩스</span><span>031-987-9487</span></li>
              <li><span>이메일</span><a href="mailto:rkd0rkd@naver.com">rkd0rkd@naver.com</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>오시는 길</h3>
            <p>경기도 김포시 대곶면<br />대곶로 277-8</p>
            <a
              className="footer-directions"
              href="https://maps.google.com/maps?daddr=경기도 김포시 대곶면 대곶로 277-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              지도에서 길찾기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} 경일이엔지. All rights reserved.</p>
          <nav aria-label="푸터 메뉴">
            <Link to="/about">회사소개</Link>
            <Link to="/service">서비스</Link>
            <Link to="/inquiry">견적 문의</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
