import React, { useEffect, useRef } from "react";
import axios from "axios";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_CLIENT_ID,
  REDIRECT_URI,
} from "../../components/Oauth/Oauth.jsx";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "../../css/LoginPage/LoginPage.css";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    main: {
      main: "#ad1457",
    },
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[800]),
  backgroundColor: pink[800],
  "&:hover": {
    backgroundColor: pink[600],
  },
}));

const { naver } = window;

const LoginPage = () => {
  const [isSaveUserId, setIsSaveUserId] = useState(false);
  const [loginUserInfo, setLoginUserInfo] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [errorChecking, setErrorChecking] = useState({
    select_userEmail: false,
    select_userPassword: false,
  });

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_AUTH_CLIENT_ID,
      callbackUrl: REDIRECT_URI,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 1, height: "64" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const handleFocusInput = (e) => {
    setErrorChecking({
      ...errorChecking,
      [`select_${e.target.name}`]: true,
    });
  };

  const userEmailInput = useRef();
  const userPasswordInput = useRef();

  const handleSubmit = () => {
    for (const key in errorChecking) {
      errorChecking[key] = true;
    }
    userEmailInput.current.focus();
    userPasswordInput.current.focus();

    if (!loginUserInfo.userEmail) {
      userEmailInput.current.focus();
      return;
    }
    if (!loginUserInfo.userPassword) {
      userPasswordInput.current.focus();
      return;
    }

    //비동기 처리
    axios({
      url: `/user/login`,
      method: "POST",
      data: {
        email: loginUserInfo.userEmail,
        password: loginUserInfo.userPassword,
      },
    }).then((res) => console.log(res));
  };

  const handleChangeInput = (e) => {
    setLoginUserInfo({ ...loginUserInfo, [e.target.name]: e.target.value });
  };
  return (
    <Grid
      className="LoginPage"
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      display="flex"
      container
    >
      <Grid item className="login_banner">
        <h1>상상 놀이터</h1>
        <h3 style={{ wordBreak: "keep-all" }}>
          상상 놀이터를 위해 소아암 환자들을 등록 및 관리할 수 있는 병원용 웹
          플랫폼
        </h3>
      </Grid>
      <Grid item>
        <h2>로그인이 필요합니다.</h2>
      </Grid>
      <Grid item className="signin_form">
        <FormControl className="signin_form_control">
          <ThemeProvider theme={theme}>
            <TextField
              name="userEmail"
              inputRef={userEmailInput}
              value={loginUserInfo.userEmail}
              onChange={handleChangeInput}
              color="main"
              id="outlined-basic"
              label="이메일"
              variant="outlined"
              onBlur={handleFocusInput}
              error={errorChecking.select_userEmail && !loginUserInfo.userEmail}
            />
          </ThemeProvider>
        </FormControl>
      </Grid>
      <Grid item className="signin_form">
        <FormControl className="signin_form_control">
          <ThemeProvider theme={theme}>
            <TextField
              inputRef={userPasswordInput}
              value={loginUserInfo.userPassword}
              onChange={handleChangeInput}
              name="userPassword"
              color="main"
              className="password_form"
              id="outlined-password-input"
              label="패스워드"
              type="password"
              autoComplete="current-password"
              onBlur={handleFocusInput}
              error={
                errorChecking.select_userPassword && !loginUserInfo.userPassword
              }
            />
          </ThemeProvider>
        </FormControl>
      </Grid>
      <Grid item mt={1} className="signin_form_function">
        <FormControlLabel
          control={
            <Checkbox
              value={isSaveUserId}
              onClick={() => {
                setIsSaveUserId(!isSaveUserId);
              }}
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600],
                },
                fontFamily: "IBM Plex Sans KR",
              }}
            />
          }
          label="아이디 저장"
        />
        <Grid item>
          <Link to={"/signup"} className="link">
            회원가입
          </Link>
        </Grid>
      </Grid>
      <Grid item className="login_btn_wrapper">
        <ColorButton
          onClick={handleSubmit}
          variant="outlined"
          className="login_btn"
        >
          <span style={{ fontWeight: "bold" }}>로그인</span>
        </ColorButton>
      </Grid>
      <Grid item mt={2}>
        <h5>sns로 간편 로그인/회원가입</h5>
      </Grid>
      <Grid item className="sns_login_btn">
        <img
          src="/iconFolder/SnsLogin/kakao-talk.png"
          alt="카카오톡"
          onClick={() => {
            window.location.href = KAKAO_AUTH_URL;
          }}
        />

        <img
          src="/iconFolder/SnsLogin/free-icon-google.png"
          alt="구글"
          onClick={() => {
            window.location.href = GOOGLE_AUTH_URL;
          }}
        />
        <div id="naverIdLogin">
          <img
            src="/iconFolder/SnsLogin/naver_icon_1.png"
            width="64px"
            height="64px"
            alt="네이버"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
