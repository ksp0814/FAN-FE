import React, { useRef, useState } from 'react';
import './Inquiry.css';

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  content: '',
  files: [],
  privacy: false
};

const Inquiry = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      files: Array.from(e.target.files || [])
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotice(null);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phoneNumber', formData.phone);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('title', formData.subject);
    formDataToSend.append('description', formData.content);
    formData.files.forEach((file) => formDataToSend.append('files', file));

    try {
      const response = await fetch('http://localhost:8080/Inquiry', {
        method: 'POST',
        body: formDataToSend
      });
      if (!response.ok) throw new Error('문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.');

      setNotice({ type: 'success', message: '문의가 접수되었습니다. 확인 후 연락드리겠습니다.' });
      setFormData(initialFormData);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setNotice({ type: 'error', message: error.message || '문의 접수 중 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site-page inquiry-page">
      <header className="page-heading inquiry-page__heading">
        <p className="page-kicker">Contact</p>
        <h1 className="page-title">견적 문의</h1>
        <p className="page-lead">설비 관련 문의 내용을 남겨주시면 확인 후 연락드리겠습니다.</p>
      </header>

      <div className="inquiry-layout">
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <div className="inquiry-form__grid">
            <div className="form-field">
              <label htmlFor="inquiry-name">이름 <span aria-hidden="true">*</span></label>
              <input
                id="inquiry-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                placeholder="이름을 입력해 주세요"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="inquiry-phone">전화번호 <span aria-hidden="true">*</span></label>
              <input
                id="inquiry-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                placeholder="010-0000-0000"
                required
              />
            </div>
            <div className="form-field inquiry-form__full">
              <label htmlFor="inquiry-email">이메일 <span aria-hidden="true">*</span></label>
              <input
                id="inquiry-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="form-field inquiry-form__full">
              <label htmlFor="inquiry-subject">제목 <span aria-hidden="true">*</span></label>
              <input
                id="inquiry-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="문의 제목을 입력해 주세요"
                required
              />
            </div>
            <div className="form-field inquiry-form__full">
              <label htmlFor="inquiry-content">문의 내용 <span aria-hidden="true">*</span></label>
              <textarea
                id="inquiry-content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="6"
                placeholder="설비 종류와 현장 상황을 함께 적어주시면 상담에 도움이 됩니다."
                required
              />
            </div>
            <div className="form-field inquiry-form__full">
              <label htmlFor="inquiry-files">이미지 첨부</label>
              <div className="file-picker">
                <input
                  ref={fileInputRef}
                  id="inquiry-files"
                  type="file"
                  name="files"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                />
                <p>현장 사진을 첨부하면 상담에 도움이 됩니다. 이미지 파일 여러 개를 선택할 수 있습니다.</p>
                {formData.files.length > 0 && (
                  <ul className="file-picker__list" aria-label="선택한 파일">
                    {formData.files.map((file, index) => (
                      <li key={`${file.name}-${index}`}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="privacy-check">
            <input
              id="inquiry-privacy"
              type="checkbox"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              required
            />
            <label htmlFor="inquiry-privacy">진단과 견적 의뢰를 위한 개인정보 수집 및 이용에 동의합니다.</label>
          </div>

          {notice && (
            <p className={`form-notice form-notice--${notice.type}`} role={notice.type === 'error' ? 'alert' : 'status'}>
              {notice.message}
            </p>
          )}

          <button className="button button--primary inquiry-form__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? '접수 중...' : '문의 접수하기'}
          </button>
        </form>

        <aside className="inquiry-contact" aria-label="전화 및 이메일 문의">
          <p className="inquiry-contact__eyebrow">Direct contact</p>
          <h2>전화 상담이<br />더 편하신가요?</h2>
          <p className="inquiry-contact__copy">운영 중인 설비의 긴급한 문의는 전화로 연락해 주세요.</p>
          <a className="inquiry-contact__phone" href="tel:01052269487">010-5226-9487</a>
          <div className="inquiry-contact__divider" />
          <p className="inquiry-contact__label">이메일</p>
          <a className="inquiry-contact__email" href="mailto:rkd0rkd@naver.com">rkd0rkd@naver.com</a>
        </aside>
      </div>
    </div>
  );
};

export default Inquiry;
