import React from 'react';
import JoinForm from '../components/JoinForm';

const Join = () => {
  const handleSuccess = () => {
    alert('회원가입이 완료되었습니다!');
    window.location.href = '/login'; // 회원가입 후 로그인 페이지로 이동
  };

  return (
    <div>
      <h1>회원가입</h1>
      <JoinForm onSuccess={handleSuccess} />
    </div>
  );
};

export default Join;
