// src/components/Footer.js
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-content">
          {/* 왼쪽: 로고 및 회사 설명 */}
          <div className="footer-left">
            <p>주소: 경기도 김포시 대곶면 대곶로 277-8</p>
          </div>

          {/* 중앙: 저작권 */}
          <div className="footer-center">
            <p>&copy; 2025 K-경일이엔지. All rights reserved.</p>
          </div>

          {/* 오른쪽: 연락처 정보 */}
          <div className="footer-right">
            <div className="footer-contact">
              <p>Tel: 010-5226-9487</p>
              <p>Fax: 000-000-000</p>
              <p>Email: rkd0rkd@naver.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
