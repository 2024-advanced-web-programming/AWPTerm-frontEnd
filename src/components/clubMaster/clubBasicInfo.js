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
import Swal from "sweetalert2";
import { checkFileSize } from "../commons/checkValidation";

const ClubBasicInfo = ({ id }) => {
  const [clubName, setClubName] = useState("넹면");
  const [introduction, setIntroduction] = useState("냉면 먹고싶은 동아리에요");
  const [regularMeetingTime, setRegularMeetingTime] = useState("매주 화요일 6시");
  const [president, setPresident] = useState(null);
  const [vicePresident, setVicePresident] = useState(null);
  const [treasurer, setTreasurer] = useState(null);
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
      if (presidentMember) setPresident(presidentMember);
      const vicePresidentMember = members.find((member) => member.role === "부회장");
      if (vicePresidentMember) setVicePresident(vicePresidentMember);
      const treasurerMember = members.find((member) => member.role === "총무");
      if (treasurerMember) setTreasurer(treasurerMember);
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
      if (presidentMember) setPresident(presidentMember);
      const vicePresidentMember = members.find((member) => member.role === "부회장");
      if (vicePresidentMember) setVicePresident(vicePresidentMember);
      const treasurerMember = members.find((member) => member.role === "총무");
      if (treasurerMember) setTreasurer(treasurerMember);
    }
  }, [isMembersSet, members]);

  const handleApplicationFileChange = (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];

    if(!file) {
      return;
    }

    if(!checkFileSize(file)) {
      fileInput.value = "";
      return;
    }

    setSelectedApplicationFile(file);
  };

  const handlePhotoFileChange = (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];

    if(!file) {
      return;
    }

    // 이미지 파일인지 확인
    if (file && file.type.startsWith("image")) {
      if(!checkFileSize(file)) {
        fileInput.value = "";
        setSelectedPhotoFile(null);
        return;
      }

      setSelectedPhotoFile(file);
    } else {
      fileInput.value = "";
      setSelectedPhotoFile(null);
      Swal.fire({
        title: "이미지 파일만 선택할 수 있어요!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("clubName", clubName);
    formData.append("introduction", introduction);
    formData.append("regularMeetingTime", regularMeetingTime);
    formData.append("presidentId", president.id);
    formData.append("vicePresidentId", vicePresident ? vicePresident.id : null);
    formData.append("secretaryId", treasurer ? treasurer.id : null);
    if (selectedApplicationFile) {
      formData.append("applicationForm", selectedApplicationFile);
    }
    if (selectedPhotoFile) {
      formData.append("clubPhoto", selectedPhotoFile);
    }

    console.log(introduction)
    console.log(regularMeetingTime)
    console.log(selectedPhotoFile)

    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/club/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("동아리 정보 업데이트 결과:", response.data);
      Swal.fire({
        title: "수정 성공",
        text: "성공적으로 수정했어요!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      }).then((res) => {
        window.location.reload();
      })
    } catch (error) {
      console.error("동아리 정보 업데이트 중 오류 발생:", error);
      Swal.fire({
        title: "서버와의 통신에 문제가 생겼어요!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });
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
                <MenuItem key={member.id} value={member}>
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
                <MenuItem key={member.id} value={member}>
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
                <MenuItem key={member.id} value={member}>
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
