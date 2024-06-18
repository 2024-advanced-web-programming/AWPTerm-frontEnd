import { Button, Divider, MenuItem, Select } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const [clubList, setClubList] = useState([]);
    const [selectedClub, setSelectedClub] = useState(null);

    useEffect(() => {
        const fetchClub = async () => {
            try {
                const data = await axios.get(process.env.REACT_APP_SERVER_URL + "/member/president/clubs");
                console.log(data.data)
                setClubList(data.data);
            } catch (error) {
                console.error(error);
                setClubList([
                    { id: 1, name: "독서 동아리" },
                    { id: 2, name: "배드민턴 동아리" },
                    { id: 3, name: "댄스 동아리" },
                  ])
            }
        }

        fetchClub();
    }, [])
    return(
        <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
        <Button variant="contained" color="primary" onClick={() => {navigate('/club/application/status')}} style={{ marginRight: "1rem" }}>
            내 가입 신청
        </Button>
        <Button variant="contained" color="primary" onClick={() => {navigate('/club/regist/status')}}>
            내 동아리 등록 신청
        </Button>
        <Divider sx={{margin: '10px 0 10px 0'}}></Divider>
        <Button variant="contained" color="primary" onClick={() => {navigate('/club/regist')}}>
            동아리 등록
        </Button>
        <Divider sx={{margin: '10px 0 10px 0'}}></Divider>
        <Select
        value={selectedClub}
        onChange={(e) => setSelectedClub(e.target.value)}
        displayEmpty
        fullWidth
        variant="outlined"
        margin="normal"
        style={{ marginTop: "1rem" }}
      >
        <MenuItem value={null} disabled>
          동아리 선택
        </MenuItem>
        {clubList.map((club) => (
          <MenuItem key={club.id} value={club}>
            {club.name}
          </MenuItem>
        ))}
      </Select>
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/club/config/${selectedClub?.id}`)}
        style={{ marginTop: "1rem" }}
        disabled={!selectedClub}
      >
        동아리 관리
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/editor/${selectedClub?.id}`)}
        style={{ marginTop: "1rem" }}
        disabled={!selectedClub}
      >
        동아리에 게시글 작성
      </Button>
      </div>
    </Container>
    );
}

export default MyPage;