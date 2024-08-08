import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ID, REDIRECT_URI } from '../constants/OAuth';

function KakaoCallback({ onLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const grantType = 'authorization_code';

    if (code) {
      axios.post(`https://kauth.kakao.com/oauth/token`, null, {
        params: {
          grant_type: grantType,
          client_id: CLIENT_ID,
          redirect_uri: REDIRECT_URI,
          code,
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then(res => {
        const { access_token } = res.data;
        window.localStorage.setItem('kakaoAccessToken', access_token);
        return axios.post(`https://kapi.kakao.com/v2/user/me`, {}, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        });
      })
      .then(async res => {
        const kakaoUser = res.data;
        const userId = kakaoUser.id;

        try {
          const response = await axios.get(`http://localhost:9000/api/user/${userId}`);
          const currentTime = new Date().toISOString();
          if (!response.data.userFound) {
            window.localStorage.setItem('userId', userId);
            window.localStorage.setItem('createdAt', currentTime);
            window.localStorage.setItem('loginTime', currentTime);
            navigate('/signup');
          } else {
            window.localStorage.setItem('userId', userId);
            window.localStorage.setItem('loginTime', currentTime);
            onLogin(userId);
            navigate('/random');
          }
        } catch (error) {
          console.error('로그인 실패', error);
          navigate('/signup');
        }
      })
      .catch(error => {
        console.error('로그인 실패', error);
        navigate('/signup');
      });
    } else {
      const logoutRedirectUri = new URL(window.location.href).searchParams.get('logout_redirect_uri');
      if (logoutRedirectUri) {
        window.localStorage.removeItem('kakaoAccessToken');
        window.localStorage.removeItem('userId');
        window.localStorage.removeItem('createdAt');
        window.localStorage.removeItem('loginTime');
        navigate('/');
      }
    }
  }, [navigate, onLogin]);

  return (
    <div>
      <h1>카카오 로그인 처리 중...</h1>
    </div>
  );
}

export default KakaoCallback;
