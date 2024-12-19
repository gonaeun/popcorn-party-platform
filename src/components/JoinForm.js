import React, { useState } from 'react';
import { backendApi } from '../api'; // Axios 인스턴스 가져오기

const JoinForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = '아이디를 입력하세요.';
    if (!formData.nickname) newErrors.nickname = '닉네임을 입력하세요.';
    if (!formData.password) newErrors.password = '비밀번호를 입력하세요.';
    else if (formData.password.length < 8)
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    if (!formData.phoneNumber)
      newErrors.phoneNumber = '휴대전화번호를 입력하세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await backendApi.post('/api/auth/register', formData);
      console.log('회원가입 성공:', res.data);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('회원가입 오류:', error);
      setErrors({ server: error.response?.data?.message || '회원가입에 실패했습니다.' });
    }
  };

  return (
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
        {errors.username && <p>{errors.username}</p>}
      </div>

      <div>
        <label>닉네임</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력하세요"
        />
        {errors.nickname && <p>{errors.nickname}</p>}
      </div>

      <div>
      <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>

      <div>
        <label>휴대전화번호</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="전화번호를 입력하세요"
        />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
      </div>

      <button type="submit">회원가입</button>
    </form>
  );
};

export default JoinForm;