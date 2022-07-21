import React from "react";
import { Button, Grid } from "@mui/material";
import "../../css/MainPage/MainPage.css";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  //const public_url = process.env.PUBLIC_RUL || "";
  return (
    <Grid className="MainPage">
      <Grid
        className="img_box"
        sx={{
          textAlign: "center",
        }}
      ></Grid>
      <Grid className="info_box" container direction="column" rowSpacing={2}>
        <Grid container alignItems="center" justifyContent={"center"} my={5}>
          <ChildCareIcon sx={{ fontSize: "36px" }} />
          <Grid
            item
            sx={{ fontSize: "33px", wordBreak: "keep-all" }}
            className="info_word"
          >
            <span style={{ color: "#FFBED8" }}>아이들</span>을 위한{" "}
            <span style={{ color: "#FFA8A8" }}>상</span>
            <span style={{ color: "#FFA8A8" }}>상</span> 놀이터
          </Grid>
          <Grid item sx={{ fontSize: "32px" }} className="info_word">
            (Imaginary Playground)
          </Grid>
        </Grid>
        <Grid item className="info_content" px={5} style={{ paddingTop: 0 }}>
          <ul style={{ padding: 0 }}>
            <li style={{ wordBreak: "keep-all" }}>
              본 서비스는 태블릿 및 빔 화면을 통하여 터치로 다양한 게임을 즐길
              수 있는 <span style={{ color: "#FF1700" }}>5~7세 유아용</span> IOT
              게임 서비스 입니다. 터치 및 율동 등을 통하여
              <span style={{ color: "#FF008E" }}>근육발달</span>과
              <span style={{ color: "#FF008E" }}>정서적 즐거움</span>을 제공하기
              위하여 제작되었습니다.
            </li>
            <li>
              본 서비스는 태블릿 가로 화면 크기
              <span style={{ color: "#4D77FF" }}>(600px) </span>이상 원할한
              이용이 가능합니다.
            </li>
            <li>
              공용모드는 누구나 이용 가능하며{" "}
              <span style={{ color: "#6FB2D2" }}>키오스크 화면</span>에 최적화
              되어 있습니다. 개인모드는{" "}
              <span style={{ color: "#6FB2D2" }}>태블릿 화면</span>에 최적화
              되어 있습니다.
            </li>
            <li>
              개인모드는 <span style={{ color: "#FF1818" }}>부모님</span>이
              회원가입을 하신 후 아이를 등록하여야 이용이 가능합니다.
            </li>
          </ul>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid xs={5} item className="main_btn_wrapper">
          <Button
            className="main_btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            <EscalatorWarningIcon
              sx={{ fontSize: "100px" }}
              className={"main_btn_icon"}
            />
            개인 모드
          </Button>
        </Grid>
        <Grid item xs={5} className="main_btn_wrapper">
          <Button className="main_btn">
            <FamilyRestroomIcon
              sx={{ fontSize: "100px" }}
              className={"main_btn_icon"}
            />
            공용 모드
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainPage;
