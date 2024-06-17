import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ClubManagement = () => {
  const { id } = useParams();
  const [clubInfo, setClubInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    history: "",
    regularMeetingTime: "",
    president: "",
    vicePresident: "",
    secretary: "",
    treasurer: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // 더미 데이터 설정
  useEffect(() => {
    setClubInfo({
      name: "테스트 동아리",
      description:
        "이 동아리는 테스트용으로 만들어진 동아리입니다. 여러 활동을 통해 다양한 경험을 제공합니다.",
      history: "2000년에 창립된 이래로 다양한 활동을 통해 많은 성과를 이루어 왔습니다.",
      regularMeetingTime: "매주 월요일 오후 7시",
      president: "김동아",
      vicePresident: "이부회",
      secretary: "박총무",
      treasurer: "정통장",
    });

    setMembers([
      { id: 1, name: "김동아", role: "President", status: "APPROVED" },
      { id: 2, name: "이부회", role: "Vice President", status: "APPROVED" },
      { id: 3, name: "박총무", role: "Secretary", status: "APPROVED" },
      { id: 4, name: "정통장", role: "Treasurer", status: "APPROVED" },
      { id: 5, name: "홍길동", role: "Member", status: "APPROVED" },
      { id: 6, name: "김철수", role: "Member", status: "APPROVED" },
    ]);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateClubInfo = async (e) => {
    e.preventDefault();
    try {
      const formDataForUpdate = new FormData();
      formDataForUpdate.append("name", formData.name);
      formDataForUpdate.append("description", formData.description);
      formDataForUpdate.append("history", formData.history);
      formDataForUpdate.append("regularMeetingTime", formData.regularMeetingTime);
      formDataForUpdate.append("president", formData.president);
      formDataForUpdate.append("vicePresident", formData.vicePresident);
      formDataForUpdate.append("secretary", formData.secretary);
      formDataForUpdate.append("treasurer", formData.treasurer);
      if (selectedFile) {
        formDataForUpdate.append("photo", selectedFile);
      }

      // axios를 사용하여 서버에 업데이트 요청을 보냅니다.
      console.log("formDataForUpdate", formDataForUpdate);

      alert("동아리 정보가 성공적으로 업데이트 되었습니다.");
    } catch (error) {
      console.error("Error updating club info:", error);
    }
  };

  if (!clubInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {clubInfo.name} 관리 페이지
      </Typography>
      <form onSubmit={handleUpdateClubInfo}>
        <div>
          <TextField
            label="동아리 이름"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div>
          <TextField
            label="소개"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
          />
        </div>
        <div>
          <TextField
            label="역사"
            name="history"
            value={formData.history}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
          />
        </div>
        <div>
          <TextField
            label="정기모임 시간"
            name="regularMeetingTime"
            value={formData.regularMeetingTime}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "1rem" }}
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel>회장</InputLabel>
            <Select
              name="president"
              value={formData.president}
              onChange={handleChange}
            >
              {members
                .filter((member) => member.role === "President")
                .map((member) => (
                  <MenuItem key={member.id} value={member.name}>
                    {member.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel>부회장</InputLabel>
            <Select
              name="vicePresident"
              value={formData.vicePresident}
              onChange={handleChange}
            >
              {members
                .filter((member) => member.role === "Vice President")
                .map((member) => (
                  <MenuItem key={member.id} value={member.name}>
                    {member.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel>총무</InputLabel>
            <Select
              name="treasurer"
              value={formData.treasurer}
              onChange={handleChange}
            >
              {members
                .filter((member) => member.role === "Treasurer")
                .map((member) => (
                  <MenuItem key={member.id} value={member.name}>
                    {member.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          정보 수정
        </Button>
      </form>
    </Container>
  );
};

export default ClubManagement;
