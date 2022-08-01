import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

import "../../css/AdminPage/UserInquiryModal.css";

const UserInquiryModal = ({
  selectedInquiry,
  setSelectedInquiry,
  setAllInquiry,
  allInquiry,
}) => {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    //만약 답변이 존재할 경우 답변을 비동기로 가져온다.
    setAnswer("");
  }, []);

  const handleAnswerSubmit = () => {
    const text =
      selectedInquiry.process_state === "처리 완료"
        ? "정말로 답변을 수정하시겠습니까?"
        : "정말로 답변을 등록하시겠습니까?";
    swal({
      title: "",
      text: `${text}`,
      icon: "warning",
      buttons: true,
    }).then((Ok) => {
      if (Ok) {
        setSelectedInquiry({
          ...selectedInquiry,
          process_state: "처리 완료",
        });
        setAllInquiry(
          allInquiry.map((it) => {
            return it.id === selectedInquiry.id
              ? { ...it, process_state: "처리 완료" }
              : it;
          })
        );

        //비동기 통신(답변 수정 or 등록)
        //전체 승인된 전체 회원 개수
        axios({
          url: "answer", //마지막은 페이지번호
          method: "POST",
          headers: {
            token: "", //로그인이됐으면 요청
          },
          data: {
            admin_id: 0,
            content: "", //검색할 제목, 내용
            question_id: 0, //답변다는 글id
          },
          //전체 개수 주는 API 만들기
        }).then((res) => {
          console.log(res);
        });

        swal("답변이 정상적으로 수정되었습니다.!", {
          icon: "success",
        });
      }
    });
  };
  return (
    <Grid className="UserInquiryModal">
      <Grid item className="row_flex bt_5" width={"100%"}>
        <Grid className="bg_gray title_center" width={"20%"}>
          <span>id</span>
        </Grid>
        <Grid p={2} className="title_center">
          {selectedInquiry.id}
        </Grid>
      </Grid>
      <Grid item className="row_flex bt_5" width={"100%"}>
        <Grid className="bg_gray title_center" width={"20%"}>
          <span>이름</span>
        </Grid>
        <Grid p={2} className="title_center">
          {selectedInquiry.name}
        </Grid>
      </Grid>
      <Grid item className="row_flex bt_5" width={"100%"}>
        <Grid className="bg_gray title_center" width={"20%"}>
          <span>이메일</span>
        </Grid>
        <Grid p={2} className="title_center">
          {selectedInquiry.email}
        </Grid>
      </Grid>
      <Grid item className="row_flex bt_5" width={"100%"}>
        <Grid className="bg_gray title_center" width={"20%"}>
          <span>제목</span>
        </Grid>
        <Grid
          p={2}
          sx={{ wordBreak: "keep-all" }}
          width={"80%"}
          className="title_center"
        >
          {selectedInquiry.title}
        </Grid>
      </Grid>
      <Grid item className="row_flex bt_5" width={"100%"}>
        <Grid className="bg_gray title_center" width={"20%"}>
          <span>내용</span>
        </Grid>
        <Grid
          p={2}
          sx={{ wordBreak: "keep-all" }}
          width={"80%"}
          className="title_center"
        >
          {selectedInquiry.content}
        </Grid>
      </Grid>
      <Grid item className="row_flex bt_5" width={"100%"}>
        <Grid className="bg_gray title_center" width={"20%"}>
          <span>처리 상태</span>
        </Grid>
        <Grid p={1} pl={2} width={"80%"} className="title_center">
          {selectedInquiry.process_state}
        </Grid>
      </Grid>
      <Grid item className="row_flex bt_5" width={"100%"}>
        <Grid className="bg_gray title_center" width={"20%"}>
          <span>등록 일자</span>
        </Grid>
        <Grid p={1} pl={2} width={"80%"} className="title_center">
          {selectedInquiry.inquiry_date}
        </Grid>
      </Grid>
      <Grid item className="row_flex bt_5" width={"100%"}>
        <Grid className="bg_gray title_center" width={"20%"}>
          <span>답변</span>
        </Grid>
        <Grid p={1} pl={2} width={"80%"} className="title_center bb_5">
          <TextField
            id="standard-multiline-static"
            placeholder="답변을 등록해주세요"
            multiline
            rows={7}
            variant="standard"
            defaultValue={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        mt={1}
        width={"100%"}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          onClick={(e) => {
            handleAnswerSubmit(e);
          }}
        >
          {selectedInquiry.process_state === "처리 완료" ? (
            <span
              style={{ fontFamily: "IBM Plex Sans KR", fontWeight: "bold" }}
            >
              답변 수정
            </span>
          ) : (
            <span
              style={{ fontFamily: "IBM Plex Sans KR", fontWeight: "bold" }}
            >
              답변 등록
            </span>
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserInquiryModal;
