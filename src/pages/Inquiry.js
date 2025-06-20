import React, { useState } from 'react';
import './Inquiry.css';

const Inquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    content: '',
    file: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      file: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요.';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = '제목을 입력해주세요.';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // 제출 시뮬레이션
      setTimeout(() => {
        console.log('문의 데이터:', formData);
        alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
        
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          content: '',
          file: null
        });
        setIsSubmitting(false);
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="inquiry-wrapper">
      <div className="inquiry-container">
        <div className="inquiry-header">
          <div className="header-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
            </svg>
          </div>
          <h2>견적 문의</h2>
          <p className='header-description'>
            <span className="desktop-text">공조기 제작 및 수리에 대한 문의사항을 남겨주세요</span>
            <span className="mobile-text">공조기 문의사항을 남겨주세요</span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="inquiry-form">
          <div className="form-section">
            <h3>연락처 정보</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  <span className="label-icon">👤</span>
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="성함을 입력해주세요"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">
                  <span className="label-icon">📞</span>
                  전화번호
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="010-0000-0000"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">
                  <span className="label-icon">✉️</span>
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="example@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>문의 내용</h3>
            <div className="form-group full-width">
              <label htmlFor="subject">
                <span className="label-icon">📝</span>
                제목
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={errors.subject ? 'error' : ''}
                placeholder="문의 제목을 입력해주세요"
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="content">
                <span className="label-icon">💬</span>
                상세 내용
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className={errors.content ? 'error' : ''}
                placeholder="송풍기 종류, 용량, 설치 환경 등 상세한 내용을 입력해주세요"
                rows="6"
              />
              {errors.content && <span className="error-message">{errors.content}</span>}
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="file">
                <span className="label-icon">📎</span>
                파일 첨부
              </label>
              <div className="file-upload-area">
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  className="file-input"
                />
                <div className="file-upload-content">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" fill="currentColor"/>
                  </svg>
                  <p>파일을 선택하거나 드래그해주세요</p>
                  <small>JPG, PNG, PDF, DOC, DOCX (최대 10MB)</small>
                </div>
                {formData.file && (
                  <div className="file-selected">
                    <span>선택된 파일: {formData.file.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="submit-container">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  전송 중...
                </>
              ) : (
                <>
                  <span>문의하기</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inquiry;
