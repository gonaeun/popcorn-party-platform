import React, { useState } from 'react';
import { backendApi } from '../api'; // Axios 인스턴스 사용

const Login = () => {
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
      localStorage.setItem('token', token);
      window.location.href = '/'; // 홈으로 리다이렉트
    } catch (err) {
      console.error('로그인 실패:', err);
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleJoinClick = () => {
    window.location.href = '/join'; // 회원가입 페이지로 이동
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginTop: '10px' }}>
          <button type="submit">로그인</button>
          <button
            type="button"
            style={{
              marginLeft: '10px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
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
