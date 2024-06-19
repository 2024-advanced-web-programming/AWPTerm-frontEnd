import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import { AccountCircle, Schedule, Visibility } from "@mui/icons-material";
import axios from "axios";
import { formatDateString } from "../commons/converter";

// 더미 데이터
// 더미 데이터
const dummyPost = {
    id: 1,
    clubName: "boss",
    title: "게시글 제목",
    writerName: "작성자1",
    timestamp: "2023-06-17 12:30:00",
    content: `
      <p>게시글 내용입니다. <strong>강조</strong>된 부분도 있습니다.</p>
      <p>HTML 형식으로 작성된 내용입니다.</p>
      <p>이미지 삽입 예시:</p>
      <p><img src="https://via.placeholder.com/400x200" alt="Placeholder Image" /></p>
      <p>테스트 끝!</p>
    `,
  };
  

const ContentPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = () => {
    try {
      axios.get(process.env.REACT_APP_SERVER_URL + `/board/${id}`)
        .then((res) => {
          console.log(res);
          setPost(res.data);
        });
      // setPost(dummyPost);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 실제 서버에서 데이터를 가져오는 대신 더미 데이터를 사용
    fetchPost();
    // console.log(post.timestamp)
  }, [id]);

  if (loading || !post) {
    return (
      <Container sx={{marginTop: "30px"}}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{marginTop: "30px"}}>
        <Typography variant="h6" color="error" gutterBottom>
          게시글을 불러오는 중 오류가 발생했습니다.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{marginTop: "30px"}}>
      <Typography variant="h4" gutterBottom>
        [{post.clubName}] {post.title}
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <AccountCircle sx={{ mr: '8px' }} />
        <Typography variant="subtitle1">
          {post.writerName}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Schedule sx={{ mr: '8px' }} />
        <Typography variant="subtitle2">
          {formatDateString(post.timestamp)}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box mt={2}>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </Box>
    </Container>
  );
};

export default ContentPage;
