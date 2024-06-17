import { Button, Divider, MenuItem, Select } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMain = () => {
    const navigate = useNavigate();

    return(
        <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
            <Button variant="contained" color="primary" onClick={() => {navigate('/management/registClub')}} style={{ marginRight: "1rem" }}>
                동아리 등록 승인/거절
            </Button>
        </Container>
    );
}

export default AdminMain;