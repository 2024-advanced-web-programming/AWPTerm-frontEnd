import React, { useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const allPosts = [
  { id: 1, title: "Post 1", author: "Author 1", date: "2023-06-17", views: 100, type: "boss" },
  { id: 2, title: "Post 2", author: "Author 2", date: "2023-06-16", views: 150, type: "all" },
  { id: 3, title: "Post 3", author: "Author 3", date: "2023-06-15", views: 200, type: "셈틀" },
  { id: 4, title: "Post 4", author: "Author 4", date: "2023-06-14", views: 250, type: "all" },
  { id: 5, title: "Post 5", author: "Author 5", date: "2023-06-13", views: 300, type: "club" },
  { id: 6, title: "Post 6", author: "Author 6", date: "2023-06-12", views: 350, type: "all" },
  { id: 7, title: "Post 7", author: "Author 7", date: "2023-06-11", views: 400, type: "club" },
  { id: 8, title: "Post 8", author: "Author 8", date: "2023-06-10", views: 450, type: "all" },
  { id: 9, title: "Post 9", author: "Author 9", date: "2023-06-09", views: 500, type: "club" },
  { id: 10, title: "Post 10", author: "Author 10", date: "2023-06-08", views: 550, type: "all" },
  { id: 11, title: "Post 11", author: "Author 11", date: "2023-06-07", views: 600, type: "club" },
  { id: 12, title: "Post 12", author: "Author 12", date: "2023-06-06", views: 650, type: "all" },
  { id: 13, title: "Post 13", author: "Author 13", date: "2023-06-05", views: 700, type: "club" },
  { id: 14, title: "Post 14", author: "Author 14", date: "2023-06-04", views: 750, type: "all" },
  { id: 15, title: "Post 15", author: "Author 15", date: "2023-06-03", views: 800, type: "club" },
  { id: 16, title: "Post 16", author: "Author 16", date: "2023-06-02", views: 850, type: "all" },
  { id: 17, title: "Post 17", author: "Author 17", date: "2023-06-01", views: 900, type: "club" },
  { id: 18, title: "Post 18", author: "Author 18", date: "2023-05-31", views: 950, type: "all" },
  { id: 19, title: "Post 19", author: "Author 19", date: "2023-05-30", views: 1000, type: "club" },
  { id: 20, title: "Post 20", author: "Author 20", date: "2023-05-29", views: 1050, type: "all" },
  { id: 21, title: "Post 21", author: "Author 21", date: "2023-05-28", views: 1100, type: "club" },
  { id: 22, title: "Post 22", author: "Author 22", date: "2023-05-27", views: 1150, type: "all" },
  { id: 23, title: "Post 23", author: "Author 23", date: "2023-05-26", views: 1200, type: "club" },
  { id: 24, title: "Post 24", author: "Author 24", date: "2023-05-25", views: 1250, type: "all" },
  { id: 25, title: "Post 25", author: "Author 25", date: "2023-05-24", views: 1300, type: "club" },
  { id: 26, title: "Post 26", author: "Author 26", date: "2023-05-23", views: 1350, type: "all" },
  { id: 27, title: "Post 27", author: "Author 27", date: "2023-05-22", views: 1400, type: "club" },
  { id: 28, title: "Post 28", author: "Author 28", date: "2023-05-21", views: 1450, type: "all" },
  { id: 29, title: "Post 29", author: "Author 29", date: "2023-05-20", views: 1500, type: "club" },
  { id: 30, title: "Post 30", author: "Author 30", date: "2023-05-19", views: 1550, type: "all" },
];

const ClubEvents = () => {
  const navigate = useNavigate();
  const [noticeType, setNoticeType] = useState("club"); // 콤보박스 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 10; // 페이지당 게시글 수

  // 현재 공지 타입에 따라 게시글 필터링
  const filteredPosts = noticeType === "all" ? allPosts.filter(post => post.type === "all") : allPosts.filter(post => post.type !== "all");

  // 페이지네이션에 따른 현재 페이지 게시글 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 공지 타입 선택 핸들러
  const handleNoticeTypeChange = (event) => {
    setNoticeType(event.target.value);
    setCurrentPage(1); // 공지 타입 변경 시 페이지를 첫 페이지로 초기화
  };

  // 페이지 변경 핸들러
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <Container sx={{marginTop: "30px"}}>
      <Typography variant="h4" gutterBottom>
        동아리 행사 공지
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="notice-type-label">공지 타입</InputLabel>
          <Select
            labelId="notice-type-label"
            value={noticeType}
            onChange={handleNoticeTypeChange}
            label="공지 타입"
          >
            <MenuItem value="club">동아리 공지</MenuItem>
            <MenuItem value="all">전체 공지</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성자</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>조회수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts.map((post) => (
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
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(filteredPosts.length / postsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ClubEvents;
