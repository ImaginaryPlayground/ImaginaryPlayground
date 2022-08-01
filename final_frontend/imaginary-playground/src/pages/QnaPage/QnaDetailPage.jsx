import { Divider, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import QnaCRUDComp from "../../components/QnaPage/QnaCRUDComp";
import "../../css/QnaPage/QnaDetailPage.css";

const QnaDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid className="QnaDetailPage">
      <Header />
      <h2
        style={{
          color: "#ad1457",
          marginTop: "16px",
          marginBottom: "8px",
          marginLeft: "10px",
        }}
      >
        1:1문의 상세보기
      </h2>
      <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} textAlign="left">
        <span
          style={{ color: "#ad1457", fontWeight: "bold", fontSize: "13px" }}
        >
          유의사항
        </span>
      </Divider>
      <Grid
        item
        display={"flex"}
        flexDirection="column"
        sx={{ fontWeight: "bold" }}
        py={2}
      >
        <span>
          <span className="star">*</span> IOT 기기에 문제가 생겼을 경우 해당 1:1
          문의하기 기능을 통해 문제 내용을 기재해주세요
        </span>
        <span>
          <span className="star">*</span> 담당자 확인 후 빠른 시일 내에 문제를
          해결하여 드리겠습니다.
        </span>
        <span>
          <span className="star">*</span> 아직 처리되지 않은 질문만 수정
          가능합니다.
        </span>
      </Grid>
      <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
      <QnaCRUDComp isEdit />
    </Grid>
  );
};

export default QnaDetailPage;
