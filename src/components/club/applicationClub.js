import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Input = styled("input")({
  display: "none",
});

const ApplicationClub = () => {
  const { id } = useParams(); // URL에서 동아리 ID를 가져옴
  const [clubs, setClubs] = useState({});
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 백엔드 API에서 동아리 정보와 사용자 정보를 가져옴
    const fetchData = async () => {
      try {
        const clubResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/club/${id}`);
        setClubs(clubResponse.data);

        const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/member/me`);
        setUser(userResponse.data);
      } catch (error) {
        console.error("데이터를 가져오는 동안 오류가 발생했습니다:", error);

        setClubs({id: 1, name: "테스트 동아리"});
        setUser({id: "aa", name: "김", major: "컴소공", number: "111"})

      }
    };

    fetchData();
  }, [id]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("club", clubs.id); // clubs에서 선택된 동아리의 id 사용
    formData.append("file", file);

    try {
      await axios.post("/api/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("신청이 성공적으로 제출되었습니다.");
    } catch (error) {
      console.error("신청 제출 중 오류가 발생했습니다:", error);
      alert("신청 제출에 실패했습니다.");
    }
  };

  if (!clubs || !user) {
    return <Typography variant="body1">로딩 중...</Typography>;
  }

  const handleDownload = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/file/download/${clubs.fileId}`, {
        responseType: 'blob'
      });
      console.log(res);

      if(res.status === 200) {
        const fileBinary = res.data;
        const blob = new Blob([fileBinary], { type: 'application/octet-stream' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${clubs.name}가입신청서.txt`; // TODO : 파일 이름 변경
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
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {clubs.name} 가입 신청
      </Typography>

      <Button variant="contained" component="span" sx={{ marginBottom: '10px' }} onClick={handleDownload}>
        지원서 다운로드
      </Button>

      <form onSubmit={handleSubmit}>
        <TextField
          label="가입 동아리"
          variant="outlined"
          value={clubs.name}
          fullWidth
          InputProps={{ readOnly: true }}
          margin="normal"
          required
        />
        <TextField
          label="이름"
          variant="outlined"
          value={user.name}
          fullWidth
          InputProps={{ readOnly: true }}
          margin="normal"
          required
        />
        <TextField
          label="전공"
          variant="outlined"
          value={user.major}
          fullWidth
          InputProps={{ readOnly: true }}
          margin="normal"
          required
        />
        <TextField
          label="학번"
          variant="outlined"
          value={user.code}
          fullWidth
          InputProps={{ readOnly: true }}
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
          <label htmlFor="file-input">
            <Input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              required
            />
            <Button variant="contained" component="span">
              지원서 첨부
            </Button>
            {file && (
              <Typography variant="body2" style={{ marginTop: "8px" }}>
                {file.name}
              </Typography>
            )}
          </label>
        </FormControl>

        <Box textAlign="center" marginTop={2}>
          <Button type="submit" variant="contained" color="primary">
            신청하기
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ApplicationClub;
