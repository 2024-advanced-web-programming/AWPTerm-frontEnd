import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Grid } from "@mui/material";
import QuillEditor from "./quillEditor";
import axios from "axios";

const Editor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

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
    console.log(content);
    console.log(title);
    console.log(category);

    // 데이터 유효성 검사
    if (!title || !category || !content) {
      alert("제목, 카테고리, 내용은 필수 입력 사항입니다.");
      return;
    }

    // 서버에 보낼 데이터 준비
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);

    if (category === "활동 영상") {
      formData.append("url", url);
    } else {
      formData.append("attachment", attachment);
    }

    try {
      // 서버 POST 요청
      const response = await axios.post("https://your-server-endpoint.com/post", formData);

      if (response.status === 200) {
        alert("게시글이 성공적으로 등록되었습니다.");
        // 등록 후 필요한 작업 수행 (예: 리디렉션, 상태 초기화 등)
        setTitle("");
        setCategory("");
        setAttachment(null);
        setUrl("");
        setContent("");
      } else {
        throw new Error("게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      alert("게시글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Error:", error);
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
          <QuillEditor onContentChange={handleContentChange} />
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
