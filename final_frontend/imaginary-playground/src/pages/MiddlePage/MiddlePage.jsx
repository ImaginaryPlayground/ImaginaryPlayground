import { Grid, TextField, ThemeProvider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  ColorButton,
  theme,
} from "../../components/CustomTheme/CustomTheme.jsx";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../../css/MiddlePage/MiddlePage.css";

const columns = [
  {
    field: "id",
    headerName: "기관명",
    minWidth: 250,
  },
  {
    field: "lastName",
    headerName: "종별코드명",
    minWidth: 100,
  },
  {
    field: "firstName",
    headerName: "주소",
    minWidth: 500,
  },
];

const rows = [
  {
    id: "순천향대학교부속 천안병원",
    lastName: "상급종합",
    firstName: "인천광역시 부평구 동수로 56-(부평동)",
    positionX: 127.1358588,
    positionY: 36.8027381,
  },
  {
    id: "강릉아산병원",
    lastName: "상급종합",
    firstName: "강원도 강릉시 사천면 방동길 38 ()",
    positionX: 128.8578411,
    positionY: 37.8184325,
  },
  {
    id: "강북삼성병원",
    lastName: "상급종합",
    firstName: "서울특별시 종로구 새문안로 29 (평동)",
    positionX: 126.96775,
    positionY: 37.5684083,
  },
  {
    id: "건국대학교병원",
    lastName: "상급종합",
    firstName: "서울특별시 광진구 능동로 120-1 (화양동)",
    positionX: 127.0718276,
    positionY: 37.5403764,
  },
  {
    id: "경북대학교병원",
    lastName: "상급종합",
    firstName: "대구광역시 중구 동덕로 130 (삼덕동2가, 경북대학교병원)",
    positionX: 128.604125,
    positionY: 35.866774,
  },
  {
    id: "경상국립대학교병원",
    lastName: "상급종합",
    firstName: "경상남도 진주시 강남로 79 (칠암동)",
    positionX: 128.0956717,
    positionY: 35.1763252,
  },
  {
    id: "고려대학교의과대학부속구로병원",
    lastName: "상급종합",
    firstName: "서울특별시 구로구 구로동로 148 고려대부속구로병원 (구로동)",
    positionX: 126.8848701,
    positionY: 37.492052,
  },
  {
    id: "동아대학교병원",
    lastName: "상급종합",
    firstName: "부산광역시 서구 대신공원로 26 (동대신동3가)",
    positionX: 129.017425,
    positionY: 35.12019,
  },
  {
    id: "서울대학교병원",
    lastName: "상급종합",
    firstName: "서울특별시 종로구 대학로 101 (연건동)",
    positionX: 126.9990168,
    positionY: 37.5797151,
  },
];

const { kakao } = window;
const MiddlePage = () => {
  const [selectData, setSelectData] = useState({
    id: "서울대학교병원",
    lastName: "상급종합",
    firstName: "서울특별시 종로구 대학로 101 (연건동)",
    positionX: 126.9990168,
    positionY: 37.5797151,
  });

  const [searchWord, setSearchWord] = useState("");
  const [hospitalData, setHospitalData] = useState(rows);
  const [searchHospitalData, setSearchHospitalData] = useState([]);
  const [documentImg, setDocumentImg] = useState({
    imageFile: "",
    previewUrl: "/img/MiddlePage/default.jpg",
  });

  const navigate = useNavigate();
  const documentImgInput = useRef();
  let code = "";

  const handleSearchData = () => {
    setSearchHospitalData(
      hospitalData.filter((data) => {
        return data.id.includes(searchWord);
      })
    );
  };

  const handleImgChange = async (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    //console.log(e.target.files[0]);
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setDocumentImg({
        imageFile: e.target.files[0],
        previewUrl: fileReader.result,
      });
    };
  };

  const handleSubmit = () => {
    if (!documentImg.imageFile) {
      swal("이미지 없음!", "재직증명서를 업로드 해주세요", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", documentImg.imageFile);
    //userData
    const data = {
      name: selectData.firstName,
    };
    formData.append("data", JSON.stringify(data));

    // 비동기 처리(회원가입, 재직증명서) -> 미들페이지에서 처리
    // axios({
    //   url: `/user/register`,
    //   method: "POST",
    //   data: {
    //     email: `${userInfo.emailId}@${
    //       userInfo.emailDirectUrl ? userInfo.emailDirectUrl : userInfo.emailUrl
    //     }`,
    //     password: userInfo.userPassword,
    //     username: userInfo.name,
    //     document: "",
    //     hospital_id:'순천향병원',
    //     hospital_name:'순천향병원',
    //   },
    // }).then((res) => console.log(res));

    navigate("/login", { replace: true });
  };
  useEffect(() => {
    //병원데이터 주소 받아오기
    // axios({
    //   url: `/hospital/${searchWord}`,
    //   method: "GET",
    // }).then((res) => console.log(res));

    //카카오 or 구글 로그인일 때
    if (new URL(window.location.href).searchParams.get("code")) {
      code = new URL(window.location.href).searchParams.get("code");
    } else if (window.location.hash) {
      // 네이버 로그인 일때
      code = window.location.hash.split("=")[1].split("&")[0];
    } else {
      // 그외의 경우는 홈페이지로 리다이렉트
      //navigate("/", { replace: true });
    }

    //카카오 로그인 access_token 받기
    // const getKakaoTokenHandler = async (code) => {
    //   const data = {
    //     grant_type: "authorization_code",
    //     client_id: REST_API_KEY,
    //     redirect_uri: REDIRECT_URI,
    //     code: code,
    //   };
    //   const queryString = Object.keys(data)
    //     .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    //     .join("&");
    //   axios
    //     .post("https://kauth.kakao.com/oauth/token", queryString, {
    //       headers: {
    //         "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res.data.access_token);
    //     });
    // };
  }, []);

  //데이터를 선택할따마다 지도에 위치 표시
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(
        selectData.positionY,
        selectData.positionX
      ), //지도의 중심좌표.
      level: 5, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(
      selectData.positionY,
      selectData.positionX
    );
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, [selectData]);
  return (
    <Grid
      className="MiddlePage"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      container
    >
      <ThemeProvider theme={theme}>
        <Grid item textAlign={"center"} width={"100%"}>
          <h2 style={{ color: "#ad1457" }}>추가 정보 입력하기</h2>
          <Grid textAlign={"start"} mb={1}>
            <span
              style={{
                color: "rgb(117, 117, 117)",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              *현재 다니고 있는 병원 정보를 입력해주세요
            </span>
          </Grid>
        </Grid>
        <Grid item className="search_box">
          <TextField
            id="outlined-basic"
            label="병원명을 입력해주세요"
            variant="outlined"
            color="main"
            sx={{ width: "85%" }}
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchData();
              }
            }}
          />
          <ColorButton
            sx={{ width: "8%", marginLeft: "3px" }}
            onClick={() => {
              handleSearchData();
            }}
          >
            <span style={{ fontWeight: "bold" }}>검색</span>
          </ColorButton>
        </Grid>
        <Grid item className="search_result_box" mt={1}>
          <DataGrid
            sx={{
              boxShadow: 5,
              border: 3,
              borderColor: "#ad1457",
              "& .MuiDataGrid-cell:hover": {
                color: "#d81b60",
              },
              fontFamily: "IBM Plex Sans KR",
            }}
            rows={searchHospitalData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoPageSize
            autoHeight
            disableColumnMenu
            onCellClick={(data) => {
              setSelectData({ ...data.row });
            }}
          />
        </Grid>
        <Grid item className="now_select_info_box">
          <h3 style={{ marginBottom: "3px", wordBreak: "keep-all" }}>
            현재 선택된 병원:
            <span style={{ color: "#ad1457" }}> {selectData.id}</span>
          </h3>
          <h4
            style={{ marginTop: 0, marginBottom: "3px", wordBreak: "keep-all" }}
          >
            주소:
            <span style={{ color: "#ad1457" }}> {selectData.firstName}</span>
          </h4>
        </Grid>
        <div
          id="map"
          style={{
            width: "100%",
            height: "300px",
            borderRadius: "20px",
          }}
        ></div>
        <Grid
          item
          className="document_img_box"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection="column"
          width={"100%"}
        >
          <input
            type="file"
            className="img_input"
            accept="image/*"
            onChange={handleImgChange}
            ref={documentImgInput}
          />
          <Grid item width="100%" display={"flex"} flexDirection={"column"}>
            <Grid item textAlign={"start"}>
              <h3
                width="100%"
                style={{
                  color: "rgb(117,117,117)",
                  marginBottom: "3px",
                  textAlign: "start",
                }}
              >
                *재직증명서 업로드
              </h3>
              <Grid
                item
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <div style={{ color: "rgb(117,117,117)", marginBottom: "5px" }}>
                  재직증명서를 이미지 파일로 업로드 해주세요
                </div>
                <ColorButton
                  onClick={(e) => {
                    e.preventDefault();
                    documentImgInput.current.click();
                  }}
                  sx={{ marginTop: "2px", marginBottom: "5px" }}
                >
                  <span style={{ fontWeight: "bold" }}>이미지 업로드</span>
                </ColorButton>
              </Grid>
            </Grid>
            <Grid
              item
              width={"100%"}
              sx={{
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "10px",
              }}
              textAlign="center"
            >
              <img
                src={documentImg.previewUrl}
                alt=""
                style={{ maxWidth: "80%" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <h5>{documentImg.imageFile.name}</h5>
        </Grid>
        <ColorButton
          sx={{ width: "100%", marginTop: "5px" }}
          onClick={() => {
            swal({
              title: "",
              text: `현재 선택하신 병원은 "${selectData.id}" 
주소는 "${selectData.firstName}" 입니다.`,
              icon: "info",
              buttons: [true, "Ok"],
            }).then((willDelete) => {
              if (willDelete) {
                handleSubmit();
              }
            });
          }}
        >
          <span style={{ fontWeight: "bold" }}>회원가입 요청</span>
        </ColorButton>
        <Grid item>
          <h5 style={{ color: "rgb(117,117,117)" }}>
            *회원가입 최종 승인까지 약간의 시간이 소요될 수 있습니다.
          </h5>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
};

export default MiddlePage;
