import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "../../css/UserPage/UserInfoComp.css";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import swal from "sweetalert";
import axios from "axios";
import { config } from "../../util/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserToken } from "../../util/token";
import { useDispatch } from "react-redux";

const UserInfoComp = () => {
  const [loginUserData, setLoginUserData] = useState({});
  const loginUserDataReducer = useSelector(
    (state) => state.loginUserDataReducer
  );
  const [modifyName, setmodifyName] = useState(loginUserDataReducer.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      url: `${config.api}/user`,
      method: "GET",
      headers: { Auth: loginUserToken }, //헤더에 토큰
    })
      .then((res) => {
        console.log(res); //이메일, 이름, 가입일자 , 가입경로, 병원이름, 병원주소, 재직 증명서(이미지)
        if (res.data.status === "SUCCESS") {
          const loginUserData = {
            id: res.data.data.id,
            email: res.data.data.email,
            username: res.data.data.username,
            join_data: res.data.data.join_data,
            provider: res.data.data.provider,
            hospital_id: res.data.data.hospital_id,
            hospital_name: res.data.data.hospital_name,
            hospital_address: res.data.data.hospital_address || "",
            document: res.data.data.document,
          };
          dispatch({ type: "SET_LOGIN_USER", data: loginUserData });
        } else {
          swal({
            title: "에러",
            text: "유저 정보를 불러오지 못했습니다.",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("서버 통신 에러!");
      });
  }, []);

  const nameInput = useRef();
  const handleUserInfoChange = (e) => {
    setmodifyName(e.target.value);
  };

  const handleOnModifyBtn = (e) => {
    if (!modifyName.length) {
      nameInput.current.focus();
      return;
    }

    swal({
      title: "회원 정보 수정",
      text: `수정하시겠습니까?`,
      icon: "warning",
      buttons: true,
    }).then((ok) => {
      if (ok) {
        //비동기 통신(수정)
        axios({
          url: `${config.api}/user`, //마지막은 페이지번호
          method: "PUT",
          headers: {
            Auth: loginUserToken,
          }, //헤더에 토큰
          data: {
            username: modifyName,
          },
        })
          .then((res) => {
            console.log(res); //success
            if (res.data.status === "SUCCESS") {
              swal("수정이 완료 되었습니다.", {
                icon: "success",
              });
            } else {
              swal("오류가 발생 하였습니다.", {
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleOnWithdrawal = () => {
    swal({
      title: "회원 탈퇴",
      text: `정말로 회원 탈퇴하시겠습니까?`,
      icon: "warning",
      buttons: true,
    }).then((ok) => {
      if (ok) {
        //비동기 통신(회원 탈퇴)
        axios({
          url: `${config.api}/user`, //마지막은 페이지번호
          method: "DELETE",
          headers: {
            Auth: loginUserToken,
          }, //헤더에 토큰
        })
          .then((res) => {
            console.log(res);
            if (res.data.status === "SUCCESS") {
              swal("탈퇴가 완료 되었습니다.", {
                icon: "success",
              }).then(() => {
                //세션스토리지에 있는 토큰값 삭제
                sessionStorage.removeItem("token");
                //로그인으로 이동
                navigate("/login");
              });
            } else {
              swal({
                title: "에러",
                text: `회원 탈퇴에 실패하였습니다.`,
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            alert("서버 통신 에러");
          });
      }
    });
    //회원정보 수정 비동기 통신
  };
  return (
    <Grid className="UserInfoComp">
      <Grid width={"100%"} item display={"flex"} justifyContent="end">
        <span
          style={{
            color: "#424242",
            cursor: "pointer",
            textDecoration: "underline",
            display: "flex",
            alignItems: "center",
          }}
          onClick={handleOnWithdrawal}
        >
          <span style={{ color: "#424242", marginRight: "2px" }}>탈퇴하기</span>
          <PersonRemoveIcon />
        </span>
      </Grid>
      <Grid item className="total_userinfo_input_box">
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span style={{ display: "block" }}>이메일</span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              size="small"
              value={loginUserDataReducer.email.split("@")[0]}
            />
            <span>@</span>
            <TextField
              color="main"
              size="small"
              value={loginUserDataReducer.email.split("@")[1]}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span style={{ display: "block" }}>이름</span>
            <span style={{ fontSize: "13px", color: "#757575" }}>
              *수정 가능
            </span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              focused
              size="small"
              sx={{ width: "100%" }}
              value={modifyName}
              onChange={handleUserInfoChange}
              placeholder="이름을 입력해 주세요"
              inputRef={nameInput}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span>가입 일자</span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              size="small"
              sx={{ width: "100%" }}
              type="date"
              disabled
              value={loginUserDataReducer.join_data}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span>가입 경로</span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              size="small"
              sx={{ width: "100%" }}
              disabled
              value={loginUserDataReducer.provider}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span>병원 이름</span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              size="small"
              sx={{ width: "100%" }}
              value={loginUserDataReducer.hospital_name}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span>병원 주소</span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              size="small"
              sx={{ width: "100%" }}
              value={loginUserDataReducer.hospital_address}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span>재직 증명서</span>
          </Grid>
          <Grid item className="input_box">
            <img
              src={loginUserDataReducer.document}
              alt="재직증명서"
              width={"100%"}
              style={{ backgroundColor: "#E4E4E4" }}
            />
          </Grid>
        </Grid>
        <Grid item className="modify_btn">
          <Button
            variant="contained"
            color="main"
            sx={{ width: "100%", paddingTop: "10px", paddingBottom: "10px" }}
            onClick={handleOnModifyBtn}
          >
            <span
              style={{
                fontFamily: "IBM Plex Sans KR",
                color: "white",
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              회원 정보 수정
            </span>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserInfoComp;
