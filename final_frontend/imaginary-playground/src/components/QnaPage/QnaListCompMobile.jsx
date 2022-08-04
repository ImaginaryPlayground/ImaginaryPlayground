import { Grid, Paper } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../css/QnaPage/QnaListCompMobile.css";

const QnaListCompMobile = ({ qnaListData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnClickQnaData = (data) => {
    dispatch({ type: "SET_SELECTED_QNADATA", data });
    navigate("/qnadetailpage");
  };
  return (
    <Paper className="QnaListCompMobile" elevation={6}>
      {qnaListData.map((data) => (
        <Grid item key={data.id} py={2} px={1} className="data_row" sx={{}}>
          <Grid
            item
            onClick={() => {
              handleOnClickQnaData(data);
            }}
            sx={{ fontSize: "15px", cursor: "pointer" }}
            className="text_constrained"
          >
            {data.title}
          </Grid>
          <Grid
            mt={1}
            item
            sx={{ fontSize: "13px", display: "flex", alignItems: "baseline" }}
          >
            <Grid
              item
              mr={1}
              className={
                data.completed === 0
                  ? ["custom_font_gray"].join(" ")
                  : ["custom_font"].join(" ")
              }
            >
              {data.completed === 0 ? (
                <span className="completed_animation">처리전</span>
              ) : (
                "처리완료"
              )}
            </Grid>
            <Grid item mr={1} className="custom_font">
              {data.username}
            </Grid>
            <Grid item mr={1} className="custom_font_black">
              {data.created_date.split(".")[0]}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
};

export default QnaListCompMobile;
