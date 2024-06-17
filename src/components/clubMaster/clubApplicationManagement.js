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

const ClubApplicationManagement = (id) => {
    const [membershipApplications, setMembershipApplications] = useState([
        { id: 1, name: "홍길동", studentId: "20230001", affiliation: "컴퓨터공학과", formUrl: "/forms/1" },
        { id: 2, name: "이순신", studentId: "20230002", affiliation: "전자공학과", formUrl: "/forms/2" },
        { id: 3, name: "김유신", studentId: "20230003", affiliation: "경영학과", formUrl: "/forms/3" },
        { id: 4, name: "윤봉길", studentId: "20230004", affiliation: "생명과학과", formUrl: "/forms/4" },
        { id: 5, name: "강감찬", studentId: "20230005", affiliation: "심리학과", formUrl: "/forms/5" },
        ]);
  const [selectedApplications, setSelectedApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_SERVER_URL + "");
            setMembershipApplications(data.data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
  }, [])

  const handleDownloadForm = (formUrl) => {
    console.log("다운로드 URL:", formUrl);
    // window.open(formUrl, "_blank");
  };

  const handleBulkAction = (action) => {
    if (action === "approve") {
      console.log("다건 승인:", selectedApplications);
    } else if (action === "reject") {
      console.log("다건 거절:", selectedApplications);
    }
    setSelectedApplications([]);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = membershipApplications.map((app) => app.id);
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
              <TableCell>동작</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {membershipApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedApplications.includes(application.id)}
                    onChange={() => handleSelectApplication(application.id)}
                  />
                </TableCell>
                <TableCell>{application.name}</TableCell>
                <TableCell>{application.studentId}</TableCell>
                <TableCell>{application.affiliation}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleDownloadForm(application.formUrl)}>
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
