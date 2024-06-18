import React, { useState } from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Pagination,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const videos = [
  { id: 1, title: "Video 1", youtubeId: "dQw4w9WgXcQ", url: "https://www.naver.com/" },
  { id: 2, title: "Video 2", youtubeId: "eVTXPUF4Oz4" },
  { id: 3, title: "Video 3", youtubeId: "9bZkp7q19f0" },
  { id: 4, title: "Video 4", youtubeId: "RgKAFK5djSk" },
  { id: 5, title: "Video 5", youtubeId: "3JZ_D3ELwOQ" },
  { id: 6, title: "Video 6", youtubeId: "tAGnKpE4NCI" },
  { id: 7, title: "Video 7", youtubeId: "kJQP7kiw5Fk" },
  { id: 8, title: "Video 8", youtubeId: "CevxZvSJLk8" },
  { id: 9, title: "Video 9", youtubeId: "OPf0YbXqDm0" },
  { id: 10, title: "Video 10", youtubeId: "2Vv-BfVoq4g" },
  { id: 11, title: "Video 11", youtubeId: "KQ6zr6kCPj8" },
  { id: 12, title: "Video 12", youtubeId: "6JCLY0Rlx6Q" }
];

const videosPerPage = 6;

const ClubVideos = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const handlePostClick = (url) => {
    // navigate(`/post/${url}`);
    window.open(url, '_blank');
  };


  return (
    <Container sx={{marginTop: "30px"}}>
      <Typography variant="h4" gutterBottom>
        활동 영상
      </Typography>
      <Card style={{ marginTop: "2rem" }}>
        <CardContent>
          <Grid container spacing={2}>
            {currentVideos.map((video) => (
              <Grid item key={video.id} xs={12} sm={6} md={4}>
                <Card onClick={() => handlePostClick(video.url)} style={{ cursor: "pointer" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} // 유튜브 썸네일 가져오기
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography gutterBottom>{video.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(videos.length / videosPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ClubVideos;
