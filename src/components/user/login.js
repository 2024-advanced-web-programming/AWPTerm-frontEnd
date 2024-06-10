import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        console.log(username);
        console.log(password);

        const res = await axios.post(process.env.REACT_APP_SERVER_URL + '/member/login', {
            id: username,
            password: password
        });

        console.log("success", res.data);
        
        if(res.status === 200) {
          navigate("/");
        }

    } catch (error) {
        console.log("fail", error);
    }
  };

  const handleKakaoLogin = async () => {
    console.log("카카오 로그인");    

    window.location.href = kakaoURL;
  }

//   const getCode = async() => {
    

//     const code = new URL(window.location.href).searchParams.get("code");
//     const id = new URL(window.location.href).searchParams.get("id");
//     const password = new URL(window.location.href).searchParams.get("password");

//     console.log("code", code);
//     console.log("id", id);
//     console.log("pw", password);
//   }

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
