import { Grid, Paper } from "@mui/material";
import React from "react";
import "../../css/QnaPage/QnaListCompPC.css";

const QnaListCompPC = ({ qnaListData }) => {
  const handleOnTitleClick = () => {
    console.log("타이틀 클릭");
  };
  return (
    <Paper className="QnaListCompPC" elevation={12}>
      <Grid item display={"flex"} alignItems="center" className="table_head">
        <Grid item className="title_td custom_text_align">
          <span>제목</span>
        </Grid>
        <Grid item className="writer_td custom_text_align">
          <span>작성자</span>
        </Grid>
        <Grid item className="username_td custom_text_align">
          <span>작성일</span>
        </Grid>
        <Grid item className="date_td custom_text_align">
          <span>처리상태</span>
        </Grid>
      </Grid>
      {qnaListData.map((data) => (
        <Grid
          key={data.id}
          item
          display={"flex"}
          alignItems="center"
          className="table_content"
          py={2}
          sx={{ borderBottom: "1px solid #ad1457", textAlign: "center" }}
        >
          <Grid
            item
            className="title_td text_constrained"
            sx={{ textAlign: "left", marginRight: "15px", cursor: "pointer" }}
            onClick={handleOnTitleClick}
          >
            <span>{data.title}</span>
          </Grid>
          <Grid item className="writer_td font_custom">
            <span>{data.username}</span>
          </Grid>
          <Grid item className="username_td font_bold">
            <span>{data.created_date}</span>
          </Grid>
          <Grid
            item
            className={
              data.completed
                ? ["font_custom", "date_td"].join(" ")
                : ["date_td", "font_bold"].join(" ")
            }
          >
            <span>{data.completed ? "처리 완료" : "처리 전"}</span>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
};

export default QnaListCompPC;
