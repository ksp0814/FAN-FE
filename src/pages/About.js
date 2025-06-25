import React from 'react';
import './About.css';
import CompanyImg from '../assets/company.jpeg';

const About = () => {
  return (
    <div className="about-container">
      {/* 페이지 제목 */}
      <div className="page-title-section">
        <h1 className="page-title">회사소개</h1>
        <div className="title-underline"></div>
      </div>

      {/* Company Overview 섹션 */}
      <div className="company-overview-section">
        <h2 className="section-title">Company Overview</h2>
        
        <div className="overview-content">
          <div className="overview-image">
            <img 
              src={CompanyImg} 
              alt="회사 건물" 
              className="building-image"
            />
          </div>
          
          <div className="company-info">
            <div className="info-row">
              <span className="info-label">회사명</span>
              <span className="info-value">K-경일이엔지</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">대표 이사</span>
              <span className="info-value">강재영</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">설립 일자</span>
              <span className="info-value">2025.~~</span>
            </div>
          </div>
        </div>
      </div>

      {/* 오시는 길 섹션 */}
      <div className="location-section">
        <h2 className="section-title">오시는 길</h2>
        
        <div className="location-content">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50625.77203539618!2d126.71545167832031!3d37.61509990000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b79a6b25c7b0f%3A0x5c7f0b9b0b0b0b0b!2z6rK96riw64-E6rmA7Y+s7IucIOq5gO2PrOyLnA!5e0!3m2!1sko!2skr!4v1234567890123!5m2!1sko!2skr"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="K-경일이엔지 위치"
            ></iframe>
            <a 
              href="https://maps.google.com/maps?daddr=경기도 김포시" 
              target="_blank" 
              rel="noopener noreferrer"
              className="directions-btn-overlay"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              길찾기
            </a>
          </div>
          
          <div className="contact-info">
            <div className="info-row">
              <span className="info-label">주소</span>
              <span className="info-value">경기도 김포시</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">전화</span>
              <span className="info-value">010-5226-9487</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">팩스</span>
              <span className="info-value">010-5226-9487</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
