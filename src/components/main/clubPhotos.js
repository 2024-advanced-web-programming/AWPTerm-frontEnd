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
import { getFirstImageFromContent } from "../commons/getThumbnailUrl";
import { AccountCircle, Description } from "@mui/icons-material";
import axios from "axios";

const photos = [
  { id: 1, title: "Photo 1", writerName: "writerName 1", content: "https://via.placeholder.com/150" },
  { id: 2, title: "Photo 2", writerName: "writerName 2", content: "https://via.placeholder.com/150" },
  { id: 3, title: "Photo 3", writerName: "writerName 3", content: "https://via.placeholder.com/150" },
  { id: 4, title: "Photo 4", writerName: "writerName 4", content: "https://via.placeholder.com/150" },
  { id: 5, title: "Photo 5", writerName: "writerName 5", content: "https://via.placeholder.com/150" },
  { id: 6, title: "Photo 6", writerName: "writerName 6", content: "https://via.placeholder.com/150" },
  { id: 7, title: "Photo 7", writerName: "writerName 7", content: "https://via.placeholder.com/150" },
  { id: 8, title: "Photo 8", writerName: "writerName 8", content: "https://via.placeholder.com/150" },
  { id: 9, title: "Photo 9", writerName: "writerName 9", content: "https://via.placeholder.com/150" },
  { id: 10, title: "Photo 10", writerName: "writerName 10", content: "https://via.placeholder.com/150" },
  { id: 11, title: "Photo 11", writerName: "writerName 11", content: "https://via.placeholder.com/150" },
  { id: 12, title: "Photo 12", writerName: "writerName 12", content: "https://via.placeholder.com/150" }
];

const photosPerPage = 6;

const ClubPhotos = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [photo, setPhoto] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState([]);

  const getPhoto = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/board/all/활동_사진`)
      .then((res) => {
        console.log(res);
        setPhoto(res.data);
        // 페이지네이션에 따른 현재 페이지 게시글 계산
        const indexOfLastPhoto = currentPage * photosPerPage;
        const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
        const currentPhotos = res.data.slice(indexOfFirstPhoto, indexOfLastPhoto);
        setCurrentPhoto(currentPhotos);
      })
      .catch((error) => {
        console.error(error);
        setPhoto(photos); // 예외 발생 시 기본 데이터로 설정
        setCurrentPhoto(photos.slice(0, photosPerPage)); // 기본 데이터로 현재 페이지 게시글 설정
      });
  }

  useEffect(() => {
    getPhoto();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };


  return (
    <Container sx={{marginTop: "30px"}}>
      <Typography variant="h4" gutterBottom>
        활동 사진
      </Typography>
      <Card style={{ marginTop: "2rem" }}>
        <CardContent>
          <Grid container spacing={2}>
            {currentPhoto.map((photo) => (
              <Grid item key={photo.id} xs={12} sm={6} md={4}>
                <Card onClick={() => handlePostClick(photo.id)} style={{ cursor: "pointer" }}>
                  <CardMedia
                    component="img"
                    height="188"
                    image={getFirstImageFromContent(photo.content)}
                    alt={photo.title}
                  />
                  <CardContent style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '5px' }}>
                      <Description sx={{ marginRight: '3px'}} />
                      <Typography direction="row" alignItems="center">[{photo.clubName}] {photo.title}</Typography>
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
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(photo.length / photosPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ClubPhotos;
