import { Button, Grid, TextField, useMediaQuery } from "@mui/material";
import React, { useRef, useState } from "react";
import "../../css/QnaPage/QnaCRUDComp.css";

const QnaCRUDComp = ({ isEdit }) => {
  const [selectedQnaData, setSelectedQnaData] = useState({
    username: "유지홍",
    email: "jimdac@naver.com",
    title: "",
    content: "",
  });

  const isMobile_780 = useMediaQuery("(max-width:780px)");
  const titleInput = useRef();
  const contentInput = useRef();

  const handleOnChangeData = (e) => {
    if (e.target.name === "title" && e.target.value.length > 100) {
      return;
    }
    if (e.target.name === "content" && e.target.value.length > 1000) {
      return;
    }

    setSelectedQnaData({ ...selectedQnaData, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = () => {
    if (!selectedQnaData.title.length) {
      titleInput.current.focus();
      return;
    }

    if (!selectedQnaData.content.length) {
      contentInput.current.focus();
      return;
    }
  };

  return (
    <Grid className="QnaCRUDComp">
      <Grid item my={1}>
        <TextField
          color="main"
          value={selectedQnaData.username}
          sx={isMobile_780 ? { width: "80%" } : { width: "50%" }}
          placeholder="이름"
          disabled
        />
      </Grid>
      <Grid item my={1}>
        <TextField
          color="main"
          value={selectedQnaData.email}
          sx={isMobile_780 ? { width: "80%" } : { width: "50%" }}
          placeholder="이메일"
          disabled
        />
      </Grid>
      <Grid item my={1} mb={0}>
        <TextField
          color="main"
          value={selectedQnaData.title}
          sx={{ width: "100%" }}
          placeholder="제목"
          onChange={handleOnChangeData}
          name="title"
          inputRef={titleInput}
          focused
        />
      </Grid>
      <Grid item textAlign="end">
        <span className="text_length_check">
          {selectedQnaData.title.length}자/최대 100자
        </span>
      </Grid>
      <Grid item my={1} mb={0}>
        <TextField
          color="main"
          multiline
          rows={7}
          value={selectedQnaData.content}
          sx={{ width: "100%" }}
          placeholder="문의 내용"
          onChange={handleOnChangeData}
          name="content"
          inputRef={contentInput}
          focused
        />
      </Grid>
      <Grid item textAlign="end">
        <span className="text_length_check">
          {selectedQnaData.content.length}자/최대 1000자
        </span>
      </Grid>
      <Grid item my={1} width={"100%"} height="50px">
        <Button
          onClick={handleOnSubmit}
          variant="contained"
          color="main"
          sx={
            isMobile_780
              ? { width: "100%", height: "50px" }
              : { width: "50%", height: "50px" }
          }
        >
          <span
            style={{ fontWeight: "bold", color: "white", fontSize: "16px" }}
          >
            제출하기
          </span>
        </Button>
      </Grid>
    </Grid>
  );
};

export default QnaCRUDComp;
