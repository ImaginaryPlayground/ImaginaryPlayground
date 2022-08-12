import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import UserInfoComp from "../../components/UserPage/UserInfoComp";
import "../../css/UserPage/Mypage.css";

const Mypage = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLogin") === "true") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <Grid className="MyPage">
      <Header />
      {isLogin && (
        <>
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
        </>
      )}
    </Grid>
  );
};

export default Mypage;
