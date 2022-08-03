import {
  Button,
  createTheme,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import styled from "@emotion/styled";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import InputError from "../../components/InputError/InputError";
import "../../css/SignUpPage/SignUpPage.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { config } from "../../util/config";

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

//SignUpPage 시작
const SignUpPage = () => {
  // 이메일 유효성 정규식
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  // 비밀번호 유효성 정규식(영문,숫자를 포함한 8자 이상)
  const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}/;
  // 공백 체크 정규식
  const whiteSpaceRegExp = /[^A-Za-z가-힣]/;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailUrlFocus = useRef();
  const emailIdFocus = useRef();
  const password_1Focus = useRef();
  const password_2Focus = useRef();
  const nameFocus = useRef();

  const [checkEmailVerify, setCheckEmailVerify] = useState(false);

  const [userInfo, setUserInfo] = useState({
    emailId: "",
    emailUrl: "require_select",
    emailDirectUrl: "",
    password_1: "",
    password_2: "",
    name: "",
  });
  const [errorChecking, setErrorChecking] = useState({
    select_emailId: false,
    select_emailUrl: false,
    select_emailDirectUrl: false,
    select_password_1: false,
    select_password_2: false,
    select_name: false,
  });
  const [regExpChecking, setRegExpChecking] = useState({
    regExp_email: false,
    regExp_password_1: false,
    regExp_password_2: false,
    regExp_name: false,
  });

  const emailEffectivenessCheck =
    !userInfo.emailId ||
    userInfo.emailUrl === "require_select" ||
    (userInfo.emailUrl === "direct" && !userInfo.emailDirectUrl) ||
    !regExpChecking.regExp_email;

  const handleOnClickEmailAuth = () => {
    console.log(
      `${userInfo.emailId}@${
        userInfo.emailDirectUrl ? userInfo.emailDirectUrl : userInfo.emailUrl
      }`
    );
    //비동기 처리 이메일인증번호 요청
    axios({
      url: `${config.api}/user/authEmail/send`,
      method: "POST",
      data: {
        email: `${userInfo.emailId}@${
          userInfo.emailDirectUrl ? userInfo.emailDirectUrl : userInfo.emailUrl
        }`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });

    //이메일 인증번호 확인처리
    // axios({
    //   url: `/user/authEmail/receive`,
    //   method: "POST",
    //   data: {
    //     code: "", //code값 처리
    //     email: `${userInfo.emailId}@${
    //       userInfo.emailDirectUrl ? userInfo.emailDirectUrl : userInfo.emailUrl
    //     }`,
    //   },
    // }).then((res) => console.log(res));
    //결과 status:{SUCESS, FAIL}
  };

  const handleSubmit = () => {
    //모든 input 창을 선택으로 바꾼다.
    for (const key in errorChecking) {
      errorChecking[key] = true;
    }
    //모두 focus상태로 만들어준다.
    emailIdFocus.current.focus();
    password_1Focus.current.focus();
    password_2Focus.current.focus();
    nameFocus.current.focus();

    // 1. 이메일 유효성 검증
    if (
      !userInfo.emailId.length ||
      userInfo.emailUrl === "require_select" ||
      (userInfo.emailUrl === "direct" && !userInfo.emailDirectUrl) ||
      !regExpChecking.regExp_email
    ) {
      emailIdFocus.current.focus();
      return;
      // 2. 패스워드1 유효성 검증
    } else if (
      !userInfo.password_1.length ||
      !regExpChecking.regExp_password_1
    ) {
      password_1Focus.current.focus();
      return;
      // 3. 패스워드2 유효성 검증
    } else if (
      !userInfo.password_2.length ||
      !regExpChecking.regExp_password_2
    ) {
      password_2Focus.current.focus();
      return;
      // 4. 이름유효성 검증
    } else if (!userInfo.name.length || !regExpChecking.regExp_name) {
      nameFocus.current.focus();
      return;
    }

    if (!checkEmailVerify) {
      swal("이메일 인증 필요", "이메일 인증이 필요합니다.", "error");
      return;
    }

    //리덕스에 저장 후 middlepage로 넘어간다.
    dispatch({
      type: "SET_SIGNUP_USER",
      data: {
        email: `${userInfo.emailId}@${
          userInfo.emailDirectUrl ? userInfo.emailDirectUrl : userInfo.emailUrl
        }`,
        username: userInfo.name,
        password: userInfo.password_1,
      },
    });
    navigate("/middlepage");
  };

  const handleChangeInput = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password_1") {
      passwordRegExp.test(e.target.value) && e.target.value.length <= 20
        ? setRegExpChecking({
            ...regExpChecking,
            regExp_password_1: true,
          })
        : setRegExpChecking({
            ...regExpChecking,
            regExp_password_1: false,
          });
    } else if (e.target.name === "password_2") {
      userInfo.password_1 !== e.target.value
        ? setRegExpChecking({
            ...regExpChecking,
            regExp_password_2: false,
          })
        : setRegExpChecking({
            ...regExpChecking,
            regExp_password_2: true,
          });
    } else if (e.target.name === "name") {
      !e.target.value.length ||
      e.target.value.length > 15 ||
      whiteSpaceRegExp.test(e.target.value)
        ? setRegExpChecking({
            ...regExpChecking,
            regExp_name: false,
          })
        : setRegExpChecking({
            ...regExpChecking,
            regExp_name: true,
          });
    }
  };

  const handleChangeEmailInput = (e) => {
    if (e.target.value.includes("@")) {
      setUserInfo({
        ...userInfo,
        emailUrl: "direct",
      });

      emailUrlFocus.current?.focus();
    } else {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });

      if (!userInfo.emailDirectUrl) {
        if (
          emailRegExp.test(
            e.target.name === "emailId"
              ? `${e.target.value}@${userInfo.emailUrl}`
              : e.target.name === "emailUrl"
              ? `${userInfo.emailId}@${e.target.value}`
              : ""
          )
        ) {
          setRegExpChecking({
            ...regExpChecking,
            regExp_email: true,
          });
        } else {
          setRegExpChecking({
            ...regExpChecking,
            regExp_email: false,
          });
        }
      } else {
        if (
          emailRegExp.test(
            e.target.name === "emailId"
              ? `${e.target.value}@${userInfo.emailDirectUrl}`
              : e.target.name === "emailDirectUrl"
              ? `${userInfo.emailId}@${e.target.value}`
              : ""
          )
        ) {
          setRegExpChecking({
            ...regExpChecking,
            regExp_email: true,
          });
        } else {
          setRegExpChecking({
            ...regExpChecking,
            regExp_email: false,
          });
        }
      }
    }
  };

  const handleFocusInput = (e) => {
    setErrorChecking({
      ...errorChecking,
      [`select_${e.target.name}`]: true,
    });
  };

  const toggleDirectEmailUrlBtn = () => {
    setUserInfo({
      ...userInfo,
      emailUrl: "require_select",
      emailDirectUrl: "",
    });
  };
  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      className="SignUpPage"
      flexWrap={"nowrap"}
      container
    >
      <ThemeProvider theme={theme}>
        <Grid item className="banner">
          <h3 style={{ marginBottom: 0 }}>회원가입</h3>
        </Grid>
        <Grid item textAlign="center">
          <h5>sns로 간편 회원가입</h5>
        </Grid>
        <Grid item className="sns_signup_btn">
          <img src="/iconFolder/SnsLogin/kakao-talk.png" alt="카카오톡" />
          <img src="/iconFolder/SnsLogin/free-icon-google.png" alt="구글" />
          <img
            src="/iconFolder/SnsLogin/naver_icon_1.png"
            width="64px"
            height="64px"
            alt="네이버"
          />
        </Grid>
        <div className="divide"></div>

        <Grid item>
          <h4>이메일</h4>
        </Grid>
        <Grid item display={"flex"} alignItems={"center"} width={"100%"}>
          <Grid width={"48%"}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                name="emailId"
                value={userInfo.emailId}
                onChange={handleChangeEmailInput}
                sx={{ fontFamily: "IBM Plex Sans K" }}
                required
                color="main"
                id="demo-helper-text-aligned"
                label="이메일"
                onBlur={handleFocusInput}
                error={errorChecking.select_emailId && !userInfo.emailId.length}
                inputRef={emailIdFocus}
              />
            </FormControl>
          </Grid>
          <Grid item color={"#dbdbdb"} width={"4%"} textAlign={"center"}>
            @
          </Grid>
          <Grid width={"48%"}>
            <FormControl sx={{ width: "100%" }}>
              {userInfo.emailUrl !== "direct" ? (
                <Select
                  name="emailUrl"
                  value={userInfo.emailUrl}
                  onChange={handleChangeEmailInput}
                  color="main"
                  sx={{ fontFamily: "IBM Plex Sans KR" }}
                >
                  <MenuItem value={"require_select"} disabled>
                    선택해주세요
                  </MenuItem>
                  <MenuItem value={"naver.com"}>naver.com</MenuItem>
                  <MenuItem value={"gmail.com"}>gmail.com</MenuItem>
                  <MenuItem value={"hanmail.net"}>hanmail.net</MenuItem>
                  <MenuItem value={"daum.net"}>daum.net</MenuItem>
                  <MenuItem value={"nate.com"}>nate.com</MenuItem>
                  <MenuItem value={"direct"}>직접입력</MenuItem>
                </Select>
              ) : (
                <Grid item position="relative">
                  <TextField
                    name="emailDirectUrl"
                    required
                    inputRef={emailUrlFocus}
                    autoFocus
                    color="main"
                    onChange={handleChangeEmailInput}
                    value={userInfo.emailDirectUrl}
                    placeholder="입력해주세요"
                    sx={{ width: "100%" }}
                    onBlur={handleFocusInput}
                    error={
                      errorChecking.select_emailDirectUrl &&
                      !userInfo.emailDirectUrl.length
                    }
                  />
                  <Grid
                    item
                    className="cancleIcon_box"
                    onClick={toggleDirectEmailUrlBtn}
                  >
                    <CancelIcon />
                  </Grid>
                </Grid>
              )}
            </FormControl>
          </Grid>
        </Grid>
        {!userInfo.emailId.length &&
        (userInfo.emailUrl === "require_select" ||
          userInfo.emailUrl === "direct") &&
        !userInfo.emailDirectUrl.length ? (
          (!userInfo.emailId.length && errorChecking.select_emailId) ||
          (!userInfo.emailDirectUrl.length &&
            errorChecking.select_emailDirectUrl) ? (
            <InputError
              text={"필수 입력 항목입니다."}
              style={{ marginTop: "10px" }}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {userInfo.emailId.length ||
        userInfo.emailDirectUrl.length ||
        userInfo.emailUrl !== "require_select" ? (
          userInfo.emailUrl !== "direct" ? (
            (userInfo.emailId.length && !regExpChecking.regExp_email) ||
            (userInfo.emailUrl !== "require_select" &&
              !regExpChecking.regExp_email) ? (
              <InputError
                text={"이메일 형식이 올바르지 않습니다."}
                style={{ marginTop: "10px" }}
              />
            ) : (
              <></>
            )
          ) : (userInfo.emailId.length && !regExpChecking.regExp_email) ||
            (userInfo.emailDirectUrl !== "" && !regExpChecking.regExp_email) ? (
            <InputError
              text={"이메일 형식이 올바르지 않습니다."}
              style={{ marginTop: "10px" }}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <Grid item mt={2}>
          {!emailEffectivenessCheck ? (
            <ColorButton
              sx={{ width: "100%", height: "50px" }}
              color="secondary"
              onClick={handleOnClickEmailAuth}
            >
              <span
                style={{ fontFamily: "IBM Plex Sans KR", fontWeight: "bold" }}
              >
                이메일 인증하기
              </span>
            </ColorButton>
          ) : (
            <Button
              variant="contained"
              sx={{ width: "100%", height: "50px" }}
              disabled
            >
              <span
                style={{ fontFamily: "IBM Plex Sans KR", fontWeight: "bold" }}
              >
                이메일 인증하기
              </span>
            </Button>
          )}
        </Grid>
        <Grid item className="password_box" mt={3}>
          <h4>비밀번호</h4>
          <h5
            style={{
              color: "rgb(117, 117, 117)",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            영문,숫자를 포함한 8~20자 비밀번호를 입력해주세요.
          </h5>
          <TextField
            required
            name="password_1"
            value={userInfo.password_1}
            sx={{ width: "100%" }}
            color="main"
            className="password_form"
            label="패스워드"
            type="password"
            onChange={handleChangeInput}
            onBlur={handleFocusInput}
            error={
              !userInfo.password_1.length && errorChecking.select_password_1
            }
            inputRef={password_1Focus}
          />
          {!userInfo.password_1.length && errorChecking.select_password_1 ? (
            <InputError
              text={"필수 입력 항목입니다."}
              style={{ marginTop: "10px" }}
            />
          ) : (
            <></>
          )}
          {userInfo.password_1.length && !regExpChecking.regExp_password_1 ? (
            <InputError
              text={
                "비밀번호는 영문,숫자를 포함하여 8자 이상 20자 이하여야 합니다."
              }
              style={{ marginTop: "10px" }}
            />
          ) : (
            <></>
          )}
          <h4>비밀번호 확인</h4>
          <TextField
            required
            name="password_2"
            sx={{ width: "100%" }}
            color="main"
            className="password_form"
            label="패스워드 확인"
            type="password"
            onChange={handleChangeInput}
            onBlur={handleFocusInput}
            error={
              !userInfo.password_2.length && errorChecking.select_password_2
            }
            inputRef={password_2Focus}
          />
          {!userInfo.password_2.length && errorChecking.select_password_2 ? (
            <InputError
              text={"필수 입력 항목입니다."}
              style={{ marginTop: "10px" }}
            />
          ) : (
            <></>
          )}
        </Grid>
        {userInfo.password_2.length && !regExpChecking.regExp_password_2 ? (
          <InputError
            text={"비밀번호가 일치하지 않습니다."}
            style={{ marginTop: "10px" }}
          />
        ) : (
          <></>
        )}
        <Grid item className="username_box" mt={3}>
          <h4>이름</h4>
          <h5
            style={{
              color: "rgb(117, 117, 117)",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            본인의 이름을 작성해 주세요(1~15자)
          </h5>
          <TextField
            name="name"
            value={userInfo.name}
            required
            color="main"
            label="이름(1~15자)"
            sx={{ width: "100%" }}
            onChange={handleChangeInput}
            onBlur={handleFocusInput}
            error={!userInfo.name.length && errorChecking.select_name}
            inputRef={nameFocus}
          />
        </Grid>
        {!userInfo.name.length && errorChecking.select_name ? (
          <InputError
            text={"필수 입력 항목입니다."}
            style={{ marginTop: "10px" }}
          />
        ) : (
          <></>
        )}
        {userInfo.name.length && !regExpChecking.regExp_name ? (
          <InputError
            text={"이름은 공백, 특수문자를 제외한 1~15자 여야 합니다."}
            style={{ marginTop: "10px" }}
          />
        ) : (
          <></>
        )}
        <Grid item className="signup_complete_box" mt={3}>
          <ColorButton
            variant="outlined"
            className="signup_btn"
            sx={{ width: "100%" }}
            onClick={handleSubmit}
          >
            <span
              style={{ fontFamily: "IBM Plex Sans KR", fontWeight: "bold" }}
            >
              병원 인증하고 회원가입
            </span>
          </ColorButton>
          <Grid item textAlign={"center"} my={3}>
            <Grid item fontSize={"15px"}>
              이미 아이디가 있으신가요?
              <span
                style={{
                  fontWeight: "bold",
                  paddingLeft: "10px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </span>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
};

export default SignUpPage;
