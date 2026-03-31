import React from 'react';
import { Link } from 'react-router-dom';
import HeroImg from '../assets/hero2.jpg';
import './Home.css';

const Home = () => {
  return (
    <section className="hero">
      <img src={HeroImg} alt="경일이엔지 작업 현장" className="hero-image" />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-tag">송풍기 · 공조기 전문</p>
        <h1 className="hero-title">경일이엔지</h1>
        <p className="hero-desc">공조기 제작 및 수리 전문 업체<br />고객 만족을 최우선으로 생각합니다</p>
        <div className="hero-actions">
          <Link to="/inquiry" className="hero-btn hero-btn--primary">견적 문의</Link>
          <Link to="/service" className="hero-btn hero-btn--outline">서비스 보기</Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
