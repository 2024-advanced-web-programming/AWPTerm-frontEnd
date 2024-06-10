import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Top = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + '/member/logout', null);
      console.log(res);

      if(res.status === 200) {
        document.cookie = 'JSESSIONID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <Button onClick={() => {navigate('/registClub')}}>동아리 등록 신청 페이지</Button>
      <Button onClick={() => {navigate('/registClub/status')}}>동아리 등록 신청 현황 페이지</Button>
      <Button onClick={() => {navigate('/management/registClub')}}>동아리 등록 신청 승인/거절(관리자)</Button>
      <Button onClick={handleLogout}>로그아웃</Button>
    </div>
  );
};

export default Top;
