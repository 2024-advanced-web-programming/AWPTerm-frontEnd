import { Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();

        try {
            console.log(username);
            console.log(password);
    
            const res = await axios.post(process.env.REACT_APP_SERVER_URL + '/admin/login', {
                id: username,
                pw: password
            });
    
            console.log("success", res.data);
            
            if(res.status === 200) {
              localStorage.setItem("user", {id: "admin"});
              onLogin("adminLoggedIn");
              navigate('/admin/main', { replace: true });
            }
    
        } catch (error) {
            console.log("fail", error);
        }
    }

    return(
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
      </form>
    </Container>
    )
};

export default AdminLogin;