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
            <div className="map-placeholder">
              {/* 실제 구현시에는 Google Maps나 Kakao Map API 사용 */}
              <img 
                src="/images/map.png" 
                alt="회사 위치 지도" 
                className="map-image"
              />
            </div>
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
