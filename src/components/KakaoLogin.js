import React from 'react';
import { KAKAO_AUTH_URL } from '../constants/OAuth';
import loginLogo from '../assets/loginLogo.png';

function KakaoLogin() {
  return (
    <div>
      <a href={KAKAO_AUTH_URL}>
        <img
          src={loginLogo}
          alt="카카오로 계속하기"
        />
      </a>
    </div>
  );
}

export default KakaoLogin;
