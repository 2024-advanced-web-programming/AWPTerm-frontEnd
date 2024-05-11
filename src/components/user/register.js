import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    name: '',
    birthDate: '',
    gender: '',
    major: '',
    code: '',
    phoneNumber: '',
    email: '',
    position: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + 'register', formData);
      console.log('회원가입 성공:', res.data);
      // 여기에서 회원가입이 성공했을 때 할 작업 추가
    } catch (error) {
      console.error('회원가입 실패:', error);
      // 여기에서 회원가입이 실패했을 때 할 작업 추가
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center">회원가입</Typography>
      <form style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
        <TextField
          label="아이디"
          name="id"
          variant="outlined"
          value={formData.id}
          onChange={handleChange}
          required
        />
        <TextField
          label="비밀번호"
          type="password"
          name="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="이름"
          name="name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="생년월일"
          type="date"
          name="birthDate"
          variant="outlined"
          value={formData.birthDate}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
        <FormControl variant="outlined">
          <InputLabel>성별</InputLabel>
          <Select
            label="성별"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <MenuItem value="남자">남자</MenuItem>
            <MenuItem value="여자">여자</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel>학과</InputLabel>
          <Select
            label="학과"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
          >
            <MenuItem value="컴퓨터소프트웨어공학과">컴퓨터소프트웨어공학과</MenuItem>
            <MenuItem value="컴퓨터공학과">컴퓨터공학과</MenuItem>
            <MenuItem value="인공지능공학과">능동지능공학과</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="식별번호"
          name="code"
          variant="outlined"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <TextField
          label="전화번호"
          name="phoneNumber"
          variant="outlined"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <TextField
          label="이메일"
          type="email"
          name="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormControl variant="outlined">
          <InputLabel>직급</InputLabel>
          <Select
            label="직급"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          >
            <MenuItem value="교수">교수</MenuItem>
            <MenuItem value="학생">학생</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">회원가입</Button>
      </form>
    </Container>
  );
};

export default Register;
