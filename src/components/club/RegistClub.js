import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, FormControl, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistClub = () => {
  const dummyAdvisorList = [
    {
      name: '한성민',
      birthDate: '2000-01-01',
      code: 'P001',
      phoneNumber: '010-1234-5678',
      email: 'han@kumoh.ac.kr',
      gender: '남자',
      major: '컴소공',
      position: '교수'
    },
    {
      name: '박찬진',
      birthDate: '2000-05-22',
      code: 'P002',
      phoneNumber: '010-2345-6789',
      email: 'cjp@kumoh.ac.kr',
      gender: 'MALE',
      major: '컴공',
      position: '교수'
    },
    {
      name: '이상헌',
      birthDate: '2000-03-04',
      code: 'P003',
      phoneNumber: '010-3456-7890',
      email: 'sh@kumoh.ac.kr',
      gender: 'MALE',
      major: '능지공',
      position: '교수'
    }
  ];  

  const [clubType, setClubType] = useState('');
  const [clubName, setClubName] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantAffiliation, setApplicantAffiliation] = useState('');
  const [applicantID, setApplicantID] = useState('');
  const [applicantContact, setApplicantContact] = useState('');
  const [advisorName, setAdvisorName] = useState('');
  const [advisorMajor, setAdvisorMajor] = useState('');
  const [advisorContact, setAdvisorContact] = useState('');
  // const [advisorList, setAdvisorList] = useState([]);
  const [advisorList, setAdvisorList] = useState(dummyAdvisorList);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // 여기에 동아리 등록 정보를 처리하는 코드를 추가할 수 있습니다.
    console.log('동아리 등록 정보:', {
      clubType,
      clubName,
      applicantName,
      applicantAffiliation,
      applicantID,
      applicantContact,
      advisorName,
      advisorMajor,
      advisorContact
    });

    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + '/club/register', {
        clubType: clubType,
        name: clubName,
        requestorCode: applicantID,
        requestorName: applicantName,
        requestorMajor: applicantAffiliation,
        requestorPhoneNumber: applicantContact,
        supervisorCode: selectedAdvisor.code,
        supervisorName: selectedAdvisor.name,
        supervisorMajor: selectedAdvisor.major,
        supervisorPhoneNumber: selectedAdvisor.phoneNumber
      }, {withCredentials: true});

      console.log(res);

      if(res.status === 200) {
        navigate('/');
      }

    } catch (error) {
      console.error(error);
    }
  };

  const getProfessorList = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/member/professors');
      console.log(res);

      if(res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }


  useEffect(() => {
    const fetchProfessorList = async () => {
      const data = await getProfessorList();
      console.log(data);
      if(data) {
        setAdvisorList(data);
      }
    };

    fetchProfessorList();
  }, []);


  useEffect(() => {
    if(selectedAdvisor) {
      setAdvisorName(selectedAdvisor.name);
      setAdvisorMajor(selectedAdvisor.major);
      setAdvisorContact(selectedAdvisor.phoneNumber);
    } else {
      setAdvisorName('');
      setAdvisorMajor('');
      setAdvisorContact('');
    }
  }, [selectedAdvisor]);


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        동아리 등록 신청
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>동아리 종류</InputLabel>
        <Select
          value={clubType}
          onChange={(e) => setClubType(e.target.value)}
        >
          <MenuItem value="중앙">중앙</MenuItem>
          <MenuItem value="학과">학과</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="동아리 이름"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="신청자 이름"
        value={applicantName}
        onChange={(e) => setApplicantName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="신청자 소속"
        value={applicantAffiliation}
        onChange={(e) => setApplicantAffiliation(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="신청자 학번"
        value={applicantID}
        onChange={(e) => setApplicantID(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="신청자 연락처"
        value={applicantContact}
        onChange={(e) => setApplicantContact(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Autocomplete
        id='professor'
        freeSolo
        options={advisorList}
        getOptionLabel={(option) => `${option.name} (${option.major})`}
        onChange={(event, newValue) => setSelectedAdvisor(newValue)}
        renderInput={(params) => (
          <TextField {...params} label='지도교수' />
        )}
        sx={{marginBottom: 2}}
      />
      <TextField
        fullWidth
        disabled
        label="지도교수 이름"
        value={advisorName}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        disabled
        label="지도교수 전공"
        value={advisorMajor}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        disabled
        label="지도교수 연락처"
        value={advisorContact}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit} fullWidth>
        등록 신청
      </Button>
    </Container>
  );
}

export default RegistClub;
