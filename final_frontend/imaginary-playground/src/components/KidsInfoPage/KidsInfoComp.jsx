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

const KidsInfoComp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const nameInput = useRef();
  const dispatch = useDispatch();

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
          gender: "Male",
          profile: "",
        }
  );

  const kidFaceImage = useRef();
  const isMobile_800 = useMediaQuery("(max-width:800px)");

  const handleOnChangeData = (e) => {
    setkidInfoData({ ...kidInfoData, [e.target.name]: e.target.value });
  };
  const handleOnDelete = () => {};
  const handleOnSumbit = async (e) => {
    if (!kidInfoData.name.length) {
      nameInput.current.focus();
      return;
    }

    if (state?.isEdit) {
      console.log("수정API", kidInfoData);
    } else {
      console.log("등록API", kidInfoData);
      dispatch({ type: "SET_SELECTED_KID", data: kidInfoData });
      dispatch({
        type: "SET_CURRENT_PAGE",
        data: { ...reducerCurrentPage, page: 1, scrollY: 0 },
      });
      navigate("/kidinfo", { state: { isEdit: true } });
    }

    const formData = new FormData();

    !!kidInfoData.faceImg && formData.append("kidFaceImg", kidInfoData.faceImg);
    //이미지 URL객체 삭제
    URL.revokeObjectURL(kidInfoData.faceImg);
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
            src={kidInfoData?.preview || "/img/KidsInfoPage/default_img.jpg"}
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
                value="Male"
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
                value="Female"
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
            value={kidInfoData.profile}
            onChange={handleOnChangeData}
            name="profile"
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
