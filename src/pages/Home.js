import React from 'react';
import { Link } from 'react-router-dom';
import CompanyImg from '../assets/company.jpeg';
import './Home.css';

const Home = () => {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img
          src={CompanyImg}
          alt="경일이엔지 사업장 전경"
          className="hero__image"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="site-container hero__inner">
          <div className="hero__content">
            <p className="hero__eyebrow">송풍기 · 공조기 전문</p>
            <h1 id="hero-title" className="hero__title">경일이엔지</h1>
            <p className="hero__description">
              송풍기와 공조기 제작부터 수리까지,<br className="hero__desktop-break" />
              현장에 필요한 설비를 함께 고민합니다.
            </p>
            <div className="hero__actions">
              <Link to="/inquiry" className="button button--primary">견적 문의</Link>
              <Link to="/service" className="button button--light">서비스 보기</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="home-services" aria-label="주요 서비스">
        <div className="site-container home-services__inner">
          <p className="home-services__label">주요 서비스</p>
          <ul className="home-services__list">
            <li>송풍기 제작 및 수리</li>
            <li>공조기 제작</li>
            <li>24시간 출장 A/S</li>
          </ul>
          <a className="home-services__phone" href="tel:01052269487">전화 상담 <span>010-5226-9487</span></a>
        </div>
      </section>
    </>
  );
};

export default Home;
