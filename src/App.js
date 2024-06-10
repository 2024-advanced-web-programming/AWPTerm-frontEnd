import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import NavBar from './components/nav/navBar';
import Top from './components/main/top';
import Login from './components/user/login';
import Register from './components/user/register';
import KakaoLoginHandeler from './components/handler/kakaoLoginHandler';
import RegistClub from './components/club/RegistClub';
import RegistClubStatus from './components/club/RegistClubStatus';
import RegistClubApprove from './components/management/RegistClubApprove';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/member/kakao/callback" element={<KakaoLoginHandeler />} />
          <Route path="/registClub" element={<RegistClub />} />
          <Route path="/registClub/status" element={<RegistClubStatus />} />
          <Route path="/management/registClub" element={<RegistClubApprove />} />
          {/* 다른 라우팅 경로에 대한 Route 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
