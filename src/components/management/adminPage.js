import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminTop = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + '/admin/logout', null);
      console.log(res);

      if(res.status === 200) {
        document.cookie = 'JSESSIONID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        navigate("/admin/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <Button onClick={() => {navigate('/management/registClub')}}>동아리 등록 신청 승인/거절(관리자)</Button>
      <Button onClick={handleLogout}>로그아웃</Button>
    </div>
  );
};

export default AdminTop;
