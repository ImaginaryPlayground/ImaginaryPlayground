import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import KidsInfoComp from "../../components/KidsInfoPage/KidsInfoComp";
import "../../css/KidsInfoPage/KidsInfoPage.css";

const KidsInfoPage = () => {
  const selectedkidStore = useSelector((state) => state.selectedKidReducer);
  const currentPage = useSelector((state) => state.HomePageCurrentPageReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedkidStore) {
      navigate(-1, { replace: true });
    }
  }, []);

  //console.log(selectedkidStore);
  return (
    <Grid className="KidsInfoPage">
      <Header />
      <h2
        style={{
          color: "#ad1457",
          marginTop: "16px",
          marginBottom: "16px",
          marginLeft: "10px",
        }}
      >
        환자 상세보기
      </h2>

      <KidsInfoComp />
    </Grid>
  );
};

export default KidsInfoPage;
