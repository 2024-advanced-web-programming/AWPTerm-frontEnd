import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const ClubApplicationManagement = (id) => {
    const [membershipApplications, setMembershipApplications] = useState([
        { applicantId: 1, applicantName: "홍길동", applicantCode: "20230001", applicantMajor: "컴퓨터공학과", applicationFormId: "/forms/1", applicationFormName: "가입신청서1" },
        { applicantId: 2, applicantName: "이순신", applicantCode: "20230002", applicantMajor: "전자공학과", applicationFormId: "/forms/2", applicationFormName: "가입신청서2" },
        { applicantId: 3, applicantName: "김유신", applicantCode: "20230003", applicantMajor: "경영학과", applicationFormId: "/forms/3", applicationFormName: "가입신청서3" },
        { applicantId: 4, applicantName: "윤봉길", applicantCode: "20230004", applicantMajor: "생명과학과", applicationFormId: "/forms/4", applicationFormName: "가입신청서4" },
        { applicantId: 5, applicantName: "강감찬", applicantCode: "20230005", applicantMajor: "심리학과", applicationFormId: "/forms/5", applicationFormName: "가입신청서5" },
        ]);
  const [selectedApplications, setSelectedApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_SERVER_URL + `/club/application/list/${id.id}`);
            console.log(data)
            setMembershipApplications(data.data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
  }, [])

  const handleDownloadForm = async (fileName, fileId) => {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/file/download/${fileId}`, {
        responseType: 'blob'
      });
      console.log(res);

      if(res.status === 200) {
        const fileBinary = res.data;
        const blob = new Blob([fileBinary], { type: 'application/octet-stream' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}`; // TODO : 파일 이름 변경
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "에러!",
        html: `서버와의 통신에 문제가 생겼어요!<br>잠시 후, 다시 한 번 시도해주세요!`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const sendApplicationDecision = async (action, memberId) => {
    const data = {
      clubId : id.id,
      memberId: memberId,
      isApproval: action
    }

    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/club/application/decision", data);

      if(res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "처리 완료",
          html: `정상적으로 가입 신청을 처리했어요!`,
          showConfirmButton: false,
          timer: 1500
        }).then((res) => {
          window.location.reload();
        });
        return true;
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "에러!",
        html: `서버와의 통신에 문제가 생겼어요!<br>잠시 후, 다시 한 번 시도해주세요!`,
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
  } 

  const handleBulkAction = async (action) => {
    const isApproval = action === "approve";

    try {
      for (const applicantId of selectedApplications) {
        const res = await sendApplicationDecision(isApproval, applicantId);
        if(res === false) {
          throw new Error('에러 발생!');
        }
      }
      Swal.fire({
        icon: "success",
        title: "처리 완료",
        html: `정상적으로 가입 신청을 ${isApproval ? "승인" : "거절"}했어요!`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setSelectedApplications([]);
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "에러!",
        html: `가입 신청을 처리하던 도중, 에러가 생겼어요.<br>아직 처리하지 못한 항목을 한번 더 확인해주세요.`,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        setSelectedApplications([]);
        window.location.reload();
      });
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = membershipApplications.map((app) => app.applicantId);
      setSelectedApplications(allIds);
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (appId) => {
    const selectedIndex = selectedApplications.indexOf(appId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedApplications, appId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedApplications.slice(1));
    } else if (selectedIndex === selectedApplications.length - 1) {
      newSelected = newSelected.concat(selectedApplications.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedApplications.slice(0, selectedIndex),
        selectedApplications.slice(selectedIndex + 1)
      );
    }

    setSelectedApplications(newSelected);
  };

  return (
    <div>
        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom sx={{margin: "10px 0px -10px 20px"}}>
        동아리 가입 신청 관리
      </Typography>
        </div> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={selectedApplications.length > 0 && selectedApplications.length < membershipApplications.length}
                  checked={selectedApplications.length === membershipApplications.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>이름</TableCell>
              <TableCell>학번</TableCell>
              <TableCell>소속</TableCell>
              <TableCell>비고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {membershipApplications.map((application) => (
              <TableRow key={application.applicantId}>
                <TableCell>
                  <Checkbox
                    checked={selectedApplications.includes(application.applicantId)}
                    onChange={() => handleSelectApplication(application.applicantId)}
                  />
                </TableCell>
                <TableCell>{application.applicantName}</TableCell>
                <TableCell>{application.applicantCode}</TableCell>
                <TableCell>{application.applicantMajor}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleDownloadForm(application.applicationFormName, application.applicationFormId)}>
                    가입신청서 다운로드
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "20px" }}>
        <Button
          variant="outlined"
          disabled={selectedApplications.length === 0}
          onClick={() => handleBulkAction("approve")}
          style={{ marginRight: "10px" }}
        >
          선택 항목 승인
        </Button>
        <Button
          variant="outlined"
          disabled={selectedApplications.length === 0}
          onClick={() => handleBulkAction("reject")}
        >
          선택 항목 거절
        </Button>
      </div>
    </div>
  );
};

export default ClubApplicationManagement;
