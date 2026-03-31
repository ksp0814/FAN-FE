import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-col">
            <h4 className="footer-heading">경일이엔지</h4>
            <p className="footer-text">송풍기 · 공조기 제작 및 수리 전문</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">연락처</h4>
            <p className="footer-text">Tel. 010-5226-9487</p>
            <p className="footer-text">Fax. 031-987-9487</p>
            <p className="footer-text">Email. rkd0rkd@naver.com</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">오시는 길</h4>
            <p className="footer-text">경기도 김포시 대곶면 대곶로 277-8</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 경일이엔지. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
