import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegistClubStatus = () => {
  // 더미 데이터 (임의로 생성)
  const dummyData = [
    { id: 1, clubType: '중앙', clubName: '예술 동아리', applicantName: '홍길동', applicantID: '20230001', advisorName: '김교수', status: '검토', rejectString: '' },
    { id: 2, clubType: '학과', clubName: '과학 동아리', applicantName: '이순신', applicantID: '20230002', advisorName: '박교수', status: '승인', rejectString: '' },
    { id: 3, clubType: '중앙', clubName: '음악 동아리', applicantName: '심청', applicantID: '20230003', advisorName: '최교수', status: '거절', rejectString: '폭력적인 동아리는 승인하지 않습니다.' },
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

    // fetchClubStatusList();
  }, [])

  const showRejectString = (id) => {
    const club = statusList.find((row) => row.id === id);
    const rejectString = club ? club.rejectString : '사유를 찾을 수 없습니다.';
    Swal.fire({
      title: "거절 사유",
      text: rejectString,
      showCloseButton: true
    })
  }

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
            <TableCell>비고</TableCell>
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
              <TableCell>
                {row.status === '거절' ? <Button variant="contained" color="primary" onClick={() => {showRejectString(row.id)}}>거절 사유</Button> : <div></div>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RegistClubStatus;
