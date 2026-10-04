import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/admin');
    } catch {
      setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site-page login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <p className="page-kicker">Administration</p>
        <h1 id="login-title">관리자 로그인</h1>
        <p className="login-panel__description">문의 관리 페이지에 접속합니다.</p>
        {error && <p className="login-error" role="alert">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>
          <button className="button button--primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? '확인 중...' : '로그인'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
