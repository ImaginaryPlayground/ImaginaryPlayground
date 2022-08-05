import { Divider, Grid } from "@mui/material";
import React from "react";
import Header from "../../components/Header/Header";
import UserInfoComp from "../../components/UserPage/UserInfoComp";
import "../../css/UserPage/Mypage.css";

const Mypage = () => {
  return (
    <Grid className="MyPage">
      <Header />
      <h2
        style={{
          color: "#ad1457",
          marginTop: "16px",
          marginBottom: "16px",
          marginLeft: "10px",
        }}
      >
        회원정보수정
      </h2>
      <Divider />
      <UserInfoComp />
    </Grid>
  );
};

export default Mypage;
