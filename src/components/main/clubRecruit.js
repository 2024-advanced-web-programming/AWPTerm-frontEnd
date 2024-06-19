import React, { useEffect, useState } from "react";
import {
  Container,
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
import axios from "axios";

const allPosts = [
  { id: 1, clubId: 1, clubName: "boss", title: "Post 1", content: "<p>123</p>", timestamp: "2024-06-19 07:00:19", writerName: "이상헌", videoURL: null },
  { id: 2, clubId: 2, clubName: "other", title: "Post 2", content: "<p>456</p>", timestamp: "2024-06-18 08:10:20", writerName: "홍길동", videoURL: null },
  { id: 3, clubId: 3, clubName: "club3", title: "Post 3", content: "<p>789</p>", timestamp: "2024-06-17 09:20:30", writerName: "김철수", videoURL: null },
  { id: 4, clubId: 4, clubName: "club4", title: "Post 4", content: "<p>abc</p>", timestamp: "2024-06-16 10:30:40", writerName: "박영희", videoURL: null },
  { id: 5, clubId: 5, clubName: "club5", title: "Post 5", content: "<p>def</p>", timestamp: "2024-06-15 11:40:50", writerName: "이지은", videoURL: null },
  { id: 6, clubId: 6, clubName: "club6", title: "Post 6", content: "<p>ghi</p>", timestamp: "2024-06-14 12:50:00", writerName: "최영호", videoURL: null },
  { id: 7, clubId: 7, clubName: "club7", title: "Post 7", content: "<p>jkl</p>", timestamp: "2024-06-13 13:00:10", writerName: "김미영", videoURL: null },
  { id: 8, clubId: 8, clubName: "club8", title: "Post 8", content: "<p>mno</p>", timestamp: "2024-06-12 14:10:20", writerName: "이승우", videoURL: null },
  { id: 9, clubId: 9, clubName: "club9", title: "Post 9", content: "<p>pqr</p>", timestamp: "2024-06-11 15:20:30", writerName: "박정희", videoURL: null },
  { id: 10, clubId: 10, clubName: "club10", title: "Post 10", content: "<p>stu</p>", timestamp: "2024-06-10 16:30:40", writerName: "홍길순", videoURL: null },
  { id: 11, clubId: 11, clubName: "club11", title: "Post 11", content: "<p>vwx</p>", timestamp: "2024-06-09 17:40:50", writerName: "김태희", videoURL: null },
  { id: 12, clubId: 12, clubName: "club12", title: "Post 12", content: "<p>yz</p>", timestamp: "2024-06-08 18:50:00", writerName: "이지현", videoURL: null },
  { id: 13, clubId: 13, clubName: "club13", title: "Post 13", content: "<p>123456</p>", timestamp: "2024-06-07 19:00:10", writerName: "박서준", videoURL: null },
  { id: 14, clubId: 14, clubName: "club14", title: "Post 14", content: "<p>7890</p>", timestamp: "2024-06-06 20:10:20", writerName: "최지우", videoURL: null },
  { id: 15, clubId: 15, clubName: "club15", title: "Post 15", content: "<p>abcd</p>", timestamp: "2024-06-05 21:20:30", writerName: "김민준", videoURL: null },
  { id: 16, clubId: 16, clubName: "club16", title: "Post 16", content: "<p>efgh</p>", timestamp: "2024-06-04 22:30:40", writerName: "이지훈", videoURL: null },
  { id: 17, clubId: 17, clubName: "club17", title: "Post 17", content: "<p>ijkl</p>", timestamp: "2024-06-03 23:40:50", writerName: "박진영", videoURL: null },
  { id: 18, clubId: 18, clubName: "club18", title: "Post 18", content: "<p>mnop</p>", timestamp: "2024-06-02 00:50:00", writerName: "김수현", videoURL: null },
  { id: 19, clubId: 19, clubName: "club19", title: "Post 19", content: "<p>qrst</p>", timestamp: "2024-06-01 01:00:10", writerName: "최정원", videoURL: null },
  { id: 20, clubId: 20, clubName: "club20", title: "Post 20", content: "<p>uvwx</p>", timestamp: "2024-05-31 02:10:20", writerName: "이민호", videoURL: null },
  { id: 21, clubId: 21, clubName: "club21", title: "Post 21", content: "<p>yzab</p>", timestamp: "2024-05-30 03:20:30", writerName: "박지성", videoURL: null },
  { id: 22, clubId: 22, clubName: "club22", title: "Post 22", content: "<p>cdef</p>", timestamp: "2024-05-29 04:30:40", writerName: "손흥민", videoURL: null },
  { id: 23, clubId: 23, clubName: "club23", title: "Post 23", content: "<p>ghij</p>", timestamp: "2024-05-28 05:40:50", writerName: "이청용", videoURL: null },
  { id: 24, clubId: 24, clubName: "club24", title: "Post 24", content: "<p>klmn</p>", timestamp: "2024-05-27 06:50:00", writerName: "김연아", videoURL: null },
  { id: 25, clubId: 25, clubName: "club25", title: "Post 25", content: "<p>opqr</p>", timestamp: "2024-05-26 07:00:10", writerName: "박찬호", videoURL: null },
  { id: 26, clubId: 26, clubName: "club26", title: "Post 26", content: "<p>stuv</p>", timestamp: "2024-05-25 08:10:20", writerName: "류현진", videoURL: null },
  { id: 27, clubId: 27, clubName: "club27", title: "Post 27", content: "<p>wxyz</p>", timestamp: "2024-05-24 09:20:30", writerName: "전지현", videoURL: null },
  { id: 28, clubId: 28, clubName: "club28", title: "Post 28", content: "<p>1234</p>", timestamp: "2024-05-23 10:30:40", writerName: "이민지", videoURL: null },
  { id: 29, clubId: 29, clubName: "club29", title: "Post 29", content: "<p>5678</p>", timestamp: "2024-05-22 11:40:50", writerName: "김태리", videoURL: null },
  { id: 30, clubId: 30, clubName: "club30", title: "Post 30", content: "<p>90ab</p>", timestamp: "2024-05-21 12:50:00", writerName: "이종석", videoURL: null }
];

const ClubRecruit = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 10; // 페이지당 게시글 수
  const [post, setPost] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);

  const getPost = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/board/all/부원_모집`)
      .then((res) => {
        console.log(res);
        setPost(res.data);
        // 페이지네이션에 따른 현재 페이지 게시글 계산
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = res.data.slice(indexOfFirstPost, indexOfLastPost);
        setCurrentPost(currentPosts);
      })
      .catch((error) => {
        console.error(error);
        setPost(allPosts); // 예외 발생 시 기본 데이터로 설정
        setCurrentPost(allPosts.slice(0, postsPerPage)); // 기본 데이터로 현재 페이지 게시글 설정
      });
  }

  useEffect(() => {
    getPost();
  }, [])

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
        부원 모집 게시판
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '5%' }}>ID</TableCell>
              <TableCell align="center" style={{ width: '60%' }}>제목</TableCell>
              <TableCell align="center" style={{ width: '15%' }}>작성자</TableCell>
              <TableCell align="center" style={{ width: '20%' }}>작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPost.map((post) => (
              <TableRow key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: "pointer" }}>
                <TableCell>{post.id}</TableCell>
                <TableCell align="center">[{post.clubName}] {post.title}</TableCell>
                <TableCell align="center">{post.writerName}</TableCell>
                <TableCell align="center">{post.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(post.length / postsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ClubRecruit;
