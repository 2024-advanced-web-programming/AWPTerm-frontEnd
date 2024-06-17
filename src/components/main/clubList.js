import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ClubList = () => {
  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: "테니스 동아리",
      president: "홍길동",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "테니스를 사랑하는 동아리입니다. 많은 참여 바랍니다.",
    },
    {
      id: 2,
      name: "농구 동아리",
      president: "김철수",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "농구를 즐기는 동아리입니다. 새로운 멤버들을 기다립니다.",
    },
    {
      id: 3,
      name: "배드민턴 동아리",
      president: "이영희",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "배드민턴을 함께 즐기는 동아리입니다. 활발한 활동을 기대합니다.",
    },
    {
      id: 4,
      name: "축구 동아리",
      president: "박민수",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "축구를 사랑하는 동아리입니다. 열정적인 멤버를 모집합니다.",
    },
    {
      id: 5,
      name: "야구 동아리",
      president: "정현진",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "야구를 즐기는 동아리입니다. 새로운 도전을 환영합니다.",
    },
    {
      id: 6,
      name: "배구 동아리",
      president: "송미영",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "배구를 좋아하는 동아리입니다. 적극적인 참여를 기대합니다.",
    },
    {
      id: 7,
      name: "수영 동아리",
      president: "장호준",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "수영을 사랑하는 동아리입니다. 새로운 친구들을 기다립니다.",
    },
    {
      id: 8,
      name: "체육 동아리",
      president: "유승우",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "다양한 체육 활동을 즐기는 동아리입니다. 열정적인 멤버를 찾습니다.",
    },
    {
      id: 9,
      name: "합창 동아리",
      president: "이지은",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "음악을 함께 만들어가는 합창 동아리입니다. 많은 관심 바랍니다.",
    },
    {
      id: 10,
      name: "무용 동아리",
      president: "김태현",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "다양한 무용 활동을 즐기는 동아리입니다. 새로운 도전을 환영합니다.",
    },
    {
      id: 11,
      name: "무용 동아리2",
      president: "김태현",
      thumbnailUrl: "https://via.placeholder.com/150",
      description: "다양한 무용 활동을 즐기는 동아리입니다. 새로운 도전을 환영합니다.",
    },
  ]);

  const [page, setPage] = useState(1); // 현재 페이지
  const clubsPerPage = 6; // 페이지당 보여질 동아리 수

  const totalPages = Math.ceil(clubs.length / clubsPerPage);

  const navigate = useNavigate();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchClubs = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/club/all"); // -> 기타 정보까지 주는 컨트롤러 필요
            console.log(res);

            setClubs(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchClubs();
  }, [])

  const startIndex = (page - 1) * clubsPerPage;
  const displayedClubs = clubs.slice(startIndex, startIndex + clubsPerPage);

  const handleCardClick = (club) => {
    Swal.fire({
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn8494uQt4Z-P_WCixKVdDMnJmH4F2_p5ldQ&s",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "대표 사진",
        title: club.name,
        html: `${club.introduction}<br>회장 : ${club.presidentName}<br>정기모임시간 :${club.regularMeetingTime}`,
        confirmButtonText: "가입 신청",
        cancelButtonText: "취소",
        showCancelButton: true,
      }).then((result) => {
        if(result.isConfirmed) {
            navigate(`/club/application/${club.id}`);
        }
      });
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{textAlign: "left"}}>동아리 목록</Typography>
        </Grid>
        <Grid item xs={12} md={6} style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* <Button variant="contained" color="primary" style={{ marginBottom: "1rem" }} onClick={() => {navigate("/club/application")}}>
            가입하기
          </Button> */}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {displayedClubs.map((club) => (
          <Grid item key={club.id} xs={12} md={6} lg={4}>
            <Card onClick={() => {handleCardClick(club)}}>
              <CardMedia
                component="img"
                height="140"
                image={club.thumbnailUrl} // 썸네일 이미지 URL
                alt={club.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>{club.name}</Typography>
                <Typography variant="body1" gutterBottom>회장: {club.president}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{club.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default ClubList;
