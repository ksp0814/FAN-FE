import React, { useState, useEffect, useCallback } from 'react';
import './Admin.css';

const API_BASE = 'http://localhost:8080/Inquiry';

const Admin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const statusOptions = ['RECEIVED', 'IN_PROGRESS', 'COMPLETED'];

  const statusLabel = {
    RECEIVED: '대기',
    IN_PROGRESS: '처리중',
    COMPLETED: '완료'
  };

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE);
      if (!response.ok) throw new Error('데이터를 불러오지 못했습니다.');
      const data = await response.json();
      setInquiries(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusChange = async (newStatus) => {
    if (!selectedInquiry) return;
    try {
      const response = await fetch(`${API_BASE}/${selectedInquiry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('상태 변경에 실패했습니다.');
      const updated = await response.json();
      setInquiries(prev =>
        prev.map(inq => (inq.id === updated.id ? updated : inq))
      );
      setSelectedInquiry(updated);
      setShowStatusModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'RECEIVED': return '#f59e0b';
      case 'IN_PROGRESS': return '#3b82f6';
      case 'COMPLETED': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-state">데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchInquiries} className="btn-primary">다시 시도</button>
        </div>
      </div>
    );
  }

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
            <span className="stat-number">{inquiries.filter(i => i.status === 'RECEIVED').length}</span>
            <span className="stat-label">대기중</span>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="inquiry-list">
          <h2>문의 목록</h2>
          <div className="list-container">
            {inquiries.length === 0 ? (
              <div className="no-selection"><p>접수된 문의가 없습니다.</p></div>
            ) : (
              inquiries.map(inquiry => (
                <div
                  key={inquiry.id}
                  className={`inquiry-item ${selectedInquiry?.id === inquiry.id ? 'selected' : ''}`}
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="inquiry-header-item">
                    <h3>{inquiry.title}</h3>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(inquiry.status) }}
                    >
                      {statusLabel[inquiry.status] || inquiry.status}
                    </span>
                  </div>
                  <div className="inquiry-meta">
                    <span>{inquiry.name}</span>
                    <span>{formatDate(inquiry.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
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
                    <span>{selectedInquiry.phoneNumber}</span>
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
                    <span>{selectedInquiry.title}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">내용:</span>
                    <p className="content-text">{selectedInquiry.description}</p>
                  </div>
                  <div className="detail-row">
                    <span className="label">접수일:</span>
                    <span>{formatDate(selectedInquiry.createdAt)}</span>
                  </div>
                  {selectedInquiry.filePath && (
                    <div className="detail-row">
                      <span className="label">첨부파일:</span>
                      <div className="file-info">
                        <span className="file-icon">📎</span>
                        <span className="file-name">{selectedInquiry.filePath}</span>
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
                            {statusLabel[status]}
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
