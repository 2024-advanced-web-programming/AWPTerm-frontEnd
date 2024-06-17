import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import axios from "axios";

const ApplicationStatus = () => {
  const [clubData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
        try {
            const data = await axios.get(process.env.REACT_APP_SERVER_URL + "");

            setData(data.data);
        } catch (error) {
            console.error(error);
            setData([{id: 1, name: "테스트 1", approved: true},
                {id: 2, name: "테스트 2", approved: false},
                {id: 3, name: "테스트 3", approved: true}
            ])
        }
    }

    fetchData();
  }, [])

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        가입 신청 현황
      </Typography>
      <Grid container spacing={2}>
        {clubData.map((club) => (
          <Grid item key={club.id} xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                동아리 이름: {club.name}
              </Typography>
              <Typography variant="body1">
                가입 승인 여부: {club.approved ? "승인됨" : "미승인"}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ApplicationStatus;
