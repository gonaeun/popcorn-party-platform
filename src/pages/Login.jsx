import React, { useState } from 'react';
import { backendApi } from '../api'; // Axios 인스턴스 사용
import './Login.css';

const Login = ({ setIsLoggedIn }) => {   // App.js에서 전달받는 setIsLoggedIn
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await backendApi.post('/api/auth/login', formData);
      const { token } = res.data;

      alert('로그인 성공!');
      localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장
      setIsLoggedIn(true); // 로그인 상태 업데이트
      window.location.href = '/'; // 홈 화면으로 리다이렉트
    } catch (err) {
      console.error('로그인 실패:', err);
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleJoinClick = () => {
    window.location.href = '/join'; // 회원가입 페이지로 이동
  };

  return (
    <div className="login-wrapper">
      <h1 className="login-header">로그인</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="login-button">로그인</button>
          <button
            type="button"
            className="register-button"
            onClick={handleJoinClick}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
