import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Select, MenuItem, TableContainer, Paper, Table, TableCell, TableRow, TableBody } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFirstImageFromContent, getYoutubeThumbnail } from "../commons/getThumbnailUrl";
import { AccountCircle, Description } from "@mui/icons-material";

const Top = () => {
  const [clubs, setClubs] = useState([
    {id: -1, name: "전체 조회"},
    {id: 1, name: "BOSS"}
  ]);
  const [selectedClub, setSelectedClub] = useState({ id: -1, name: "전체 조회" });
  const [events, setEvents] = useState([
    { id: 1, title: "동아리 행사 안내 1", writerName: "writerName 5", timestamp: "2023-06-13", views: 300, clubName: "club" },
    { id: 2, title: "동아리 행사 안내 2", writerName: "writerName 5", timestamp: "2023-06-13", views: 300, clubName: "club" },
    { id: 3, title: "동아리 행사 안내 3", writerName: "writerName 5", timestamp: "2023-06-13", views: 300, clubName: "club" },
    { id: 4, title: "동아리 행사 안내 1", writerName: "writerName 5", timestamp: "2023-06-13", views: 300, clubName: "club" },
    { id: 5, title: "동아리 행사 안내 2", writerName: "writerName 5", timestamp: "2023-06-13", views: 300, clubName: "club" },
    { id: 6, title: "동아리 행사 안내 3", writerName: "writerName 5", timestamp: "2023-06-13", views: 300, clubName: "club" }
  ]);
  const [recruitmentPosts, setRecruitmentPosts] = useState([
    { id: 1, title: "부원 모집 게시글 1", writerName: "writerName 1", timestamp: "2023-06-17", views: 100, clubName: "recruit" },
    { id: 2, title: "부원 모집 게시글 2", writerName: "writerName 1", timestamp: "2023-06-17", views: 100, clubName: "recruit" },
    { id: 3, title: "부원 모집 게시글 3", writerName: "writerName 1", timestamp: "2023-06-17", views: 100, clubName: "recruit" },
    { id: 4, title: "부원 모집 게시글 1", writerName: "writerName 1", timestamp: "2023-06-17", views: 100, clubName: "recruit" },
    { id: 5, title: "부원 모집 게시글 2", writerName: "writerName 1", timestamp: "2023-06-17", views: 100, clubName: "recruit" },
    { id: 6, title: "부원 모집 게시글 3", writerName: "writerName 1", timestamp: "2023-06-17", views: 100, clubName: "recruit" }
  ]);
  const [photos, setPhotos] = useState([
    { id: 1, title: "활동 사진 1", writerName: "writerName 1", content: "https://via.placeholder.com/150" },
    { id: 2, title: "활동 사진 2", writerName: "writerName 1", content: "https://via.placeholder.com/150" },
    { id: 3, title: "활동 사진 3", writerName: "writerName 1", content: "https://via.placeholder.com/150" }
  ]);
  const [videos, setVideos] = useState([
    { id: 1, title: "활동 영상 1", writerName: "writerName 1", videoURL: "abc123" },
    { id: 2, title: "활동 영상 2", writerName: "writerName 1", videoURL: "def456" },
    { id: 3, title: "활동 영상 3", writerName: "writerName 1", videoURL: "ghi789" }
  ]);

  const navigate = useNavigate();

  // 데이터 로딩
  useEffect(() => {
    // 동아리 공지 + 전체 공지
    axios.get(`${process.env.REACT_APP_SERVER_URL}/board/inquiry/all`)
      .then((response) => {
        console.log(response);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });

    // 부원 모집 게시판
    axios.get(`${process.env.REACT_APP_SERVER_URL}/board/all/부원_모집`)
      .then((response) => {
        console.log(response);
        setRecruitmentPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recruitment posts:", error);
      });

    // 활동 사진
    axios.get(`${process.env.REACT_APP_SERVER_URL}/board/all/활동_사진`)
      .then((response) => {
        console.log(response);
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });

    // 활동 영상
    axios.get(`${process.env.REACT_APP_SERVER_URL}/board/all/활동_영상`)
      .then((response) => {
        console.log(response);
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  const handleSeeMore = (clubName) => {
    // 더보기 버튼 클릭 시 처리
    console.log(`See more ${clubName}`);
    // 필요한 동작 추가
  };

  const handleClubChange = async (event) => {
    await setSelectedClub(event.target.value);
    console.log(selectedClub);
  };

  const handlePostClick = (url, type) => {
    if(type === 'video') {
      window.open(url, '_blank');
    } else {
      navigate(`/post/${url}`);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      {/* <Select
        labelId="club-select-label"
        value={selectedClub}
        onChange={handleClubChange}
        required
      >
        {clubs.map((club) => (
          <MenuItem key={club.id} value={club}>
            {club.name}
          </MenuItem>
        ))}
      </Select> */}

      {/* 동아리 공지 + 전체 공지 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography variant="h5" gutterBottom>동아리 행사 공지</Typography>
                <Button variant="outlined" onClick={() => {navigate("/club/events")}}>더 보기</Button>
              </div>
              <TableContainer component={Paper}>
                <Table>
                <TableBody>
            {events.slice(0, 5).map((post) => (
              <TableRow key={post.id} onClick={() => handlePostClick(post.id, 'post')} style={{ cursor: "pointer" }}>
                <TableCell style={{ width: '5%' }}>{post.id}</TableCell>
                <TableCell align="center" style={{ width: '40%' }}>[{post.clubName}] {post.title}</TableCell>
                <TableCell align="right" style={{ width: '15%' }}>{post.writerName}</TableCell>
                <TableCell align="right" style={{ width: '40%' }}>{post.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography variant="h5" gutterBottom>부원 모집 게시판</Typography>
                <Button variant="outlined" onClick={() => {navigate("/club/recruit")}}>더 보기</Button>
              </div>
              <TableContainer component={Paper}>
                <Table>
                <TableBody>
            {recruitmentPosts.slice(0, 5).map((post) => (
              <TableRow key={post.id} onClick={() => handlePostClick(post.id, 'post')} style={{ cursor: "pointer" }}>
                <TableCell style={{ width: '5%' }}>{post.id}</TableCell>
                <TableCell align="center" style={{ width: '40%' }}>[{post.clubName}] {post.title}</TableCell>
                <TableCell align="right" style={{ width: '15%' }}>{post.writerName}</TableCell>
                <TableCell align="right" style={{ width: '40%' }}>{post.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 활동 사진 */}
      <Card style={{ marginTop: "2rem" }}>
        <CardContent>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Typography variant="h5" gutterBottom>활동 사진</Typography>
              <Button variant="outlined" onClick={() => {navigate("/club/photos")}}>더 보기</Button>
              </div>
          
          <Grid container spacing={2}>
            {photos.slice(0, 3).map((photo) => (
              <Grid item key={photo.id} xs={12} sm={6} md={4}>
                <Card onClick={() => handlePostClick(photo.id, 'photo')} style={{ cursor: "pointer" }}>
                  <CardMedia
                    component="img"
                    height="188"
                    image={getFirstImageFromContent(photo.content)} // 썸네일 이미지 URL
                    alt={photo.title}
                  />
                  <CardContent style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '5px' }}>
                      <Description sx={{ marginRight: '3px'}} />
                      <Typography direction="row" alignItems="center">{photo.title}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '5px' }}>
                      <AccountCircle sx={{ marginRight: '3px'}} />
                      <Typography direction="row" alignItems="center">{photo.writerName}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
        </CardContent>
      </Card>

      {/* 활동 영상 */}
      <Card style={{ marginTop: "2rem" }}>
        <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Typography variant="h5" gutterBottom>활동 영상</Typography>
        <Button variant="outlined" onClick={() => {navigate("/club/videos")}}>더 보기</Button>
              </div>
          
          <Grid container spacing={2}>
            {videos.slice(0, 3).map((video) => (
              <Grid item key={video.id} xs={12} sm={6} md={4}>
                <Card onClick={() => handlePostClick(video.videoURL, 'video')} style={{ cursor: "pointer" }}>
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
    </Container>
  );
};

export default Top;
