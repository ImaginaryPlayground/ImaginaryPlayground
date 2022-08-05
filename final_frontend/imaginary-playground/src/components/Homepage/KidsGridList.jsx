import {
  Button,
  Divider,
  Grid,
  MenuItem,
  Pagination,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "../../css/Homepage/KidsGridList.css";
import KidsGridItem from "./KidsGridItem";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CloseIcon from "@mui/icons-material/Close";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContactsIcon from "@mui/icons-material/Contacts";
import axios from "axios";
import { config } from "../../util/config";
// import { loginUserToken } from "../../util/token";
import swal from "sweetalert";

const genderMenu = [
  {
    value: "A",
    label: "전체",
  },
  {
    value: "M",
    label: "남",
  },
  {
    value: "F",
    label: "여",
  },
];

const KidsGridList = () => {
  const currentPage = useSelector((state) => state.HomePageCurrentPageReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [kidsData, setKidsData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchData, setSearchData] = useState({
    name: "",
    age_1: 1,
    age_2: 20,
    gender: "A", //F,M,A
  });
  const { state } = useLocation();
  const [page, setPage] = useState(currentPage.page);
  const loginUserDataReducer = useSelector(
    (state) => state.loginUserDataReducer
  );
  const allKidDataNum = useRef(0);
  const selectedKidDataNum = useRef(0);
  const loginUserToken = localStorage.getItem("token");
  const totalPageNum =
    parseInt(
      (selectedKidDataNum.current ? selectedKidDataNum.current : 0) % 12,
      10
    ) === 0
      ? parseInt(
          (selectedKidDataNum.current ? selectedKidDataNum.current : 0) / 12,
          10
        )
      : parseInt(
          (selectedKidDataNum.current ? selectedKidDataNum.current : 0) / 12,
          10
        ) + 1;
  const isMobile_655 = useMediaQuery("(max-width:655px)");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 200);

      //여기서 페이지에 해당하는 아이들 정보 가져옴
      //등록된 전체아이 조회
      axios({
        url: `${config.api}/user/care/lookup/all`,
        method: "POST",
        headers: {
          Auth: loginUserToken,
        }, //헤더에 토큰
        data: {
          name: searchData.name,
          age_1: searchData.age_1,
          age_2: searchData.age_2,
          gender: searchData.gender,
          page: page - 1,
          hospital_id: loginUserDataReducer.hospital_id,
        },
      })
        .then((res) => {
          //전체 데이터를 배열로 반환(아이 이미지)
          console.log(res);
          if (res.data.status === "SUCCESS") {
            selectedKidDataNum.current = res.data.searchedDataAllNum;
            //받은 데이터들 입력(전체 데이터 수도 같이 준다)
            setKidsData(res.data.data);
          } else {
            swal({
              title: "에러!",
              text: "오류가 발생했습니다.!",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [page]);

  useEffect(() => {
    //console.log(loginUserToken);
    selectedKidDataNum.current = 0;
    allKidDataNum.current = 0;
    //페이지 리로드 감지
    window.onpageshow = function (event) {
      //console.log(loginUserDataReducer);
      if (event.persisted || window.performance) {
        setPage(1);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 60);
      }
    };

    setTimeout(() => {
      window.scrollTo(0, currentPage.scrollY);
      setLoading(true);
    }, 50);

    //등록된 전체아이 조회
    axios({
      url: `${config.api}/user/care/lookup/all`,
      method: "POST",
      headers: {
        Auth: state?.token || loginUserToken,
      }, //헤더에 토큰
      data: {
        name: "",
        age_1: 1,
        age_2: 50,
        gender: "A",
        page: 0,
        hospital_id: loginUserDataReducer.hospital_id,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === "SUCCESS") {
          //전체 데이터를 배열로 반환(아이 이미지)
          allKidDataNum.current = res.data.searchedDataAllNum;
          selectedKidDataNum.current = res.data.searchedDataAllNum;
          //받은 데이터들 입력(전체 데이터 수도 같이 준다)
          setKidsData(res.data.data);
        } else {
          swal({
            title: "에러!",
            text: "환자 데이터 오류가 발생했습니다.!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useLayoutEffect(() => {
  //   return () => {
  //     // dispatch({
  //     //   type: "SET_CURRENT_PAGE",
  //     //   data: { ...currentPage, scrollY: 0, page: 1 },
  //     // });
  //   };
  // }, [page, currentPage]);

  const handlePageChange = (e, value) => {
    setPage(value);
    dispatch({
      type: "SET_CURRENT_PAGE",
      data: { ...currentPage, page: parseInt(value, 10) },
    });
  };

  const handleOnChangeSearch = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKidCreateSubmit = () => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      data: { ...currentPage, scrollY: window.scrollY },
    });
    navigate("/kidinfocreate");
  };

  //검색버튼
  const handleSearchSubmit = (e) => {
    //2. 검색된 데이터 받기
    //여기서 페이지에 해당하는 아이들 정보 가져옴
    axios({
      url: `${config.api}/user/care/lookup/all`, //마지막은 페이지번호
      method: "POST",
      headers: {
        Auth: loginUserToken,
      }, //헤더에 토큰
      data: {
        name: searchData.name,
        age_1: searchData.age_1,
        age_2: searchData.age_2,
        gender: searchData.gender,
        page: page,
        hospital_id: loginUserDataReducer.hospital_id,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === "SUCCESS") {
          //전체 데이터를 배열로 반환(아이 이미지)
          //받은 데이터들 입력
          setKidsData(res.data.data);
          selectedKidDataNum.current = res.data.searchedDataAllNum;
        } else {
          swal({
            title: "에러!",
            text: "오류가 발생했습니다.!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleonClickInitialzationBtn = () => {
    //2. 검색된 데이터 받기
    //여기서 페이지에 해당하는 아이들 정보 가져옴
    axios({
      url: `${config.api}/user/care/lookup/all`, //마지막은 페이지번호
      method: "POST",
      headers: {
        Auth: loginUserToken,
      }, //헤더에 토큰
      data: {
        name: "",
        age_1: 1,
        age_2: 20,
        gender: "A",
        page: 0,
        hospital_id: loginUserDataReducer.hospital_id,
      },
    })
      .then((res) => {
        //전체 데이터를 배열로 반환(아이 이미지)
        console.log(res);
        if (res.data.status === "SUCCESS") {
          setSearchData({
            name: "",
            age_1: 1,
            age_2: 20,
            gender: "A",
            page: 0,
          });
          //받은 데이터들 입력
          setKidsData(res.data.data);
          selectedKidDataNum.current = res.data.searchedDataAllNum;
        } else {
          swal({
            title: "에러!",
            text: "오류가 발생했습니다.!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid item mb={2} className="KidsGridList_wrapper">
      <Grid
        item
        sx={{
          marginBottom: "15px",
        }}
      >
        <Grid
          item
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
        >
          <h2
            style={{
              marginBottom: "16px",
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
              color: "#ad1457",
            }}
          >
            <FormatListNumberedIcon />
            &nbsp;소아 환자 목록
          </h2>

          <Grid item display={"flex"} flexDirection="column">
            <Grid
              item
              display={"flex"}
              alignItems="flex-start"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setIsSearch(!isSearch);
              }}
            >
              {!isSearch ? (
                <>
                  <Grid item display={"flex"}>
                    <span
                      style={{
                        marginRight: "3px",
                        fontWeight: "bold",
                        color: "#ad1457",
                      }}
                    >
                      검색 상자
                    </span>
                    <PersonSearchIcon />
                  </Grid>
                </>
              ) : (
                <>
                  <span
                    style={{
                      color: "#ad1457",
                      marginRight: "3px",
                      fontWeight: "bold",
                    }}
                  >
                    상자 닫기
                  </span>
                  <CloseIcon />
                </>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          display={"flex"}
          justifyContent={!isMobile_655 ? "space-between" : "flex-end"}
          width={"100%"}
          flexWrap={"wrap-reverse"}
          flexDirection={!isMobile_655 ? "row" : "column"}
          alignItems={!isMobile_655 ? "center" : ""}
        >
          <Grid item mb={isMobile_655 ? 2 : 1}>
            <Grid item>
              <span
                style={
                  isSearch
                    ? { fontWeight: "bold", fontSize: "30px" }
                    : { fontWeight: "bold", fontSize: "25px" }
                }
              >
                전체 환자 수:
              </span>
              &nbsp;
              <span
                style={{
                  color: "#ad1457",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                {allKidDataNum.current}
              </span>
              명
            </Grid>
            <Grid
              item
              sx={
                isSearch
                  ? { fontWeight: "bold", fontSize: "17px" }
                  : { fontSize: "13px" }
              }
              mt={1}
            >
              *본 페이지는 전체 환자들을 검색할 수 있는 페이지 입니다.
            </Grid>
            <Grid
              item
              sx={
                isSearch
                  ? { fontWeight: "bold", fontSize: "17px" }
                  : { fontSize: "13px" }
              }
              mt={1}
            >
              *검색기능을 통하여 원하는 환자를 검색할 수 있습니다.
            </Grid>
            <Grid
              item
              sx={
                isSearch
                  ? { fontWeight: "bold", fontSize: "17px" }
                  : { fontSize: "13px" }
              }
              mt={1}
            >
              *환자를 클릭하면 상세보기로 이동합니다.
            </Grid>
          </Grid>
          {!isSearch && (
            <Grid
              item
              display={"flex"}
              flexDirection="column"
              justifyContent={"end"}
              mb={1}
              sx={{ height: "120px" }}
            >
              <Button
                variant="contained"
                color="main"
                onClick={() => {
                  handleKidCreateSubmit();
                }}
                sx={{ height: "40px" }}
              >
                <Grid sx={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "IBM Plex Sans KR",
                      color: "white",
                      fontWeight: "bold",
                      marginRight: "3px",
                      display: "block",
                    }}
                  >
                    환자 등록
                  </span>

                  <ContactsIcon />
                </Grid>
              </Button>
            </Grid>
          )}

          {isSearch && (
            <Grid item mb={1} width={"300px"}>
              <Grid
                item
                textAlign={"end"}
                onClick={handleonClickInitialzationBtn}
              >
                <span
                  style={{
                    display: "inline-block",
                    marginBottom: "3px",
                    border: "1px solid #ad1457",
                    borderRadius: "5px",
                    padding: "5px",
                    cursor: "pointer",
                    color: "#ad1457",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  검색 초기화
                </span>
              </Grid>
              <Grid
                item
                display={"flex"}
                alignItems="center"
                justifyContent={"flex-end"}
              >
                <span
                  style={{
                    marginRight: "10px",
                    fontWeight: "bold",
                    color: "#ad1457",
                  }}
                >
                  이름
                </span>
                <TextField
                  name="name"
                  size="small"
                  value={searchData.name}
                  onChange={handleOnChangeSearch}
                  color="main"
                />
              </Grid>
              <Grid
                item
                display={"flex"}
                alignItems="center"
                justifyContent={"flex-end"}
                mt={1}
              >
                <span
                  style={{
                    marginRight: "10px",
                    fontWeight: "bold",
                    color: "#ad1457",
                  }}
                >
                  나이
                </span>
                <TextField
                  name="age_1"
                  label="이상"
                  type="number"
                  size="small"
                  sx={{ width: "109px" }}
                  color="main"
                  focused
                  value={searchData.age_1}
                  onChange={handleOnChangeSearch}
                />
                ~
                <TextField
                  name="age_2"
                  type="number"
                  label="이하"
                  size="small"
                  focused
                  sx={{ width: "109px" }}
                  color="main"
                  value={searchData.age_2}
                  onChange={handleOnChangeSearch}
                />
              </Grid>
              <Grid
                item
                display={"flex"}
                alignItems="center"
                justifyContent={"flex-end"}
                mt={1}
              >
                <span
                  style={{
                    marginRight: "10px",
                    fontWeight: "bold",
                    color: "#ad1457",
                  }}
                >
                  성별
                </span>
                <TextField
                  select
                  name="gender"
                  value={searchData.gender}
                  sx={{ width: "229px" }}
                  size="small"
                  color="main"
                  onChange={handleOnChangeSearch}
                >
                  {genderMenu.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                display={"flex"}
                alignItems="flex-end"
                justifyContent={"flex-end"}
                flexDirection="column-reverse"
                mt={1}
              >
                {!isMobile_655 && (
                  <Button
                    variant="contained"
                    color="main"
                    onClick={() => {
                      handleKidCreateSubmit();
                    }}
                    sx={{ marginTop: "5px" }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "IBM Plex Sans KR",
                          color: "white",
                          fontWeight: "bold",
                          marginRight: "3px",
                          display: "block",
                        }}
                      >
                        환자 등록
                      </span>

                      <ContactsIcon />
                    </Grid>
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="main"
                  onClick={handleSearchSubmit}
                >
                  <span
                    style={{
                      fontFamily: "IBM Plex Sans KR",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    검색
                  </span>
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        {isSearch && isMobile_655 && (
          <Grid item width={"100%"} mb={1}>
            <Button
              variant="contained"
              color="main"
              onClick={() => {
                handleKidCreateSubmit();
              }}
              sx={{ width: "100%" }}
            >
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "IBM Plex Sans KR",
                    color: "white",
                    fontWeight: "bold",
                    marginRight: "3px",
                    display: "block",
                  }}
                >
                  환자 등록
                </span>

                <ContactsIcon />
              </Grid>
            </Button>
          </Grid>
        )}
        {isSearch && (
          <Grid item>
            <span style={{ fontWeight: "bold" }}>
              검색된 수:&nbsp;
              <span style={{ color: "#ad1457", fontSize: "20px" }}>
                {selectedKidDataNum.current}
              </span>
              명
            </span>
          </Grid>
        )}
        <Divider />
      </Grid>
      <Grid
        container
        className="KidsGridList"
        rowSpacing={4}
        columnSpacing={{ xs: 2, sm: 3 }}
        columns={{ xs: 24, sm: 24, lg: 24 }}
      >
        {Array.from(kidsData).map((data, index) => (
          <Grid item xs={12} sm={8} lg={4} key={index}>
            <KidsGridItem kidData={data} />
          </Grid>
        ))}
      </Grid>
      <Grid item sx={{ display: "flex", justifyContent: "center" }} my={2}>
        <Pagination
          count={totalPageNum}
          color="main"
          size="large"
          shape={"rounded"}
          siblingCount={2}
          showFirstButton
          showLastButton
          onChange={handlePageChange}
          page={page}
        />
      </Grid>
    </Grid>
  );
};

export default KidsGridList;
