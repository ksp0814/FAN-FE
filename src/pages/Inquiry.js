import React, { useState } from 'react';
import './Inquiry.css';

const Inquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    content: '',
    files: [],
    privacy: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: [...Array.from(e.target.files)]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phoneNumber', formData.phone);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('title', formData.subject);
    formDataToSend.append('description', formData.content);
    
    formData.files.forEach((file) => {
      formDataToSend.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:8080/Inquiry', {
        method: 'POST',
        body: formDataToSend
      });
      if (!response.ok) throw new Error('서버 오류가 발생했습니다.');
      alert('문의가 접수되었습니다.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        content: '',
        files: [],
        privacy: false
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="inquiry-wrapper">
      <div className="inquiry-container">
        <h2>견적 문의</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이름 :</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>전화번호 :</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>제목 :</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>내용 :</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label>이미지</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
              {formData.files.length > 0 && (
                <div className="selected-files">
                  {formData.files.map((file, index) => (
                    <div key={index} className="file-name">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="privacy-check">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              required
            />
            <label htmlFor="privacy">
              진단과 견적 의뢰를 위한 개인정보 수집 및 이용에 동의합니다.
            </label>
          </div>
          <button type="submit">문의하기</button>
        </form>
      </div>
    </div>
  );
};

export default Inquiry;