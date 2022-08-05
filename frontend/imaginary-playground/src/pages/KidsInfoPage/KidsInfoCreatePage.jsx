import { Button, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import KidsInfoComp from "../../components/KidsInfoPage/KidsInfoComp";
import "../../css/KidsInfoPage/KidsInfoCreatePage.css";

const KidsInfoCreatePage = () => {
  const navigate = useNavigate();
  const currentPage = useSelector((state) => state.HomePageCurrentPageReducer);

  //console.log("여기는 create 페이지", currentPage);
  return (
    <Grid className="KidsInfoCreatePage">
      <Header />
      <h2
        style={{
          color: "#ad1457",
          marginTop: "16px",
          marginBottom: "16px",
          marginLeft: "10px",
        }}
      >
        환자 정보입력하기
      </h2>

      <KidsInfoComp />
    </Grid>
  );
};

export default KidsInfoCreatePage;
