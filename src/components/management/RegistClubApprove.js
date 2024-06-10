import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function RegistClubApprove() {
  // 더미 데이터 (임의로 생성)
  const [applications, setApplications] = useState([
    { id: 1, clubType: '중앙', clubName: '예술 동아리', applicantName: '홍길동', applicantAffiliation: '예술학과', applicantID: '20230001', applicantContact: '010-1234-5678', advisorName: '김교수', advisorMajor: '미술', advisorContact: '010-9876-5432', status: '검토', rejectionReason: '' },
    { id: 2, clubType: '학과', clubName: '과학 동아리', applicantName: '이순신', applicantAffiliation: '물리학과', applicantID: '20230002', applicantContact: '010-1111-2222', advisorName: '박교수', advisorMajor: '물리학', advisorContact: '010-3333-4444', status: '검토', rejectionReason: '' },
    { id: 3, clubType: '중앙', clubName: '음악 동아리', applicantName: '심청', applicantAffiliation: '음악학과', applicantID: '20230003', applicantContact: '010-5555-6666', advisorName: '최교수', advisorMajor: '음악', advisorContact: '010-7777-8888', status: '검토', rejectionReason: '' },
  ]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [openModal, setOpenModal] = useState(false);

  // 신청 목록에서 항목을 선택하여 승인/거절을 진행할 때 실행되는 함수
  const handleAction = (application, action) => {
    if (action === 'approve') {
      // 승인 처리
      const updatedApplications = applications.map(app => {
        if (app.id === application.id) {
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
                <TableCell>{app.applicantAffiliation}</TableCell>
                <TableCell>{app.applicantID}</TableCell>
                <TableCell>{app.applicantContact}</TableCell>
                <TableCell>{app.advisorName}</TableCell>
                <TableCell>{app.advisorMajor}</TableCell>
                <TableCell>{app.advisorContact}</TableCell>
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
