import React from 'react';
import './Service.css';

const Service = () => {
  const services = [
    {
      icon: '🔧',
      title: '송풍기 제작',
      description: '고객의 요구사항에 맞춘 맞춤형 송풍기를 설계 및 제작합니다. 산업용, 공장용, 건물용 등 다양한 용도에 적합한 송풍기를 제공합니다.',
      features: ['맞춤 설계', '다양한 규격', '고효율 제품']
    },
    {
      icon: '🛠️',
      title: '송풍기 수리',
      description: '모든 종류의 송풍기 고장 진단 및 수리를 전문적으로 수행합니다. 신속하고 정확한 수리로 가동 중단 시간을 최소화합니다.',
      features: ['정밀 진단', '신속 수리', '부품 교체']
    },
    {
      icon: '🏭',
      title: '공조기 제작',
      description: '건물 및 공장의 환경에 최적화된 공조 시스템을 설계하고 제작합니다. 에너지 효율과 성능을 모두 고려한 솔루션을 제공합니다.',
      features: ['환경 맞춤 설계', '에너지 절감', '최적 성능']
    },
    {
      icon: '🚗',
      title: '24시간 출장 A/S',
      description: '긴급 상황 발생 시 24시간 출장 서비스를 제공합니다. 빠른 현장 대응으로 고객의 불편을 최소화합니다.',
      features: ['24시간 대응', '현장 출장', '긴급 수리']
    }
  ];

  const process = [
    { step: '01', title: '문의 접수', description: '전화 또는 온라인으로 문의를 접수합니다.' },
    { step: '02', title: '현장 방문 / 진단', description: '전문 기술자가 현장을 방문하여 상태를 진단합니다.' },
    { step: '03', title: '견적 제공', description: '진단 결과를 바탕으로 정확한 견적을 제공합니다.' },
    { step: '04', title: '작업 수행', description: '합의된 내용에 따라 제작 또는 수리를 진행합니다.' },
    { step: '05', title: 'A/S 지원', description: '작업 완료 후에도 지속적인 사후 관리를 제공합니다.' }
  ];

  return (
    <div className="service-container">
      <div className="page-title-section">
        <h1 className="page-title">서비스 소개</h1>
        <div className="title-underline"></div>
        <p className="page-subtitle">경일이엔지는 송풍기 및 공조기 분야의 전문 기술력으로 최상의 서비스를 제공합니다.</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="process-section">
        <h2 className="section-title">서비스 진행 절차</h2>
        <div className="process-steps">
          {process.map((item, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{item.step}</div>
              <h4 className="step-title">{item.title}</h4>
              <p className="step-description">{item.description}</p>
              {index < process.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
