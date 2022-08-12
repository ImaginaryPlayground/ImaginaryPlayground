import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import KidsGridList from "../../components/Homepage/KidsGridList";
import "../../css/Homepage/HomePage.css";
const HomePage = () => {
  return (
    <Grid className="Homepage">
      <Header />
      <KidsGridList />
    </Grid>
  );
};

export default HomePage;
