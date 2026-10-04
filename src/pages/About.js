import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import CompanyImg from '../assets/company.jpeg';

const About = () => {
  return (
    <div className="site-page about-page">
      <header className="page-heading">
        <p className="page-kicker">About us</p>
        <h1 className="page-title">경일이엔지 소개</h1>
        <p className="page-lead">송풍기와 공조기 제작 및 수리를 전문으로 하는 경일이엔지입니다.</p>
      </header>

      <section className="about-overview" aria-labelledby="about-overview-title">
        <div className="about-overview__image-wrap">
          <img src={CompanyImg} alt="경일이엔지 사업장 건물" className="about-overview__image" />
          <span className="about-overview__image-label">GYEONGIL ENG</span>
        </div>
        <div className="about-overview__body">
          <p className="section-kicker">Company profile</p>
          <h2 id="about-overview-title">현장에 필요한 설비를<br />꼼꼼하게 살핍니다.</h2>
          <p className="about-overview__copy">
            경일이엔지는 송풍기와 공조기의 제작, 수리 서비스를 제공합니다.
            필요한 설비와 사용 환경을 확인하고 상담부터 작업까지 함께합니다.
          </p>
          <dl className="company-facts">
            <div className="company-facts__row">
              <dt>회사명</dt>
              <dd>경일이엔지</dd>
            </div>
            <div className="company-facts__row">
              <dt>대표이사</dt>
              <dd>강재영</dd>
            </div>
            <div className="company-facts__row">
              <dt>설립일</dt>
              <dd>2014년 2월 1일</dd>
            </div>
          </dl>
          <Link to="/inquiry" className="about-overview__link">견적 문의하기 <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="about-location" aria-labelledby="about-location-title">
        <div className="about-location__heading">
          <div>
            <p className="section-kicker">Visit us</p>
            <h2 id="about-location-title">오시는 길</h2>
          </div>
          <p>경기도 김포시 대곶면 대곶로 277-8</p>
        </div>
        <div className="about-location__content">
          <div className="about-location__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.3172907274734!2d126.54887687599107!3d37.66525161846122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c7e9a74e48bf5%3A0x29bd57caa3f35d97!2z6rK96riw64-EIOq5gO2PrOyLnCDrjIDqs7brqbQg64yA6rO266GcIDI3Ny04!5e0!3m2!1sko!2skr!4v1758174273633!5m2!1sko!2skr"
              title="경일이엔지 위치 지도"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="about-location__details">
            <dl className="contact-facts">
              <div className="contact-facts__row">
                <dt>주소</dt>
                <dd>경기도 김포시 대곶면 대곶로 277-8</dd>
              </div>
              <div className="contact-facts__row">
                <dt>전화</dt>
                <dd><a href="tel:01052269487">010-5226-9487</a></dd>
              </div>
              <div className="contact-facts__row">
                <dt>팩스</dt>
                <dd>031-987-9487</dd>
              </div>
            </dl>
            <a
              className="button button--primary about-location__directions"
              href="https://maps.google.com/maps?daddr=경기도 김포시 대곶면 대곶로 277-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              지도에서 길찾기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
