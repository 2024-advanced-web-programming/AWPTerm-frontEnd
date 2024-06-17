import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { display } from '@mui/system';

const Navbar = ({ isLoggedIn, userName, onLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
            Kit 동아리
          </Typography>
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                {userName} 님 안녕하세요!
              </Typography>
              <Button color="inherit" onClick={() => navigate('/mypage')}>마이페이지</Button>
              <Button color="inherit" onClick={onLogout}>
                로그아웃
              </Button>
            </Box>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                로그인
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>회원가입</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <AppBar position="static" display="flex" color="default">
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Button color="inherit" onClick={() => navigate('/club/list')}>동아리 조회</Button>
            <Button color="inherit" onClick={() => navigate('/club/events')}>동아리 행사</Button>
            <Button color="inherit" onClick={() => navigate('/club/videos')}>동영상</Button>
            <Button color="inherit" onClick={() => navigate('/club/photos')}>사진</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
