import { Grid, Paper } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../css/Homepage/KidsGridItem.css";

const KidsGridItem = ({ kidData }) => {
  console.log(kidData.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector((state) => state.HomePageCurrentPageReducer);

  const handleKidClick = () => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      data: { ...currentPage, scrollY: window.scrollY },
    });
    const newKidData = {
      ...kidData,
      character: kidData.character || "",
    };
    dispatch({ type: "SET_SELECTED_KID", data: newKidData });
    navigate("/kidinfo", { state: { isEdit: true } });
  };
  return (
    <Paper
      elevation={24}
      className="KidsGridItem"
      sx={{ border: "1px solid #ad1457", borderRadius: "5px" }}
    >
      <Grid
        height={"100%"}
        item
        display={"flex"}
        flexDirection="column"
        alignItems={"flex-start"}
        sx={{
          cursor: "pointer",
        }}
        onClick={handleKidClick}
      >
        <Grid item className="kids_img_box" sx={{ position: "relative" }}>
          <img
            src={`https://${kidData.profile}`}
            alt=""
            width={"100%"}
            style={{ borderRadius: "10px" }}
          />
          <span
            style={{
              position: "absolute",
              top: "3%",
              left: "5%",
              color: "#ad1457",
            }}
          >
            {kidData.id}
          </span>
        </Grid>
        <Grid item className="kids_info_box" px={1} width={"100%"}>
          <Grid
            item
            display={"flex"}
            justifyContent="space-between"
            width={"100%"}
          >
            <span style={{ fontWeight: "bold" }}>{kidData.name}</span>
            <span
              style={
                kidData.gender === "M"
                  ? { color: "#1967d2", fontWeight: "bold" }
                  : { color: "#ad1457", fontWeight: "bold" }
              }
            >
              {kidData.gender === "M" ? "남" : "여"}
            </span>
          </Grid>
          <Grid item sx={{ textAlign: "end" }}>
            <span style={{ color: "#f77", fontWeight: "bold" }}>
              {kidData.age}
            </span>
            세
          </Grid>
          <Grid item className="profile_text">
            {kidData.character}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default KidsGridItem;
