import { Button, Divider } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();

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
    </Container>
    );
}

export default MyPage;