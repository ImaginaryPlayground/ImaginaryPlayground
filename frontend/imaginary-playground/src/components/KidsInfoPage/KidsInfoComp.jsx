import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import DoneIcon from "@mui/icons-material/Done";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../../css/KidsInfoPage/KidsInfoComp.css";
import { config } from "../../util/config";
import axios from "axios";
import swal from "sweetalert";

const KidsInfoComp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const nameInput = useRef();
  const dispatch = useDispatch();
  const loginUserToken = localStorage.getItem("token");

  const selectedkidStore = useSelector((state) => state.selectedKidReducer);
  const reducerCurrentPage = useSelector(
    (state) => state.HomePageCurrentPageReducer
  );

  const [kidInfoData, setkidInfoData] = useState(
    state?.isEdit
      ? selectedkidStore
      : {
          faceImg: "/img/KidsInfoPage/default_img.jpg",
          name: "",
          age: 1,
          gender: "M",
          profile: "",
          character: "",
        }
  );

  const kidFaceImage = useRef();
  const isMobile_800 = useMediaQuery("(max-width:800px)");
  const loginUserDataReducer = useSelector(
    (state) => state.loginUserDataReducer
  );
  const handleOnChangeData = (e) => {
    setkidInfoData({ ...kidInfoData, [e.target.name]: e.target.value });
  };
  const handleOnDelete = () => {
    console.log("삭제API", kidInfoData);

    axios({
      url: `${config.api}/user/care/`,
      method: "DELETE",
      headers: {
        Auth: loginUserToken,
      }, //헤더에 토큰
      data: {
        id: kidInfoData.id, //아이 id값 보내기
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === "SUCCESS") {
          swal({
            title: "성공",
            text: "삭제에 성공하였습니다.",
            icon: "success",
          }).then(() => {
            navigate("/", { replace: true });
          });
        } else {
          swal({
            title: "에러",
            text: "삭제에 실패하였습니다.",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("서버 통신 에러!!");
      });
  };
  const handleOnSumbit = async (e) => {
    if (!kidInfoData.name.length) {
      nameInput.current.focus();
      return;
    }

    if (kidInfoData.faceImg === "/img/KidsInfoPage/default_img.jpg") {
      swal({
        title: "이미지 필요!",
        text: "얼굴 인식AI를 위해 환자 얼굴 사진을 등록해주세요!",
        icon: "info",
      });
      return;
    }

    //formdata로 변환해서 보내기(수정필요)
    //생성 데이터
    const createData = {
      name: kidInfoData.name,
      age: kidInfoData.age,
      gender: kidInfoData.gender,
      character: kidInfoData.character,
      hospital_id: loginUserDataReducer.hospital_id,
    };
    //수정데이터
    const modifiedData = {
      name: kidInfoData.name,
      age: kidInfoData.age,
      gender: kidInfoData.gender,
      character: kidInfoData.character,
      id: kidInfoData.id,
    };

    const formData = new FormData();

    if (state?.isEdit) {
      console.log("수정API", kidInfoData);

      //blob객체의 타입을 application/json 형식으로 만들기
      const blob = new Blob([JSON.stringify(modifiedData)], {
        type: "application/json",
      });

      //text데이터 추가
      formData.append("key", blob);
      //이미지 데이터 추가
      formData.append("file", kidInfoData.faceImg);

      axios({
        url: `${config.api}/user/care/`,
        method: "PUT",
        headers: {
          Auth: loginUserToken,
          "Content-Type": "multipart/form-data",
        }, //헤더에 토큰
        data: formData,
      })
        .then((res) => {
          //받은 데이터들 수정
          if (res.data.status === "SUCCESS") {
            swal({
              title: "수정 성공",
              text: `정상적으로 수정되었습니다.`,
              icon: "success",
            });
          } else {
            swal({
              title: "수정 실패",
              text: `수정에 실패하였습니다.`,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("등록API", createData);

      //blob객체의 타입을 application/json 형식으로 만들기
      const blob = new Blob([JSON.stringify(createData)], {
        type: "application/json",
      });

      //text데이터 추가
      formData.append("key", blob);
      //이미지 데이터 추가
      formData.append("file", kidInfoData.faceImg);

      axios({
        url: `${config.api}/user/care/`,
        method: "POST",
        headers: {
          Auth: loginUserToken, //헤더에 토큰
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((res) => {
          console.log(res);
          //받은 데이터들 등록
          if (res.data.status === "SUCCESS") {
            dispatch({ type: "SET_SELECTED_KID", data: kidInfoData });
            dispatch({
              type: "SET_CURRENT_PAGE",
              data: { ...reducerCurrentPage, page: 1, scrollY: 0 },
            });
            swal({
              title: "등록 성공",
              text: `정상적으로 등록되었습니다.`,
              icon: "success",
            }).then((ok) => {
              navigate("/kidinfo", { state: { isEdit: true } });
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert("서버 통신 에러!!");
        });
    }
  };

  const handleOnImgChange = (event) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setkidInfoData({
        ...kidInfoData,
        faceImg: event.target.files[0],
        preview: reader.result,
      });
    };

    if (event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
  };
  return (
    <Grid className="KidsInfoComp" width={"800px"}>
      <Grid
        width={"100%"}
        item
        display={"flex"}
        justifyContent="space-between"
        sx={isMobile_800 ? { marginRight: "8px", marginTop: "8px" } : {}}
      >
        <Button
          variant="outlined"
          color="main"
          onClick={() => {
            navigate("/");
          }}
          size="middle"
        >
          <LowPriorityIcon sx={{ marginRight: "3px" }} />
          <span
            style={{
              fontFamily: "IBM Plex Sans KR",
              fontWeight: "bold",
            }}
          >
            목록
          </span>
        </Button>
        {state?.isEdit && (
          <span
            style={{
              color: "#424242",
              cursor: "pointer",
              textDecoration: "underline",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleOnDelete}
          >
            삭제
            <DeleteOutlineIcon />
          </span>
        )}
      </Grid>
      <Grid item className="flex_row" mt={4}>
        <Grid item width={"20%"}>
          <span>
            정면
            <span className="next_line">
              사진 <span className="star">*</span>
            </span>
          </span>
        </Grid>
        <Grid item width={"80%"} textAlign="center">
          <img
            src={
              kidInfoData?.profile
                ? `https://${kidInfoData.profile}`
                : "/img/KidsInfoPage/default_img.jpg"
            }
            alt="정면사진"
            width={isMobile_800 ? "50%" : "30%"}
            onClick={() => {
              kidFaceImage.current.click();
            }}
            style={{ cursor: "pointer", backgroundColor: "rgb(217,213,213)" }}
          />
          <input
            type="file"
            ref={kidFaceImage}
            className="img_input"
            accept="image/*"
            name="kidImg"
            onChange={handleOnImgChange}
          />
        </Grid>
      </Grid>
      <Grid item className="flex_row" mt={4}>
        <Grid item width={"20%"}>
          <span>
            이 름 <span className="star">*</span>
          </span>
        </Grid>
        <Grid item width={"80%"} textAlign="center">
          <TextField
            onChange={handleOnChangeData}
            sx={{ width: "100%" }}
            color="main"
            value={kidInfoData.name}
            name="name"
            placeholder="이름을 입력해주세요"
            inputRef={nameInput}
          />
        </Grid>
      </Grid>
      <Grid item className="flex_row" mt={4}>
        <Grid item width={"20%"}>
          <span>
            나 이 <span className="star">*</span>
          </span>
        </Grid>
        <Grid item width={"80%"} textAlign="center">
          <TextField
            onChange={handleOnChangeData}
            sx={{ width: "100%" }}
            value={kidInfoData.age}
            type="number"
            color="main"
            name="age"
          />
        </Grid>
      </Grid>
      <Grid item className="flex_row" mt={4}>
        <Grid item width={"20%"}>
          <span>
            성 별 <span className="star">*</span>
          </span>
        </Grid>
        <Grid item width={"80%"} textAlign="center">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={kidInfoData.gender}
              onChange={handleOnChangeData}
            >
              <FormControlLabel
                value="M"
                control={
                  <Radio
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                }
                label="남자"
              />
              <FormControlLabel
                value="F"
                control={
                  <Radio
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                }
                label="여자"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item className="flex_row" mt={4}>
        <Grid item width={"20%"}>
          <span>
            특이
            <span className="next_line">
              사항
              <span className="star"></span>
            </span>
          </span>
        </Grid>
        <Grid item width={"80%"} textAlign="center">
          <TextField
            sx={{ width: "100%" }}
            multiline
            placeholder="특이사항을 입력해주세요"
            minRows="10"
            maxRows="10"
            color="main"
            value={kidInfoData.character}
            onChange={handleOnChangeData}
            name="character"
          />
        </Grid>
      </Grid>
      <Grid
        item
        display={"flex"}
        justifyContent="flex-end"
        width={"100%"}
        mb={2}
        mt={4}
      >
        <Grid></Grid>
        <Button variant="contained" color="main" onClick={handleOnSumbit}>
          <span
            style={{
              fontFamily: "IBM Plex Sans KR",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {state?.isEdit ? "수정" : "등록"}
          </span>
          <DoneIcon sx={{ color: "white" }} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default KidsInfoComp;
