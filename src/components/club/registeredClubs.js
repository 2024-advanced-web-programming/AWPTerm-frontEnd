import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import axios from "axios";

const RegisteredClubs = () => {
  const [clubData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
        try {
            const data = await axios.get(process.env.REACT_APP_SERVER_URL + "/club/list/me");
            console.log(data)
            setData(data.data);
        } catch (error) {
            console.error(error);
            setData([{id: 1, name: "테스트 1", role: "회장"},
                {id: 2, name: "테스트 2", role: "부회장"},
                {id: 3, name: "테스트 3", role: "회원"}
            ])
        }
    }

    fetchData();
  }, [])

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        가입된 동아리 목록
      </Typography>
      <Grid container spacing={2}>
        {clubData.map((club) => (
          <Grid item key={club.id} xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {club.name}
              </Typography>
              <Typography variant="body1">
                {club.role}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RegisteredClubs;
