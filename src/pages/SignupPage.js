import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage({ onSignup }) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = window.localStorage.getItem('userId');
    if (!userId) {
      console.error('user ID is missing');
      navigate('/login');
    }
  }, [navigate]);

  const getUserDataFromLocalStorage = () => {
    const userId = window.localStorage.getItem('userId');
    const createdAt = window.localStorage.getItem('createdAt');
    const loginTime = window.localStorage.getItem('loginTime');
    return { userId, createdAt, loginTime };
  };

  const clearUserDataFromLocalStorage = () => {
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('createdAt');
    window.localStorage.removeItem('loginTime');
  };

  const handleSignup = async () => {
    const { userId, createdAt, loginTime } = getUserDataFromLocalStorage();

    if (!userId || !createdAt || !loginTime) {
      console.error('User ID or timestamps are missing');
      return;
    }

    const formData = new FormData();
    formData.append('id', userId);
    formData.append('nickname', nickname);
    formData.append('password', password);
    formData.append('createdAt', createdAt);
    formData.append('loginTime', loginTime);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:9000/api/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      clearUserDataFromLocalStorage();
      navigate('/random');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 4자리"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleSignup}>가입하기</button>
    </div>
  );
}

export default SignupPage;
