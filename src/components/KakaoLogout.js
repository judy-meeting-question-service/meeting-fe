import React from 'react';
import axios from 'axios';

function KakaoLogout({ onLogout }) {
  const handleLogout = () => {
    const accessToken = window.localStorage.getItem('kakaoAccessToken');
    if (!accessToken) {
      console.log('Not logged in.');
      return;
    }

    axios.post('http://localhost:9000/logout', { accessToken })
      .then(response => {
        if (response.status === 200) {
          console.log('로그아웃 성공');
          window.localStorage.removeItem('kakaoAccessToken');
          window.sessionStorage.clear();
          onLogout();
          window.location.href = 'http://localhost:2000/login';
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default KakaoLogout;
