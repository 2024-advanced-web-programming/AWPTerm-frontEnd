import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";

const ClubBasicInfo = ({ id }) => {
  const [clubName, setClubName] = useState("넹면");
  const [introduction, setIntroduction] = useState("냉면 먹고싶은 동아리에요");
  const [regularMeetingTime, setRegularMeetingTime] = useState("매주 화요일 6시");
  const [president, setPresident] = useState("");
  const [vicePresident, setVicePresident] = useState("");
  const [treasurer, setTreasurer] = useState("");
  const [members, setMembers] = useState([
    { id: 1, name: "한성민", role: "회장", status: "승인" },
    { id: 2, name: "박찬진", role: "부회장", status: "승인" },
    { id: 3, name: "이상헌", role: "총무", status: "승인" },
    { id: 4, name: "정통장", role: "회원", status: "승인" },
    { id: 5, name: "홍길동", role: "회원", status: "승인" },
    { id: 6, name: "김철수", role: "회원", status: "승인" },
  ]);
  const [selectedApplicationFile, setSelectedApplicationFile] = useState(null); // 가입 신청서 파일
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null); // 대표 사진 파일

  const [isMembersSet, setIsMembersSet] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/club/${id}`);
      console.log(res);
      setMembers(res.data.members);
      setClubName(res.data.name);
      setIntroduction(res.data.introduction ? res.data.introduction : "");
      setRegularMeetingTime(res.data.regularMeetingTime ? res.data.regularMeetingTime : "");
      setIsMembersSet(true);
    } catch (error) {
      console.error("동아리 정보를 가져오는 중 오류 발생:", error);

      const presidentMember = members.find((member) => member.role === "회장");
      if (presidentMember) setPresident(presidentMember.name);
      const vicePresidentMember = members.find((member) => member.role === "부회장");
      if (vicePresidentMember) setVicePresident(vicePresidentMember.name);
      const treasurerMember = members.find((member) => member.role === "총무");
      if (treasurerMember) setTreasurer(treasurerMember.name);
    }
  };

  useEffect(() => {
    const setData = async () => {
      await fetchData();
    };

    setData();
  }, []);

  useEffect(() => {
    if (isMembersSet) {
      console.log(members);
      // 회장, 부회장, 총무 기본 값 설정
      const presidentMember = members.find((member) => member.role === "회장");
      if (presidentMember) setPresident(presidentMember.name);
      const vicePresidentMember = members.find((member) => member.role === "부회장");
      if (vicePresidentMember) setVicePresident(vicePresidentMember.name);
      const treasurerMember = members.find((member) => member.role === "총무");
      if (treasurerMember) setTreasurer(treasurerMember.name);
    }
  }, [isMembersSet, members]);

  const handleApplicationFileChange = (e) => {
    setSelectedApplicationFile(e.target.files[0]);
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files[0];
    // 이미지 파일인지 확인
    if (file && file.type.startsWith("image")) {
      setSelectedPhotoFile(file);
    } else {
      setSelectedPhotoFile(null);
      alert("이미지 파일만 선택 가능합니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("clubName", clubName);
    formData.append("introduction", introduction);
    formData.append("regularMeetingTime", regularMeetingTime);
    formData.append("presidentId", president.id);
    formData.append("vicePresidentId", vicePresident.id ? vicePresident.id : null);
    formData.append("secretaryId", treasurer.id ? treasurer.id : null);
    if (selectedApplicationFile) {
      formData.append("applicationForm", selectedApplicationFile);
    }
    if (selectedPhotoFile) {
      formData.append("clubPhoto", selectedPhotoFile);
    }

    console.log(treasurer.id ? treasurer.id : null);
    console.log(vicePresident.id ? vicePresident.id : null);

    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/club/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("동아리 정보 업데이트 결과:", response.data);
      alert("동아리 기본 정보가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("동아리 정보 업데이트 중 오류 발생:", error);
      alert("동아리 기본 정보 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="동아리 이름"
          variant="outlined"
          fullWidth
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="소개"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="정기모임 시간"
          variant="outlined"
          fullWidth
          value={regularMeetingTime}
          onChange={(e) => setRegularMeetingTime(e.target.value)}
          margin="normal"
        />
        <Box sx={{ marginTop: "1rem", display: "flex", alignItems: "center" }}>
          <InputLabel sx={{ marginRight: "1rem" }}>가입 신청서</InputLabel>
          <input type="file" accept="*/*" onChange={handleApplicationFileChange} />
        </Box>
        <Box sx={{ marginTop: "1rem", display: "flex", alignItems: "center" }}>
          <InputLabel sx={{ marginRight: "1rem" }}>대표 사진 (이미지 파일)</InputLabel>
          <input type="file" accept="image/*" onChange={handlePhotoFileChange} />
        </Box>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>회장</InputLabel>
          <Select value={president} onChange={(e) => setPresident(e.target.value)} label="회장" required>
            {members
              .map((member) => (
                <MenuItem key={member.id} value={member.name}>
                  {member.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>부회장</InputLabel>
          <Select value={vicePresident} onChange={(e) => setVicePresident(e.target.value)} label="부회장">
            <MenuItem key={-1} value={""}>
                  미선택
            </MenuItem>
            {members
              .map((member) => (
                <MenuItem key={member.id} value={member.name}>
                  {member.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>총무</InputLabel>
          <Select value={treasurer} onChange={(e) => setTreasurer(e.target.value)} label="총무">
          <MenuItem key={-1} value={""}>
                  미선택
            </MenuItem>
            {members
              .map((member) => (
                <MenuItem key={member.id} value={member.name}>
                  {member.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "1rem" }}>
          정보 수정
        </Button>
      </form>
    </Box>
  );
};

export default ClubBasicInfo;
