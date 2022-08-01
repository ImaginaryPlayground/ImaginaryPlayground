import { Button, Divider, Grid, TextField, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../css/QnaPage/QnaCRUDComp.css";

const QnaCRUDComp = ({ isEdit }) => {
  const currentLoginUser = useSelector((state) => state.loginUserDataReducer);
  const selectedQnaDataRedux = useSelector(
    (state) => state.QnaPageSelectedDataReducer
  );
  const [selectedQnaData, setSelectedQnaData] = useState(
    isEdit
      ? selectedQnaDataRedux
      : {
          title: "",
          content: "",
          username: currentLoginUser.username,
          completed: false,
          email: currentLoginUser.email,
        }
  );

  const [answerData, setAnswerData] = useState({});

  const navigate = useNavigate();
  const isMobile_780 = useMediaQuery("(max-width:780px)");
  const titleInput = useRef();
  const contentInput = useRef();

  useEffect(() => {
    if (!currentLoginUser) {
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
    if (selectedQnaDataRedux.completed) {
      return;
    }

    //비동기 처리
  };

  return (
    <Grid className="QnaCRUDComp">
      {isEdit && (
        <Grid
          item
          mb={4}
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
                  selectedQnaDataRedux.completed
                    ? ["compeleted_after"].join(" ")
                    : ["compeleted_before"].join(" ")
                }
              >
                {selectedQnaDataRedux.completed ? "처리완료" : "처리 전"}
              </span>
              상태 입니다.
            </span>
          </Grid>
          <Grid>
            {!selectedQnaDataRedux.completed ? (
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
          value={currentLoginUser?.hospital_name}
          sx={isMobile_780 ? { width: "80%" } : { width: "50%" }}
          placeholder="병원이름"
          disabled
        />
      </Grid>
      <Grid item my={1}>
        <TextField
          color="main"
          value={currentLoginUser?.hospital_address}
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
          onChange={
            !selectedQnaDataRedux.completed ? handleOnChangeData : () => {}
          }
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
          onChange={
            !selectedQnaDataRedux.completed ? handleOnChangeData : () => {}
          }
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

      {!selectedQnaData.completed ? (
        <Grid item my={1} width={"100%"} height="50px">
          <Button
            disabled={selectedQnaData.completed}
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
            backgroundColor: "#ca3e47",
            color: "white",
          }}
          my={4}
        >
          <h4>
            <span
              style={{
                display: "block",
                marginBottom: "5px",
                textAlign: "start",
                paddingLeft: "5px",
              }}
            >
              담당자 답변
            </span>
            <span style={{ display: "block", textAlign: "end" }}>
              {answerData.created_date}
            </span>
          </h4>
          <Divider color="white" />
          <Grid item py={3}>
            <span style={{ wordBreak: "keep-all" }}>{answerData.content}</span>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default QnaCRUDComp;
