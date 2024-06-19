import React, { useEffect, useState } from "react";
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
import { getYoutubeThumbnail } from "../commons/getThumbnailUrl";
import { AccountCircle, Description } from "@mui/icons-material";
import axios from "axios";

const videos = [
  { id: 1, title: "Video 1", youtubeId: "dQw4w9WgXcQ", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 2, title: "Video 2", youtubeId: "eVTXPUF4Oz4", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 3, title: "Video 3", youtubeId: "9bZkp7q19f0", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 4, title: "Video 4", youtubeId: "RgKAFK5djSk", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 5, title: "Video 5", youtubeId: "3JZ_D3ELwOQ", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 6, title: "Video 6", youtubeId: "tAGnKpE4NCI", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 7, title: "Video 7", youtubeId: "kJQP7kiw5Fk", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 8, title: "Video 8", youtubeId: "CevxZvSJLk8", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 9, title: "Video 9", youtubeId: "OPf0YbXqDm0", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 10, title: "Video 10", youtubeId: "2Vv-BfVoq4g", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 11, title: "Video 11", youtubeId: "KQ6zr6kCPj8", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" },
  { id: 12, title: "Video 12", youtubeId: "6JCLY0Rlx6Q", videoURL: "https://youtu.be/r2ko422xW0w?si=gjB282YaEO6gbqCF" }
];

const videosPerPage = 6;

const ClubVideos = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [video, setVideo] = useState([]);
  const [currentVideo, setCurrentVideo] = useState([]);

  const getVideo = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/board/all/활동_영상`)
      .then((res) => {
        console.log(res);
        setVideo(res.data);
        // 페이지네이션에 따른 현재 페이지 게시글 계산
        const indexOfLastVideo = currentPage * videosPerPage;
        const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
        const currentVideos = res.data.slice(indexOfFirstVideo, indexOfLastVideo);
        setCurrentVideo(currentVideos);
      })
      .catch((error) => {
        console.error(error);
        setVideo(videos); // 예외 발생 시 기본 데이터로 설정
        setCurrentVideo(videos.slice(0, videosPerPage)); // 기본 데이터로 현재 페이지 게시글 설정
      });
  }

  useEffect(() => {
    getVideo();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
            {currentVideo.map((video) => (
              <Grid item key={video.id} xs={12} sm={6} md={4}>
                <Card onClick={() => handlePostClick(video.videoURL)} style={{ cursor: "pointer" }}>
                  <CardMedia
                    component="img"
                    height="188"
                    image={getYoutubeThumbnail(video.videoURL)} // 유튜브 썸네일 가져오기
                    alt={video.title}
                  />
                  <CardContent style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '5px' }}>
                      <Description sx={{ marginRight: '3px'}} />
                      <Typography direction="row" alignItems="center">{video.title}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '5px' }}>
                      <AccountCircle sx={{ marginRight: '3px'}} />
                      <Typography direction="row" alignItems="center">{video.writerName}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(video.length / videosPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ClubVideos;
