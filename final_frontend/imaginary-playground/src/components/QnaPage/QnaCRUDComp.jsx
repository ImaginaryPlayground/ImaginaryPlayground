import { Button, Divider, Grid, TextField, useMediaQuery } from "@mui/material";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../../css/QnaPage/QnaCRUDComp.css";
import axios from "axios";
import { config } from "../../util/config";
import { loginUserToken } from "../../util/token";

const QnaCRUDComp = ({ isEdit }) => {
  const loginUserDataReducer = useSelector((state) => {
    return state.loginUserDataReducer;
  });

  const nowDate = new Date();

  const nowDateConvert =
    nowDate.getFullYear() +
    "-" +
    `${parseInt(nowDate.getMonth(), 10) + 1}` +
    "-" +
    nowDate.getDate() +
    " " +
    nowDate.getHours() +
    ":" +
    nowDate.getMinutes() +
    ":" +
    nowDate.getSeconds();

  const selectedQnaDataReducer = useSelector(
    (state) => state.QnaPageSelectedDataReducer
  );
  const [selectedQnaData, setSelectedQnaData] = useState(
    isEdit
      ? selectedQnaDataReducer
      : {
          title: "",
          content: "",
          username: loginUserDataReducer.username,
          completed: false,
          email: loginUserDataReducer.email,
          created_date: nowDateConvert,
          modified_date: nowDateConvert,
        }
  );

  const [answerData, setAnswerData] = useState({});

  const navigate = useNavigate();
  const isMobile_780 = useMediaQuery("(max-width:780px)");
  const titleInput = useRef();
  const contentInput = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      //특정 글에 대한 정보와 그에 대한 답변을 불러온다.
      axios({
        url: `${config.api}/question/lookup/${selectedQnaData.id}`, //마지막은 페이지번호
        method: "GET",
        headers: {
          Auth: loginUserToken,
        }, //헤더에 토큰
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (!loginUserDataReducer) {
      navigate("/login");
      return;
    } else if (isEdit && !selectedQnaData.title) {
      navigate(-1);
      return;
    }

    if (isEdit && selectedQnaData.completed) {
      setAnswerData({
        admin_id: 1,
        content:
          "안녕하세요. 해당 문의글 잘 읽어 보았습니다. 해당 문제는 현재 기술팀에서 알아보고 있는 중입니다. 잠시만 기다려 주시면 감사하겠습니다.",
        created_date: "2022-08-01 22:09:30",
        modified_date: "2022-08-01 22:09:30",
      });
    }
  }, []);

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

    //이미 처리된 글이라면 수정 불가
    if (selectedQnaData.completed) {
      return;
    }

    swal({
      title: "",
      text: `정말로 ${isEdit ? "수정" : "작성"}하시겠습니까?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //비동기 통신(글작성 or 수정)
        if (isEdit) {
          //수정상태라면
          axios({
            url: `${config.api}/question/`,
            method: "PUT",
            headers: {
              Auth: loginUserToken,
            }, //헤더에 토큰
            data: {
              id: selectedQnaData.id,
              title: selectedQnaData.title,
              content: selectedQnaData.content,
            },
          })
            .then((res) => {
              console.log(res);
              if (res.data.status === "SUCCESS") {
                dispatch({
                  type: "SET_SELECTED_QNADATA",
                  data: selectedQnaData,
                });
                swal({
                  title: "성공!",
                  text: "글 수정이 완료되었습니다.",
                  icon: "success",
                });
              } else {
                swal({
                  title: "에러!",
                  text: "글 수정중 오류가 발생했습니다.",
                  icon: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          //작성상태라면

          axios({
            url: `${config.api}/question/`, //마지막은 페이지번호
            method: "POST",
            headers: { Auth: loginUserToken }, //헤더에 토큰
            data: {
              title: selectedQnaData.title,
              content: selectedQnaData.content,
            },
          })
            .then((res) => {
              console.log(res);
              if (res.data.status === "SUCCESS") {
                const createdQnaData = {
                  ...selectedQnaData,
                  created_date: res.data.data.created_date,
                  modified_date: res.data.data.modified_date,
                  id: res.data.data.id,
                };
                setSelectedQnaData({
                  ...createdQnaData,
                });
                dispatch({
                  type: "SET_SELECTED_QNADATA",
                  data: createdQnaData,
                });
                swal("성공", "문의글이 생성되었습니다.", "success").then(() => {
                  navigate("/qnadetailpage");
                });
              } else {
                swal("에러!", "문의글 생성에 실패하였습니다.", "error");
              }
            })
            .catch((err) => {
              console.log(err);
              alert("서버 통신 에러");
            });
        }
      }
    });
  };

  const handleDeleteQnaData = () => {
    //질문 삭제 버튼
    axios({
      url: `${config.api}/question`, //마지막은 페이지번호
      method: "DELETE",
      headers: "", //헤더에 토큰
      data: {
        id: selectedQnaData.id,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid className="QnaCRUDComp">
      {isEdit && (
        <Grid
          item
          mb={3}
          p={1}
          width={"100%"}
          textAlign="center"
          sx={{ fontSize: "25px" }}
        >
          <Grid item>
            <span>
              해당 문의는
              <span
                className={
                  selectedQnaDataReducer.completed
                    ? ["compeleted_after"].join(" ")
                    : ["compeleted_before"].join(" ")
                }
              >
                {selectedQnaDataReducer.completed ? "처리완료" : "처리 전"}
              </span>
              상태 입니다.
            </span>
          </Grid>
          <Grid>
            {!selectedQnaDataReducer.completed ? (
              <span>
                내용 수정이 <span className="modified_ok">가능</span>합니다.
              </span>
            ) : (
              <span>
                내용 수정이 <span className="modified_ban">불가</span>합니다.
              </span>
            )}
          </Grid>
        </Grid>
      )}
      <Grid
        item
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        mb={4}
      >
        <Grid
          item
          display={"flex"}
          alignItems={"center"}
          onClick={() => {
            navigate("/qnapage");
          }}
        >
          <Button variant="outlined" color="main" size="large">
            <LowPriorityIcon />
            <span
              style={{
                display: "block",
                color: "#ad1457",
                fontWeight: "bold",
              }}
            >
              목록
            </span>
          </Button>
        </Grid>
        {isEdit && (
          <Grid item textAlign="end">
            <Grid className="qna_date">
              <span style={{ marginRight: "5px" }} className="text_custom">
                작성일
              </span>
              <span className="text_custom_date">{`${
                selectedQnaData.created_date.split(".")[0]
              }`}</span>
            </Grid>
            {selectedQnaData.created_date !== selectedQnaData.modified_date && (
              <Grid item mt={1}>
                <span style={{ marginRight: "5px" }} className="text_custom">
                  마지막 수정일
                </span>
                <span className="text_custom_date">{`${
                  selectedQnaData.modified_date.split(".")[0]
                }`}</span>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
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
      <Grid item my={1}>
        <TextField
          color="main"
          value={loginUserDataReducer?.hospital_name}
          sx={isMobile_780 ? { width: "80%" } : { width: "50%" }}
          placeholder="병원이름"
          disabled
        />
      </Grid>
      <Grid item my={1}>
        <TextField
          color="main"
          value={loginUserDataReducer?.hospital_address}
          sx={isMobile_780 ? { width: "100%" } : { width: "80%" }}
          placeholder="병원주소"
          disabled
        />
      </Grid>

      <Grid item my={1} mb={0}>
        <TextField
          color="main"
          value={selectedQnaData.title}
          sx={{ width: "100%" }}
          placeholder="제목"
          multiline
          rows={2}
          onChange={!selectedQnaData.completed ? handleOnChangeData : () => {}}
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
          rows={8}
          value={selectedQnaData.content}
          sx={{ width: "100%" }}
          placeholder="문의 내용"
          onChange={!selectedQnaData.completed ? handleOnChangeData : () => {}}
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
      <Divider sx={{ marginTop: "20px" }} />
      {!selectedQnaData.completed ? (
        <Grid item my={1} width={"100%"} height="50px">
          <Button
            disabled={selectedQnaData.completed === 1}
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
              {isEdit ? "수정하기" : "제출하기"}
            </span>
          </Button>
        </Grid>
      ) : (
        <Grid
          item
          p={2}
          sx={{
            borderRadius: "5px",
            backgroundColor: "palevioletred",
            color: "white",
          }}
          my={4}
        >
          <h4 style={{ marginBottm: "5px" }}>
            <span
              style={{
                display: "block",
                marginBottom: "5px",
                textAlign: "start",
                paddingLeft: "5px",
                fontSize: "20px",
              }}
            >
              담당자 답변
            </span>

            <span style={{ display: "block", textAlign: "end" }}>
              <span style={{ marginRight: "5px" }}>답변일:</span>
              {answerData.created_date}
            </span>
          </h4>
          <Divider color="white" />
          <Grid item py={3}>
            <span style={{ wordBreak: "keep-all", fontSize: "17px" }}>
              {answerData.content}
            </span>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default QnaCRUDComp;
