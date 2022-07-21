import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import "../../css/LoginPage/LoginPage.css";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [isSaveUserId, setIsSaveUserId] = useState(false);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(pink[800]),
    backgroundColor: pink[800],
    "&:hover": {
      backgroundColor: pink[600],
    },
  }));

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
        <h3>아이들을 위한 온라인 아케이드 플랫폼</h3>
      </Grid>
      <Grid item>
        <h2>로그인이 필요합니다.</h2>
      </Grid>
      <Grid item className="signin_form">
        <FormControl className="signin_form_control">
          <TextField id="outlined-basic" label="이메일" variant="outlined" />
        </FormControl>
      </Grid>
      <Grid item className="signin_form">
        <FormControl className="signin_form_control">
          <TextField
            className="password_form"
            id="outlined-password-input"
            label="패스워드"
            type="password"
            autoComplete="current-password"
          />
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
        <ColorButton variant="outlined" className="login_btn">
          로그인
        </ColorButton>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
