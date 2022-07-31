import { Button, Grid, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import "../../css/UserPage/UserInfoComp.css";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import swal from "sweetalert";

const initialData = {
  id: 2,
  email: "jimdac@ssafy.com",
  usename: "우영우",
  join_data: "2022-07-31",
  provider: "카카오",
  document: "/img/AdminPage/재직증명서.jpg",
  hospital_id: 1,
  hospital_name: "순천향병원",
  hospital_address: "인천광역시 부평구 동수로 56-(부평동)",
};
const UserInfoComp = () => {
  const [modifyName, setmodifyName] = useState(initialData.usename);

  const nameInput = useRef();
  const handleUserInfoChange = (e) => {
    setmodifyName(e.target.value);
  };

  const handleOnModifyBtn = (e) => {
    if (!modifyName.length) {
      nameInput.current.focus();
      return;
    }

    swal({
      title: "회원 정보 수정",
      text: `수정하시겠습니까?`,
      icon: "warning",
      buttons: true,
    }).then((ok) => {
      if (ok) {
        //비동기 통신(회원가입 승인)
        swal("수정이 완료 되었습니다.", {
          icon: "success",
        });
      }
    });
    //회원정보 수정 비동기 통신
  };

  const handleOnWithdrawal = () => {
    swal({
      title: "회원 탈퇴",
      text: `정말로 회원 탈퇴하시겠습니까?`,
      icon: "warning",
      buttons: true,
    }).then((ok) => {
      if (ok) {
        //비동기 통신(회원가입 승인)
        swal("탈퇴가 완료 되었습니다.", {
          icon: "success",
        });
      }
    });
    //회원정보 수정 비동기 통신
  };
  return (
    <Grid className="UserInfoComp">
      <Grid width={"100%"} item display={"flex"} justifyContent="end">
        <span
          style={{
            color: "#424242",
            cursor: "pointer",
            textDecoration: "underline",
            display: "flex",
            alignItems: "center",
          }}
          onClick={handleOnWithdrawal}
        >
          <span style={{ color: "#424242", marginRight: "2px" }}>탈퇴하기</span>
          <PersonRemoveIcon />
        </span>
      </Grid>
      <Grid item className="total_userinfo_input_box">
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span style={{ display: "block" }}>이메일</span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              size="small"
              value={initialData.email.split("@")[0]}
            />
            <span>@</span>
            <TextField
              color="main"
              size="small"
              value={initialData.email.split("@")[1]}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span style={{ display: "block" }}>이름</span>
            <span style={{ fontSize: "13px", color: "#757575" }}>
              *수정 가능
            </span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              focused
              size="small"
              sx={{ width: "100%" }}
              value={modifyName}
              onChange={handleUserInfoChange}
              placeholder="이름을 입력해 주세요"
              inputRef={nameInput}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span>가입 일자</span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              size="small"
              sx={{ width: "100%" }}
              type="date"
              disabled
              value={initialData.join_data}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span>가입 경로</span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              size="small"
              sx={{ width: "100%" }}
              disabled
              value={initialData.provider}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span>병원 이름</span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              size="small"
              sx={{ width: "100%" }}
              value={initialData.hospital_name}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span>병원 주소</span>
          </Grid>
          <Grid item className="input_box">
            <TextField
              color="main"
              size="small"
              sx={{ width: "100%" }}
              value={initialData.hospital_address}
            />
          </Grid>
        </Grid>
        <Grid item className="input_row_box">
          <Grid item className="input_name_box">
            <span>재직 증명서</span>
          </Grid>
          <Grid item className="input_box">
            <img
              src={initialData.document}
              alt="재직증명서"
              width={"100%"}
              style={{ backgroundColor: "#E4E4E4" }}
            />
          </Grid>
        </Grid>
        <Grid item className="modify_btn">
          <Button
            variant="contained"
            color="main"
            sx={{ width: "100%", paddingTop: "10px", paddingBottom: "10px" }}
            onClick={handleOnModifyBtn}
          >
            <span
              style={{
                fontFamily: "IBM Plex Sans KR",
                color: "white",
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              회원 정보 수정
            </span>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserInfoComp;
