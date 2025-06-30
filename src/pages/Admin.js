import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: '김철수',
      phone: '010-1234-5678',
      email: 'kim@example.com',
      subject: '공조기 설치 문의',
      content: '사무실에 공조기 설치를 원합니다. 면적은 약 100평 정도이고...',
      date: '2025-01-15',
      status: '대기',
      file: { name: '사무실_도면.pdf', size: '2.3MB' }
    },
    {
      id: 2,
      name: '박영희',
      phone: '010-9876-5432',
      email: 'park@example.com',
      subject: '송풍기 수리 요청',
      content: '기존 송풍기에서 이상한 소음이 발생합니다. 점검 부탁드립니다.',
      date: '2025-01-14',
      status: '처리중',
      file: { name: '송풍기_사진.jpg', size: '1.8MB' }
    },
    {
      id: 3,
      name: '이민수',
      phone: '010-5555-1234',
      email: 'lee@example.com',
      subject: '견적 요청',
      content: '공장용 대형 송풍기 견적을 요청합니다.',
      date: '2025-01-13',
      status: '완료',
      file: null
    }
  ]);

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const statusOptions = ['대기', '처리중', '완료'];

  const handleStatusChange = (newStatus) => {
    if (selectedInquiry) {
      const updatedInquiries = inquiries.map(inquiry => 
        inquiry.id === selectedInquiry.id 
          ? { ...inquiry, status: newStatus }
          : inquiry
      );
      setInquiries(updatedInquiries);
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      setShowStatusModal(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '대기': return '#f59e0b';
      case '처리중': return '#3b82f6';
      case '완료': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>문의 관리</h1>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{inquiries.length}</span>
            <span className="stat-label">총 문의</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{inquiries.filter(i => i.status === '대기').length}</span>
            <span className="stat-label">대기중</span>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="inquiry-list">
          <h2>문의 목록</h2>
          <div className="list-container">
            {inquiries.map(inquiry => (
              <div 
                key={inquiry.id} 
                className={`inquiry-item ${selectedInquiry?.id === inquiry.id ? 'selected' : ''}`}
                onClick={() => setSelectedInquiry(inquiry)}
              >
                <div className="inquiry-header-item">
                  <h3>{inquiry.subject}</h3>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(inquiry.status) }}
                  >
                    {inquiry.status}
                  </span>
                </div>
                <div className="inquiry-meta">
                  <span>{inquiry.name}</span>
                  <span>{inquiry.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="inquiry-detail">
          {selectedInquiry ? (
            <>
              <h2>문의 상세</h2>
              <div className="detail-content">
                <div className="detail-section">
                  <h3>고객 정보</h3>
                  <div className="detail-row">
                    <span className="label">이름:</span>
                    <span>{selectedInquiry.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">전화:</span>
                    <span>{selectedInquiry.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">이메일:</span>
                    <span>{selectedInquiry.email}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>문의 내용</h3>
                  <div className="detail-row">
                    <span className="label">제목:</span>
                    <span>{selectedInquiry.subject}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">내용:</span>
                    <p className="content-text">{selectedInquiry.content}</p>
                  </div>
                  <div className="detail-row">
                    <span className="label">접수일:</span>
                    <span>{selectedInquiry.date}</span>
                  </div>
                  {selectedInquiry.file && (
                    <div className="detail-row">
                      <span className="label">첨부파일:</span>
                      <div className="file-info">
                        <span className="file-icon">📎</span>
                        <span className="file-name">{selectedInquiry.file.name}</span>
                        <span className="file-size">({selectedInquiry.file.size})</span>
                        <button className="file-download-btn">다운로드</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="action-buttons">
                  <button 
                    className="btn-secondary"
                    onClick={() => setShowStatusModal(true)}
                  >
                    상태변경
                  </button>
                </div>

                {showStatusModal && (
                  <div className="status-modal-overlay" onClick={() => setShowStatusModal(false)}>
                    <div className="status-modal" onClick={(e) => e.stopPropagation()}>
                      <h3>상태 변경</h3>
                      <div className="status-options">
                        {statusOptions.map(status => (
                          <button
                            key={status}
                            className={`status-option ${selectedInquiry.status === status ? 'current' : ''}`}
                            onClick={() => handleStatusChange(status)}
                            style={{ borderColor: getStatusColor(status) }}
                          >
                            <span 
                              className="status-color" 
                              style={{ backgroundColor: getStatusColor(status) }}
                            ></span>
                            {status}
                          </button>
                        ))}
                      </div>
                      <button 
                        className="modal-close-btn"
                        onClick={() => setShowStatusModal(false)}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>문의를 선택해주세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;