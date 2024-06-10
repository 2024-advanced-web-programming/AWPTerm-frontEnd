import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Top = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Hello, World!</h1>
      <Button onClick={() => {navigate('/registClub')}}>동아리 등록 신청 페이지</Button>
      <Button onClick={() => {navigate('/registClub/status')}}>동아리 등록 신청 현황 페이지</Button>
      <Button onClick={() => {navigate('/management/registClub')}}>동아리 등록 신청 승인/거절(관리자)</Button>
    </div>
  );
};

export default Top;
