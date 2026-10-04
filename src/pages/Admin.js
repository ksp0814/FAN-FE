import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Admin.css';

const API_BASE = 'http://localhost:8080/Inquiry';
const statusOptions = ['RECEIVED', 'IN_PROGRESS', 'COMPLETED'];
const statusLabel = {
  RECEIVED: '대기',
  IN_PROGRESS: '처리중',
  COMPLETED: '완료'
};
const statusTone = {
  RECEIVED: 'waiting',
  IN_PROGRESS: 'active',
  COMPLETED: 'complete'
};

const Admin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const statusModalRef = useRef(null);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE);
      if (!response.ok) throw new Error('데이터를 불러오지 못했습니다.');
      const data = await response.json();
      setInquiries(data);
      setError('');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  useEffect(() => {
    if (!showStatusModal) return undefined;
    const previousFocus = document.activeElement;
    const dialog = statusModalRef.current;
    const getFocusableElements = () => Array.from(
      dialog?.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])') || []
    );
    getFocusableElements()[0]?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowStatusModal(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusableElements = getFocusableElements();
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [showStatusModal]);

  const handleStatusChange = async (newStatus) => {
    if (!selectedInquiry || updatingStatus) return;
    setUpdatingStatus(true);
    setStatusError('');

    try {
      const response = await fetch(`${API_BASE}/${selectedInquiry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('상태 변경에 실패했습니다.');
      const updated = await response.json();
      setInquiries((prev) => prev.map((inquiry) => (inquiry.id === updated.id ? updated : inquiry)));
      setSelectedInquiry(updated);
      setShowStatusModal(false);
    } catch (requestError) {
      setStatusError(requestError.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  const getStatusClass = (status) => statusTone[status] || 'unknown';

  if (loading) {
    return <div className="site-page admin-page"><p className="admin-state" role="status">데이터를 불러오는 중...</p></div>;
  }

  if (error) {
    return (
      <div className="site-page admin-page">
        <section className="admin-state admin-state--error" role="alert">
          <h1>문의를 불러오지 못했습니다.</h1>
          <p>{error}</p>
          <button type="button" onClick={fetchInquiries} className="button button--primary">다시 시도</button>
        </section>
      </div>
    );
  }

  return (
    <div className="site-page admin-page">
      <header className="admin-header">
        <div>
          <p className="page-kicker">Administration</p>
          <h1>문의 관리</h1>
        </div>
        <div className="admin-stats" aria-label="문의 현황">
          <div className="admin-stat">
            <span className="admin-stat__number">{inquiries.length}</span>
            <span className="admin-stat__label">전체 문의</span>
          </div>
          <div className="admin-stat">
            <span className="admin-stat__number">{inquiries.filter((item) => item.status === 'RECEIVED').length}</span>
            <span className="admin-stat__label">대기 문의</span>
          </div>
        </div>
      </header>

      <div className="admin-content">
        <section className="admin-panel admin-list" aria-labelledby="admin-list-title">
          <div className="admin-panel__heading">
            <h2 id="admin-list-title">문의 목록</h2>
            <span>{inquiries.length}건</span>
          </div>
          <div className="admin-list__scroll">
            {inquiries.length === 0 ? (
              <p className="admin-empty">접수된 문의가 없습니다.</p>
            ) : (
              <ul className="admin-list__items">
                {inquiries.map((inquiry) => (
                  <li key={inquiry.id}>
                    <button
                      type="button"
                      className={`inquiry-item ${selectedInquiry?.id === inquiry.id ? 'inquiry-item--selected' : ''}`}
                      onClick={() => setSelectedInquiry(inquiry)}
                      aria-pressed={selectedInquiry?.id === inquiry.id}
                    >
                      <span className="inquiry-item__top">
                        <span className="inquiry-item__title">{inquiry.title}</span>
                        <span className={`status-badge status-badge--${getStatusClass(inquiry.status)}`}>
                          {statusLabel[inquiry.status] || inquiry.status}
                        </span>
                      </span>
                      <span className="inquiry-item__meta">
                        <span>{inquiry.name}</span>
                        <span>{formatDate(inquiry.createdAt)}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="admin-panel admin-detail" aria-labelledby="admin-detail-title">
          <div className="admin-panel__heading">
            <h2 id="admin-detail-title">문의 상세</h2>
            {selectedInquiry && (
              <span className={`status-badge status-badge--${getStatusClass(selectedInquiry.status)}`}>
                {statusLabel[selectedInquiry.status] || selectedInquiry.status}
              </span>
            )}
          </div>
          {selectedInquiry ? (
            <div className="admin-detail__content">
              <section className="admin-detail__section" aria-labelledby="customer-info-title">
                <h3 id="customer-info-title">고객 정보</h3>
                <dl className="admin-detail__facts">
                  <div><dt>이름</dt><dd>{selectedInquiry.name}</dd></div>
                  <div><dt>전화</dt><dd>{selectedInquiry.phoneNumber}</dd></div>
                  <div><dt>이메일</dt><dd>{selectedInquiry.email}</dd></div>
                </dl>
              </section>
              <section className="admin-detail__section" aria-labelledby="inquiry-info-title">
                <h3 id="inquiry-info-title">문의 내용</h3>
                <dl className="admin-detail__facts">
                  <div><dt>제목</dt><dd>{selectedInquiry.title}</dd></div>
                  <div><dt>접수일</dt><dd>{formatDate(selectedInquiry.createdAt)}</dd></div>
                </dl>
                <p className="admin-detail__message">{selectedInquiry.description}</p>
                {selectedInquiry.filePath && (
                  <div className="admin-detail__attachment">
                    <span aria-hidden="true">첨부</span>
                    <span>{selectedInquiry.filePath}</span>
                  </div>
                )}
              </section>
              <button
                type="button"
                className="button button--primary admin-detail__action"
                onClick={() => { setStatusError(''); setShowStatusModal(true); }}
              >
                상태 변경
              </button>
            </div>
          ) : (
            <p className="admin-empty admin-empty--detail">목록에서 문의를 선택해 주세요.</p>
          )}
        </section>
      </div>

      {showStatusModal && (
        <div className="status-modal-overlay" onClick={() => setShowStatusModal(false)}>
          <section
            className="status-modal"
            ref={statusModalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="status-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="page-kicker">Update inquiry</p>
            <h2 id="status-modal-title">문의 상태 변경</h2>
            <div className="status-options">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`status-option ${selectedInquiry?.status === status ? 'status-option--current' : ''}`}
                  onClick={() => handleStatusChange(status)}
                  disabled={updatingStatus || selectedInquiry?.status === status}
                >
                  <span className={`status-dot status-dot--${getStatusClass(status)}`} aria-hidden="true" />
                  {statusLabel[status]}
                </button>
              ))}
            </div>
            {statusError && <p className="status-modal__error" role="alert">{statusError}</p>}
            <button type="button" className="status-modal__close" onClick={() => setShowStatusModal(false)} disabled={updatingStatus}>
              취소
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default Admin;
