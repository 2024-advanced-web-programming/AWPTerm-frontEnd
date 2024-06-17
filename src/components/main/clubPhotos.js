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

const photos = [
  { id: 1, title: "Photo 1", author: "Author 1", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 2, title: "Photo 2", author: "Author 2", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 3, title: "Photo 3", author: "Author 3", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 4, title: "Photo 4", author: "Author 4", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 5, title: "Photo 5", author: "Author 5", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 6, title: "Photo 6", author: "Author 6", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 7, title: "Photo 7", author: "Author 7", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 8, title: "Photo 8", author: "Author 8", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 9, title: "Photo 9", author: "Author 9", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 10, title: "Photo 10", author: "Author 10", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 11, title: "Photo 11", author: "Author 11", thumbnailUrl: "https://via.placeholder.com/150" },
  { id: 12, title: "Photo 12", author: "Author 12", thumbnailUrl: "https://via.placeholder.com/150" }
];

const photosPerPage = 6;

const ClubPhotos = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

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
            {currentPhotos.map((photo) => (
              <Grid item key={photo.id} xs={12} sm={6} md={4}>
                <Card onClick={() => handlePostClick(photo.id)} style={{ cursor: "pointer" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={photo.thumbnailUrl}
                    alt={photo.title}
                  />
                  <CardContent>
                    <Typography gutterBottom>{photo.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{photo.author}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(photos.length / photosPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ClubPhotos;
