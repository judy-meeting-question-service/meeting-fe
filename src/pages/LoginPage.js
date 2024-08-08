// src/pages/LoginPage.js
import React from 'react';
import KakaoLogin from '../components/KakaoLogin';

function LoginPage({ onLogin }) {
  return (
    <div>
      <h2>로그인 페이지</h2>
      <KakaoLogin onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
