import React from 'react';
import { Link } from 'react-router-dom';
import './Service.css';

const services = [
  {
    number: '01',
    category: 'BLOWER · BUILD',
    title: '송풍기 제작',
    description: '요구사항과 사용 환경에 맞춰 산업용·공장용·건물용 송풍기를 설계하고 제작합니다.',
    features: ['맞춤 설계', '다양한 규격', '고효율 제품']
  },
  {
    number: '02',
    category: 'BLOWER · REPAIR',
    title: '송풍기 수리',
    description: '고장 원인을 진단하고 수리와 부품 교체를 진행해 설비가 다시 안정적으로 작동하도록 돕습니다.',
    features: ['정밀 진단', '신속 수리', '부품 교체']
  },
  {
    number: '03',
    category: 'AIR CONDITIONING',
    title: '공조기 제작',
    description: '건물과 공장의 환경에 맞는 공조 시스템을 설계하고 제작합니다.',
    features: ['환경 맞춤 설계', '에너지 절감', '성능 고려']
  },
  {
    number: '04',
    category: 'ON-SITE SERVICE',
    title: '24시간 출장 A/S',
    description: '긴급 상황에 현장으로 찾아가 빠르게 상태를 살피고 필요한 수리를 진행합니다.',
    features: ['24시간 대응', '현장 출장', '긴급 수리']
  }
];

const process = [
  { step: '01', title: '문의 접수', description: '전화 또는 온라인으로 문의를 접수합니다.' },
  { step: '02', title: '현장 방문·진단', description: '현장을 방문해 설비 상태를 확인합니다.' },
  { step: '03', title: '견적 안내', description: '진단 내용을 바탕으로 견적을 안내합니다.' },
  { step: '04', title: '작업 진행', description: '협의한 내용에 따라 제작 또는 수리를 진행합니다.' },
  { step: '05', title: '사후 지원', description: '작업 후 필요한 사후 관리를 지원합니다.' }
];

const Service = () => {
  return (
    <div className="site-page service-page">
      <header className="page-heading">
        <p className="page-kicker">What we do</p>
        <h1 className="page-title">서비스 소개</h1>
        <p className="page-lead">송풍기와 공조기 제작, 수리부터 현장 출장 A/S까지 필요한 서비스를 제공합니다.</p>
      </header>

      <section className="services-grid" aria-label="경일이엔지 서비스">
        {services.map((service) => (
          <article key={service.number} className="service-card">
            <div className="service-card__topline">
              <span className="service-card__number">{service.number}</span>
              <span className="service-card__category">{service.category}</span>
            </div>
            <h2 className="service-card__title">{service.title}</h2>
            <p className="service-card__description">{service.description}</p>
            <ul className="service-card__features">
              {service.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="service-process" aria-labelledby="service-process-title">
        <div className="service-process__heading">
          <p className="section-kicker">How we work</p>
          <h2 id="service-process-title">서비스 진행 절차</h2>
          <p>문의부터 작업 완료까지 순서대로 안내해 드립니다.</p>
        </div>
        <ol className="process-steps">
          {process.map((item) => (
            <li key={item.step} className="process-step">
              <span className="process-step__number">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="service-contact" aria-label="서비스 상담">
        <div>
          <p className="service-contact__eyebrow">Need a consultation?</p>
          <h2>필요한 설비를 상담해 보세요.</h2>
        </div>
        <div className="service-contact__actions">
          <Link to="/inquiry" className="button button--primary">견적 문의</Link>
          <a href="tel:01052269487" className="service-contact__phone">010-5226-9487</a>
        </div>
      </section>
    </div>
  );
};

export default Service;
