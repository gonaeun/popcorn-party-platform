import React, { useState } from 'react';
import { backendApi } from '../api'; // Axios 인스턴스를 불러옴

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // 에러 메시지 초기화
    try {
      // 로그인 API 호출
      const res = await backendApi.post('/auth/login', formData);
      const { token } = res.data;

      // 로그인 성공 처리
      alert('로그인 성공!');
      localStorage.setItem('token', token); // JWT 토큰 저장
      window.location.href = '/'; // 홈 화면으로 리다이렉트
    } catch (err) {
      console.error('로그인 실패:', err);
      setError('아이디 또는 비밀번호가 잘못되었습니다.'); // 에러 메시지 표시
    }
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;