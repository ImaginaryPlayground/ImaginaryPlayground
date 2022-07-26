import { Grid, TextField, useMediaQuery } from "@mui/material";
import React from "react";
import "../../css/AdminPage/UserInfoReadModal.css";

const UserInfoReadModal = ({ userInfo, setSelectedUserInfo }) => {
  const handleChangeUserInfo = (e) => {
    setSelectedUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Grid className="UserInfoReadModal">
      <Grid item>
        <h5 style={{ marginTop: "0" }}>
          *표시가 있는 정보만 수정이 가능합니다.
        </h5>
      </Grid>
      <Grid item className="grid">
        <span className="menu">id</span>
        <TextField
          value={userInfo.id}
          sx={isMobile ? { width: "80%" } : { width: "60%" }}
          error
        />
        <span style={isMobile ? { width: "0%" } : { width: "20%" }}></span>
      </Grid>
      <Grid item className="grid" mt={2}>
        <span className="menu">email</span>
        <TextField
          value={userInfo.email}
          sx={isMobile ? { width: "80%" } : { width: "60%" }}
          error
        />
        <span style={isMobile ? { width: "0%" } : { width: "20%" }}></span>
      </Grid>
      <Grid item className="grid" mt={2}>
        <span className="menu">*이름</span>
        <TextField
          value={userInfo.name}
          sx={isMobile ? { width: "80%" } : { width: "60%" }}
          name="name"
          onChange={handleChangeUserInfo}
          color="primary"
          focused
        />
        <span style={isMobile ? { width: "0%" } : { width: "20%" }}></span>
      </Grid>
      <Grid item className="grid" mt={2}>
        <span className="menu">병원 이름</span>
        <TextField
          value={userInfo.hospital_name}
          sx={isMobile ? { width: "80%" } : { width: "60%" }}
          error
        />
        <span style={isMobile ? { width: "0%" } : { width: "20%" }}></span>
      </Grid>
      <Grid item className="grid" mt={2}>
        <span className="menu">병원 종류</span>
        <TextField
          value={userInfo.hospital_type}
          sx={isMobile ? { width: "80%" } : { width: "60%" }}
          error
        />
        <span style={isMobile ? { width: "0%" } : { width: "20%" }}></span>
      </Grid>
      <Grid item className="grid" mt={2}>
        <span className="menu">병원 주소</span>
        <TextField
          value={userInfo.address}
          sx={isMobile ? { width: "80%" } : { width: "60%" }}
          error
        />
        <span style={isMobile ? { width: "0%" } : { width: "20%" }}></span>
      </Grid>
      <Grid
        item
        mt={2}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        <span
          className="menu"
          style={{
            width: "100%",
            display: "block",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          증명서(이미지 파일)
        </span>
        <img
          src="/img/AdminPage/재직증명서.jpg"
          alt="증명서"
          width={isMobile ? "100%" : "80%"}
        />
      </Grid>
    </Grid>
  );
};

export default UserInfoReadModal;
