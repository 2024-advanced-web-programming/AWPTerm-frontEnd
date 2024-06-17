import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Tab, Tabs, Box } from "@mui/material";
import ClubBasicInfo from "./clubBasicInfo";
import ClubMembers from "./clubMemberInfo";
import ClubApplicationManagement from "./clubApplicationManagement";

const ClubManagement = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="md" sx={{marginTop: "30px"}}>
      <Typography variant="h4" gutterBottom>
        동아리 관리 페이지
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Club management tabs">
          <Tab label="기본 정보 관리" />
          <Tab label="부원 관리" />
          <Tab label="가입 신청 관리" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <ClubBasicInfo id={id}/>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <ClubMembers id={id}/>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <ClubApplicationManagement id={id}/>
      </TabPanel>
    </Container>
  );
};

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default ClubManagement;
