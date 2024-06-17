import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Select, MenuItem, TableContainer, Paper, Table, TableCell, TableRow, TableBody } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Top = () => {
  const [clubs, setClubs] = useState([
    {id: -1, name: "전체 조회"},
    {id: 1, name: "BOSS"}
  ]);
  const [selectedClub, setSelectedClub] = useState({ id: -1, name: "전체 조회" });
  const [events, setEvents] = useState([
    { id: 1, title: "동아리 행사 안내 1", author: "Author 5", date: "2023-06-13", views: 300, type: "club" },
    { id: 2, title: "동아리 행사 안내 2", author: "Author 5", date: "2023-06-13", views: 300, type: "club" },
    { id: 3, title: "동아리 행사 안내 3", author: "Author 5", date: "2023-06-13", views: 300, type: "club" },
    { id: 1, title: "동아리 행사 안내 1", author: "Author 5", date: "2023-06-13", views: 300, type: "club" },
    { id: 2, title: "동아리 행사 안내 2", author: "Author 5", date: "2023-06-13", views: 300, type: "club" },
    { id: 3, title: "동아리 행사 안내 3", author: "Author 5", date: "2023-06-13", views: 300, type: "club" }
  ]);
  const [recruitmentPosts, setRecruitmentPosts] = useState([
    { id: 1, title: "부원 모집 게시글 1", author: "Author 1", date: "2023-06-17", views: 100, type: "recruit" },
    { id: 2, title: "부원 모집 게시글 2", author: "Author 1", date: "2023-06-17", views: 100, type: "recruit" },
    { id: 3, title: "부원 모집 게시글 3", author: "Author 1", date: "2023-06-17", views: 100, type: "recruit" },
    { id: 1, title: "부원 모집 게시글 1", author: "Author 1", date: "2023-06-17", views: 100, type: "recruit" },
    { id: 2, title: "부원 모집 게시글 2", author: "Author 1", date: "2023-06-17", views: 100, type: "recruit" },
    { id: 3, title: "부원 모집 게시글 3", author: "Author 1", date: "2023-06-17", views: 100, type: "recruit" }
  ]);
  const [photos, setPhotos] = useState([
    { id: 1, title: "활동 사진 1", thumbnailUrl: "https://via.placeholder.com/150" },
    { id: 2, title: "활동 사진 2", thumbnailUrl: "https://via.placeholder.com/150" },
    { id: 3, title: "활동 사진 3", thumbnailUrl: "https://via.placeholder.com/150" }
  ]);
  const [videos, setVideos] = useState([
    { id: 1, title: "활동 영상 1", youtubeId: "abc123" },
    { id: 2, title: "활동 영상 2", youtubeId: "def456" },
    { id: 3, title: "활동 영상 3", youtubeId: "ghi789" }
  ]);

  const navigate = useNavigate();

  // 데이터 로딩
  useEffect(() => {
    // 동아리 공지 + 전체 공지
    axios.get(`${process.env.REACT_APP_SERVER_URL}/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });

    // 부원 모집 게시판
    axios.get(`${process.env.REACT_APP_SERVER_URL}/recruitment`)
      .then((response) => {
        setRecruitmentPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recruitment posts:", error);
      });

    // 활동 사진
    axios.get(`${process.env.REACT_APP_SERVER_URL}/photos`)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });

    // 활동 영상
    axios.get(`${process.env.REACT_APP_SERVER_URL}/videos`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  const handleSeeMore = (type) => {
    // 더보기 버튼 클릭 시 처리
    console.log(`See more ${type}`);
    // 필요한 동작 추가
  };

  const handleClubChange = async (event) => {
    await setSelectedClub(event.target.value);
    console.log(selectedClub);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" gutterBottom>동아리 행사 공지</Typography>
                <Button variant="outlined" onClick={() => {navigate("/club/events")}}>더 보기</Button>
              </div>
              <TableContainer component={Paper}>
                <Table>
                <TableBody>
            {events.slice(0, 5).map((post) => (
              <TableRow key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: "pointer" }}>
                <TableCell>{post.id}</TableCell>
                <TableCell>[{post.type}] {post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.views}</TableCell>
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" gutterBottom>부원 모집 게시판</Typography>
                <Button variant="outlined" onClick={() => {navigate("/club/recruit")}}>더 보기</Button>
              </div>
              <TableContainer component={Paper}>
                <Table>
                <TableBody>
            {recruitmentPosts.slice(0, 5).map((post) => (
              <TableRow key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: "pointer" }}>
                <TableCell>{post.id}</TableCell>
                <TableCell>[{post.type}] {post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.views}</TableCell>
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5" gutterBottom>활동 사진</Typography>
              <Button variant="outlined" onClick={() => {navigate("/club/photos")}}>더 보기</Button>
              </div>
          
          <Grid container spacing={2}>
            {photos.slice(0, 3).map((photo) => (
              <Grid item key={photo.id} xs={12} sm={6} md={4}>
                <Card onClick={() => handlePostClick(photo.id)} style={{ cursor: "pointer" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={photo.thumbnailUrl} // 썸네일 이미지 URL
                    alt={photo.title}
                  />
                  <CardContent>
                    <Typography gutterBottom>{photo.title}</Typography>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" gutterBottom>활동 영상</Typography>
        <Button variant="outlined" onClick={() => {navigate("/club/videos")}}>더 보기</Button>
              </div>
          
          <Grid container spacing={2}>
            {videos.slice(0, 3).map((video) => (
              <Grid item key={video.id} xs={12} sm={6} md={4}>
                <Card onClick={() => handlePostClick(video.id)} style={{ cursor: "pointer" }}>
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
    </Container>
  );
};

export default Top;
