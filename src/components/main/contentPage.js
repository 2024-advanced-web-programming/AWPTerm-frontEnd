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

// 더미 데이터
// 더미 데이터
const dummyPost = {
    id: 1,
    title: "게시글 제목",
    author: "작성자1",
    date: "2023-06-17T12:30:00",
    views: 150,
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

  useEffect(() => {
    // 실제 서버에서 데이터를 가져오는 대신 더미 데이터를 사용
    const fetchPost = async () => {
      try {
        setPost(dummyPost);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
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
        {post.title}
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <AccountCircle sx={{ mr: 1 }} />
        <Typography variant="subtitle1" gutterBottom>
          작성자: {post.author}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Schedule sx={{ mr: 1 }} />
        <Typography variant="subtitle2" gutterBottom>
          작성 시간: {new Date(post.date).toLocaleString()}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Visibility sx={{ mr: 1 }} />
        <Typography variant="subtitle2" gutterBottom>
          조회수: {post.views}
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
