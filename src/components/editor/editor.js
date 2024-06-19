import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Grid } from "@mui/material";
import QuillEditor from "./quillEditor";
import axios from "axios";
import Swal from "sweetalert2";
import { getFirstImageFromContent } from "../commons/getThumbnailUrl";
import { checkIsBlank } from "../commons/checkValidation";

const Editor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const conRef = useRef({});

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFileChange = (event) => {
    setAttachment(event.target.files[0]);
  };

  const handleContentChange = (html) => {
    setContent(html); // QuillEditor의 내용을 상태로 설정
  };

  const handleSubmit = async () => {
    let contents;

    if(category === "활동 영상") {
      if(!title || !category || !url) {
        Swal.fire({
          title: "제목과 URL은 필수 입력 사항이에요!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
    }
    else {
      contents = await conRef.current.sendContentsToParent();
      // setContent(contents);
      console.log(content);
      console.log(title);
      console.log(category);

      // 데이터 유효성 검사
      if (!title || !category || !contents || checkIsBlank(contents)) {
        Swal.fire({
          title: "제목, 카테고리, 내용은 필수 입력 사항이에요!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }

      if(category === "활동 사진" && getFirstImageFromContent(contents) === null) {
        Swal.fire({
          title: "확인 필요!",
          text: "활동 사진 카테고리는 사진이 한 장 이상 필요해요!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
    }

    // 서버에 보낼 데이터
    let data;
    if(category === "활동 영상") {
      data = {
        clubId: id,
        title: title,
        videoURL: url
      };
    }
    else {
      data = {
        clubId: id,
        title: title,
        content: contents
      };
    }

    let postUrl;

    if(category === "동아리 행사 공지") {
      postUrl = '/board/add/notice'
    }
    else if(category === "전체 공지") {
      postUrl = '/board/add/allType'
    }
    else if(category === "부원 모집") {
      postUrl = '/board/add/recruitment'
    }
    else if(category === "활동 사진") {
      postUrl = '/board/add/activity/photo'
    }
    else if(category === "활동 영상") {
      postUrl = '/board/add/activity/video'
    }

    console.log(data);
    
    try {
      // 서버 POST 요청
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + postUrl, data);

      console.log(response);

      if (response.status === 201) {
        Swal.fire({
          title: "등록 성공!",
          icon: "success",
          text: "성공적으로 게시물을 등록했어요!",
          showConfirmButton: false,
          timer: 1500
        }).then((res) => {
          setTitle("");
          setCategory("");
          setAttachment(null);
          setUrl("");
          setContent("");

          navigate("/");
        });
      } else {
        throw new Error("게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        title: "에러!",
        icon: "error",
        html: `게시물을 등록하던 중 에러가 발생했어요!<br>잠시 후, 다시 시도해주세요!`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <Box p={2}>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: '1.3rem' }}>
        <Grid item xs={3} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="category-label">카테고리</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={handleCategoryChange}
            >
              <MenuItem value={"동아리 행사 공지"}>동아리 행사
              공지</MenuItem>
              <MenuItem value={"전체 공지"}>전체 공지</MenuItem>
              <MenuItem value={"부원 모집"}>부원 모집</MenuItem>
              <MenuItem value={"활동 사진"}>활동 사진</MenuItem>
              <MenuItem value={"활동 영상"}>활동 영상</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9} sm={10}>
          <TextField
            label="제목"
            value={title}
            onChange={handleTitleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      {category === "활동 영상" ? (
        <TextField
          label="유튜브 URL"
          value={url}
          onChange={handleUrlChange}
          fullWidth
        />
      ) : (
        <>
          <QuillEditor ref={conRef} />
        </>
      )}
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          게시글 등록
        </Button>
      </Box>
    </Box>
  );
};

export default Editor;
