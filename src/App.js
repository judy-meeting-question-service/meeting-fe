import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import QuestionListPage from './pages/QuestionListPage';
import RandomQuestionPage from './pages/RandomQuestionPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import KakaoCallback from './components/KakaoCallback';
import KakaoLogout from './components/KakaoLogout';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = window.localStorage.getItem('kakaoAccessToken');
    if (token) {
      setIsLoggedIn(true);
      const userId = window.localStorage.getItem('userId');
      if (userId) {
        axios.get(`http://localhost:9000/api/user/${userId}`)
          .then(response => {
            if (response.data.userFound) {
              navigate('/random');
            } else {
              console.log('User not found, redirecting to signup');
              navigate('/signup');
            }
          })
          .catch(error => {
            console.log('User not found, redirecting to signup');
            navigate('/signup');
          });
      }
    }
  }, [navigate]);

  const handleLogin = (userId) => {
    setIsLoggedIn(true);
    window.localStorage.setItem('userId', userId);
    axios.get(`http://localhost:9000/api/user/${userId}`)
      .then(response => {
        if (response.data.userFound) {
          navigate('/random');
        } else {
          console.log('User not found, redirecting to signup');
          navigate('/signup');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          console.log('User not found, redirecting to signup');
          navigate('/signup');
        } else {
          console.error('Error fetching user data:', error);
        }
      });
  };

  const handleLogout = () => {
    console.log('Logging out');
    setIsLoggedIn(false);
    window.localStorage.removeItem('kakaoAccessToken');
    window.localStorage.removeItem('userId');
    navigate('/');
  };

  const handleSignup = (newUser) => {
    axios.post('http://localhost:9000/api/user', newUser)
      .then(response => {
        navigate('/random');
      })
      .catch(error => {
        console.error('Signup error:', error);
      });
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="App">
      {!isAuthPage && (
        <nav>
          <div className='page'>
            <p><Link to="/">퀴즈 만들기</Link></p>
            <p><Link to="/random">랜덤 퀴즈 풀기</Link></p>
            {isLoggedIn ? (
              <KakaoLogout onLogout={handleLogout} />
            ) : (
              <Link to="/login">카카오 로그인하기</Link>
            )}
          </div>
        </nav>
      )}
      <div className="space" style={{ height: "30px" }} />
      <Routes>
        <Route path="/" element={<QuestionListPage />} />
        <Route path="/random" element={<RandomQuestionPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallback onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
      </Routes>
    </div>
  );
}

export default App;
