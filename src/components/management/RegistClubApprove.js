import React, {useEffect, useState} from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from "axios";

function RegistClubApprove() {
  // 더미 데이터 (임의로 생성)
  const dummys = [
    { id: 1, clubType: '중앙', clubName: '예술 동아리', applicantName: '홍길동', applicantMajor: '예술학과', applicantCode: '20230001', applicantPhoneNumber: '010-1234-5678', supervisorName: '김교수', supervisorMajor: '미술', supervisorPhoneNumber: '010-9876-5432', status: '검토'},
    { id: 2, clubType: '학과', clubName: '과학 동아리', applicantName: '이순신', applicantMajor: '물리학과', applicantCode: '20230002', applicantPhoneNumber: '010-1111-2222', supervisorName: '박교수', supervisorMajor: '물리학', supervisorPhoneNumber: '010-3333-4444', status: '검토'},
    { id: 3, clubType: '중앙', clubName: '음악 동아리', applicantName: '심청', applicantMajor: '음악학과', applicantCode: '20230003', applicantPhoneNumber: '010-5555-6666', supervisorName: '최교수', supervisorMajor: '음악', supervisorPhoneNumber: '010-7777-8888', status: '검토'},
  ];

  const [applications, setApplications] = useState(dummys);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/club/register/list");
        console.log(res);
        setApplications(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchClubs();
  }, [])

  const updateStatus = async (application, status, rejectedReason) => {
    try {
      console.log(application.id)
      const res = await axios.put(process.env.REACT_APP_SERVER_URL + "/club/updateStatus", {
        clubId: application.id,
        status: status,
        rejectedReason: rejectedReason
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  // 신청 목록에서 항목을 선택하여 승인/거절을 진행할 때 실행되는 함수
  const handleAction = (application, action) => {
    if (action === 'approve') {
      // 승인 처리
      const updatedApplications = applications.map(app => {
        if (app.id === application.id) {
          updateStatus(application, "승인", '')
          //TODO 아래의 status 변경이 통신에 성공했을 때만 적용되도록 수정
          return { ...app, status: '승인' };
        } else {
          return app;
        }
      });
      setApplications(updatedApplications);
    } else if (action === 'reject') {
      // 거절 처리
      setSelectedApplication(application);
      setOpenModal(true);
    }
  };

  // 거절 사유 입력 모달에서 거절 처리할 때 실행되는 함수
  const handleReject = () => {
    const updatedApplications = applications.map(app => {
      if (app.id === selectedApplication.id) {
        updateStatus(selectedApplication, "거절", rejectionReason)
        //TODO 아래의 status 변경이 통신에 성공했을 때만 적용되도록 수정
        return { ...app, status: '거절', rejectionReason };
      } else {
        return app;
      }
    });
    setApplications(updatedApplications);
    setOpenModal(false);
    setRejectionReason('');
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>동아리 종류</TableCell>
              <TableCell>동아리 이름</TableCell>
              <TableCell>신청자 이름</TableCell>
              <TableCell>신청자 소속</TableCell>
              <TableCell>신청자 학번</TableCell>
              <TableCell>신청자 연락처</TableCell>
              <TableCell>지도교수 이름</TableCell>
              <TableCell>지도교수 전공</TableCell>
              <TableCell>지도교수 연락처</TableCell>
              <TableCell>신청 현황</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.clubType}</TableCell>
                <TableCell>{app.clubName}</TableCell>
                <TableCell>{app.applicantName}</TableCell>
                <TableCell>{app.applicantMajor}</TableCell>
                <TableCell>{app.applicantCode}</TableCell>
                <TableCell>{app.applicantPhoneNumber}</TableCell>
                <TableCell>{app.supervisorName}</TableCell>
                <TableCell>{app.supervisorMajor}</TableCell>
                <TableCell>{app.supervisorPhoneNumber}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>
                  {app.status === '검토' && (
                    <>
                      <Button variant="contained" onClick={() => handleAction(app, 'approve')}>승인</Button>
                      <Button variant="contained" onClick={() => handleAction(app, 'reject')}>거절</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* 거절 사유 입력 모달 */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 2 }}>
          <Typography variant="h6" id="modal-title" gutterBottom>
            거절 사유 입력
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="거절 사유"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
          <Button variant="contained" onClick={handleReject}>확인</Button>
        </Paper>
      </Modal>
    </div>
  );
}

export default RegistClubApprove;
