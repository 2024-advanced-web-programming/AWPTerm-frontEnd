import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const RegistClubStatus = () => {
  // 더미 데이터 (임의로 생성)
  const dummyData = [
    { id: 1, clubType: '중앙', clubName: '예술 동아리', applicantName: '홍길동', applicantID: '20230001', advisorName: '김교수', status: '검토', rejectString: '' },
    { id: 2, clubType: '학과', clubName: '과학 동아리', applicantName: '이순신', applicantID: '20230002', advisorName: '박교수', status: '승인', rejectString: '' },
    { id: 3, clubType: '중앙', clubName: '음악 동아리', applicantName: '심청', applicantID: '20230003', advisorName: '최교수', status: '거절', rejectString: '폭력적인 동아리는 승인하지 않습니다.' },
  ];

  const [statusList, setStatusList] = useState(dummyData);
  const [me, setMe] = useState({id: 1, name: "dummy", code: "1234"});
  const navigate = useNavigate();

  const getclubList = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/member/registered/clubs');

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

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/member/me');
        if(res.status === 200) {
          setMe(res.data);
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "서버와의 통신에 문제가 생겼어요!",
          icon: "error",
          showConfirmButton: false
        }).then((res) => {
          navigate('/');
        })
      }
    };

    fetchMyInfo();
    console.log(me);
  }, []);

  //TODO 신청자 이름, 신청자 학번은 /member/me에서 받아온 정보 props로 넘겨서 할당시키면 될듯
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
              <TableCell>{row.name}</TableCell>
              <TableCell>{me.name}</TableCell>
              <TableCell>{me.code}</TableCell>
              <TableCell>{row.supervisorName}</TableCell>
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
