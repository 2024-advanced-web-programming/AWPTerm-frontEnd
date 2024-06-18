import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/member/me');

      console.log(res);

      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data.name; // 서버로부터 사용자 이름을 가져옴
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + '/member/login', {
            id: username,
            password: password
        });
        
        if (res.status === 200) {
          onLogin(await checkLoginStatus()); // 로그인 상태 업데이트
          navigate("/");
        }
    } catch (error) {
        console.log("fail", error);
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center">로그인</Typography>
      <form style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
        <TextField
          label="사용자명"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">로그인</Button>
        <Button variant="contained" color="primary" onClick={handleKakaoLogin}>카카오 로그인</Button>
        <Button variant="contained" color="primary" onClick={() => {navigate('/register')}}>회원가입</Button>
      </form>
    </Container>
  );
};

export default Login;
