import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";

import "../../css/AdminPage/UserInquiryModal.css";
import { config } from "../../util/config";

const UserInquiryModal = ({
  selectedInquiry,
  setSelectedInquiry,
  setIsAnswerUpdate,
  isAnswerUpdate,
}) => {
  const [answer, setAnswer] = useState({});
  const loginUserDataReducer = useSelector(
    (state) => state.loginUserDataReducer
  );
  const loginUserToken = localStorage.getItem("token");

  useEffect(() => {
    //해당 정보의 답변 데이터 불러오기
    axios({
      url: `${config.api}/answer/detail/${selectedInquiry.id}`, //마지막은 페이지번호
      method: "GET",
      headers: {
        Auth: loginUserToken, //로그인이됐으면 요청
      },
      //전체 개수 주는 API 만들기
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === "SUCCESS") {
          setAnswer(res.data.data);
        } else if (res.data.status === "NULL") {
        } else {
          swal("에러", "답변을 불러오지 못했습니다.!", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("서버 통신 에러!");
      });
  }, []);

  const handleAnswerSubmit = () => {
    const text =
      selectedInquiry.completed === "처리 완료"
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
          completed: "처리 완료",
        });

        //비동기 통신(답변 수정 or 등록)
        //전체 승인된 전체 회원 개수

        if (selectedInquiry.completed === "처리 전") {
          axios({
            url: `${config.api}/answer/`, //마지막은 페이지번호
            method: "POST",
            headers: {
              Auth: loginUserToken, //로그인이됐으면 요청
            },
            data: {
              question_id: selectedInquiry.id,
              content: answer.content, //검색할 제목, 내용
            },
            //전체 개수 주는 API 만들기
          })
            .then((res) => {
              console.log(res);
              if (res.data.status === "SUCCESS") {
                swal("성공", "답변이 정상적으로 등록되었습니다.!", "success");
                setIsAnswerUpdate(!isAnswerUpdate);
              } else {
                swal("에러", "답변이 등록되지 못했습니다!", "error");
              }
            })
            .catch((err) => {
              console.log(err);
              alert("서버 통신 에러!");
            });
        } else {
          axios({
            url: `${config.api}/answer/`, //마지막은 페이지번호
            method: "PUT",
            headers: {
              Auth: loginUserToken, //로그인이됐으면 요청
            },
            data: {
              content: answer.content, //검색할 제목, 내용
              question_id: selectedInquiry.id, //답변다는 글id
              id: answer.id,
            },
            //전체 개수 주는 API 만들기
          })
            .then((res) => {
              console.log(res);
              if (res.data.status === "SUCCESS") {
                swal("성공", "답변이 정상적으로 수정되었습니다.!", "success");
              } else {
                swal("에러", "답변을 수정하지 못했습니다.!", "error");
              }
            })
            .catch((err) => {
              console.log(err);
              alert("서버 통신 에러!");
            });
        }
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
          {selectedInquiry.username}
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
          {selectedInquiry.completed}
        </Grid>
      </Grid>
      <Grid item className="row_flex bt_5" width={"100%"}>
        <Grid className="bg_gray title_center" width={"20%"}>
          <span>등록 일자</span>
        </Grid>
        <Grid p={1} pl={2} width={"80%"} className="title_center">
          {selectedInquiry.created_date}
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
            value={answer?.content}
            onChange={(e) => {
              setAnswer({
                ...answer,
                content: e.target.value,
              });
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
          {selectedInquiry.completed === "처리 완료" ? (
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
