import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const RegistClubStatus = () => {
  // 더미 데이터 (임의로 생성)
  const dummyData = [
    { id: 1, clubType: '중앙', clubName: '예술 동아리', applicantName: '홍길동', applicantID: '20230001', advisorName: '김교수', status: '검토' },
    { id: 2, clubType: '학과', clubName: '과학 동아리', applicantName: '이순신', applicantID: '20230002', advisorName: '박교수', status: '승인' },
    { id: 3, clubType: '중앙', clubName: '음악 동아리', applicantName: '심청', applicantID: '20230003', advisorName: '최교수', status: '거절' },
  ];

  const [statusList, setStatusList] = useState(dummyData);


  // TODO : 통신 제대로 구현 -> 백엔드 컨트롤러 코드 없음
  const getclubList = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/member/applied/clubs');

      console.log(res);

      if(res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    const fetchClubStatusList = async () => {
      const data = await getclubList();
      if(data) {
        setStatusList(data);
      }
    }

    fetchClubStatusList();
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>동아리 종류</TableCell>
            <TableCell>동아리 이름</TableCell>
            <TableCell>신청자 이름</TableCell>
            <TableCell>신청자 학번</TableCell>
            <TableCell>지도교수 이름</TableCell>
            <TableCell>동아리 신청 현황</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statusList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.clubType}</TableCell>
              <TableCell>{row.clubName}</TableCell>
              <TableCell>{row.applicantName}</TableCell>
              <TableCell>{row.applicantID}</TableCell>
              <TableCell>{row.advisorName}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RegistClubStatus;
