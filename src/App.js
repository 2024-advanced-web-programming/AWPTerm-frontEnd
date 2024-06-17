import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Top from './components/main/top';
import Login from './components/user/login';
import Register from './components/user/register';
import KakaoLoginHandler from './components/handler/kakaoLoginHandler';
import RegistClub from './components/club/RegistClub';
import RegistClubStatus from './components/club/RegistClubStatus';
import RegistClubApprove from './components/management/RegistClubApprove';
import AdminLogin from './components/management/adminLogin';
import ApplicationClub from './components/club/applicationClub';
import Navbar from './components/nav/navBar';
import axios from 'axios';
import ApplicationStatus from './components/club/applicationStatus';
import ClubApplicationManagement from './components/clubMaster/clubApplicationManagement';
import ClubManagement from './components/clubMaster/clubManagement';
import ClubPage from './components/club/clubPage';
import Editor from './components/editor/editor';
import ClubList from './components/main/clubList';
import ClubEvents from './components/main/clubEvents';
import ClubPhotos from './components/main/clubPhotos';
import ClubVideos from './components/main/clubVideos';
import ClubRecruit from './components/main/clubRecruit';
import MyPage from './components/user/myPage';
import ContentPage from './components/main/contentPage';
import AdminMain from './components/main/adminMain';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  // const navigate = useNavigate();

  const checkCookie = (cookieName) => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(`${cookieName}=`)) {
        return true;
      }
    }
    return false;
  };

  const checkLoginStatus = async () => {
    console.log('check');
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/member/me');
      if (res.status === 200) {
        setIsLoggedIn(true);
        setUserName(res.data); // 서버로부터 사용자 이름을 가져옴
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (checkCookie('JSESSIONID') && !isAdminLoggedIn) {
      checkLoginStatus();
    }
  }, []);

  const handleLogout = async (isSuccess) => {
    if(isSuccess) {
      setIsLoggedIn(false);
      setIsAdminLoggedIn(false);
      setUserName('');
    }
  };

  const handleLogin = (userName) => {
    console.log(userName);
    setIsLoggedIn(true);
    if(userName === "adminLoggedIn") {
      setUserName("admin");
      setIsAdminLoggedIn(true);
    } else {
      setUserName(userName);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} isAdminLoggedIn={isAdminLoggedIn} />
        <div className="Body">
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/admin/main" element={<AdminMain />} />

            <Route path="/mypage" element={<MyPage />} />

            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/member/kakao/callback" element={<KakaoLoginHandler onLogin={handleLogin} />} />

            <Route path="/club/regist" element={<RegistClub />} />
            <Route path="/club/regist/status" element={<RegistClubStatus />} />
            <Route path="/management/registClub" element={<RegistClubApprove />} />

            <Route path="/club/list" element={<ClubList />} />
            <Route path="/club/events" element={<ClubEvents />} />
            <Route path="/club/photos" element={<ClubPhotos />} />
            <Route path="/club/videos" element={<ClubVideos />} />
            <Route path="/club/recruit" element={<ClubRecruit />} />

            <Route path="/club/application/:id" element={<ApplicationClub />} />
            <Route path="/club/application/status" element={<ApplicationStatus />} />
            {/* <Route path="/club/application/master" element={<ClubApplicationManagement />} /> */}

            <Route path="/club/config/:id" element={<ClubManagement />} />
            {/* <Route path="/club/:id" element={<ClubPage />} /> */}

            <Route path="/editor/:id" element={<Editor />} />

            <Route path="/post/:id" element={<ContentPage />} />
            {/* 다른 라우팅 경로에 대한 Route 추가 */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
