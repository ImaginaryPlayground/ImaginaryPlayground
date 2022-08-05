import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Switch,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import QnaListCompPC from "../../components/QnaPage/QnaListCompPC";
import QnaListCompMobile from "../../components/QnaPage/QnaListCompMobile";
import "../../css/QnaPage/QnaListPage.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../util/config";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const QnaListPage = () => {
  const [qnaListData, setQnaListData] = useState([]);
  const loginUserDataReducer = useSelector(
    (state) => state.loginUserDataReducer
  );
  const loginUserToken = localStorage.getItem("token");

  const isMobile_700 = useMediaQuery("(max-width:700px)");
  const isMobile_750 = useMediaQuery("(max-width:750px)");
  const storagePage = sessionStorage.getItem("qna_list_page")
    ? parseInt(sessionStorage.getItem("qna_list_page"))
    : 1;

  const [searchData, setSearchData] = useState({
    searchCondition: "title",
    searchWord: "",
    myQna: false,
    completed: "all",
  });
  const searchedDataAllNum = useRef(0);
  const [page, setPage] = useState(storagePage);
  const totalPageNum =
    parseInt(searchedDataAllNum.current % 9, 10) === 0
      ? parseInt(searchedDataAllNum.current / 9, 10)
      : parseInt(searchedDataAllNum.current / 9, 10) + 1;

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);

    //비동기로 데이터를 가져옴
    axios({
      url: `${config.api}/question/lookup/all`, //마지막은 페이지번호
      method: "POST",
      headers: { Auth: loginUserToken }, //헤더에 토큰
      data: {
        key: searchData.searchCondition,
        qna_type: searchData.myQna ? 1 : 0, //0 은 전체조회 1은, 내qna조회
        completed:
          searchData.completed === "all"
            ? 2
            : searchData.completed === "before"
            ? 0
            : 1, //0처리안된거, 1이 처리된거, 2가 전체
        value: searchData.searchWord,
        page: page - 1,
      },
    })
      .then((res) => {
        //전체 데이터를 배열로 반환
        console.log(res);
        //받은 데이터들 입력
        if (res.data.status === "SUCCESS") {
          searchedDataAllNum.current = res.data.searchedDataAllNum;
          setQnaListData(res.data.data);
        } else {
          swal({
            title: "에러!",
            text: "Q&A 데이터 로딩 중 오류가 발생했습니다.!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, searchData.myQna, searchData.completed]);

  useEffect(() => {
    //페이지 리로드 감지
    window.onpageshow = function (event) {
      if (event.persisted || window.performance) {
        setPage(1);
      }
    };
  }, []);

  const handleOnChangePage = (e, value) => {
    setPage(value);
    window.sessionStorage.setItem("qna_list_page", value);
  };

  const handleOnSearchChange = (e) => {
    if (e.target.name === "myQna") {
      setSearchData({ ...searchData, [e.target.name]: !searchData.myQna });
    } else {
      setSearchData({ ...searchData, [e.target.name]: e.target.value });
    }
  };

  const handleOnSearchClick = (e) => {
    //비동기로 검색된 데이터 설정
    //비동기로 데이터를 가져옴
    axios({
      url: `${config.api}/question/lookup/all`, //마지막은 페이지번호
      method: "POST",
      headers: { Auth: loginUserToken }, //헤더에 토큰
      data: {
        key: searchData.searchCondition,
        qna_type: searchData.myQna ? 1 : 0, //0 은 전체조회 1은, 내qna조회
        completed:
          searchData.completed === "all"
            ? 2
            : searchData.completed === "before"
            ? 0
            : 1, //0처리안된거, 1이 처리된거, 2가 전체
        value: searchData.searchWord,
        page: 0,
      },
    })
      .then((res) => {
        //전체 데이터를 배열로 반환
        console.log(res);
        if (res.data.status === "SUCCESS") {
          //받은 데이터들 입력
          setQnaListData(res.data.data);
          searchedDataAllNum.current = res.data.searchedDataAllNum;
        } else {
          swal({
            title: "에러!",
            text: "Q&A 데이터 로딩 중 오류가 발생했습니다.!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EnterPress = (e) => {
    if (e.key === "Enter") {
      handleOnSearchClick();
    }
  };

  const handleOnClickQnaCreateBtn = (e) => {
    navigate("/qnacreatepage");
  };

  return (
    <Grid className="QnaListPage">
      <Header />
      <h2
        style={{
          color: "#ad1457",
          marginTop: "16px",
          marginBottom: "8px",
          marginLeft: "10px",
        }}
      >
        1:1문의 게시판
      </h2>
      <Divider />
      <Grid
        item
        display={"flex"}
        my={1}
        flexDirection={isMobile_750 ? "column" : "row"}
        alignItems={isMobile_750 ? "" : "center"}
        justifyContent={isMobile_750 ? "end" : "space-between"}
        flexWrap="wrap"
      >
        <Grid
          width={isMobile_750 ? "100%" : "140px"}
          display={"flex"}
          justifyContent="end"
        >
          <Grid
            item
            sx={{
              backgroundColor: "#ad1457",
              color: "white",
              fontWeight: "bold",
              padding: "8px 20px",
              borderRadius: "5px",
              marginRight: "8px",
              cursor: "pointer",
            }}
            width={isMobile_750 ? "130px" : "100%"}
            className={!isMobile_750 ? "text_Ymove" : ""}
            onClick={handleOnClickQnaCreateBtn}
          >
            <span className={!isMobile_750 ? "text_opacity" : ""}>
              1:1문의하기
            </span>
          </Grid>
        </Grid>
        <Grid
          item
          className="search_input_box"
          display={"flex"}
          alignItems="center"
          justifyContent={"end"}
          flexGrow={1}
          my={1}
        >
          <FormControl sx={{ mr: 1, minWidth: "75px" }} size="small">
            <Select
              color="main"
              value={searchData.searchCondition}
              onChange={handleOnSearchChange}
              name="searchCondition"
            >
              <MenuItem value={"title"}>제목</MenuItem>
              <MenuItem value={"content"}>내용</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            color="main"
            focused
            placeholder="검색어를 입력해주세요"
            value={searchData.searchWord}
            onChange={handleOnSearchChange}
            name="searchWord"
            onKeyPress={EnterPress}
          />
          <SearchIcon
            onClick={handleOnSearchClick}
            sx={{
              marginLeft: "2px",
              fontSize: "40px",
              backgroundColor: "#ad1457",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
        </Grid>
        <Grid
          item
          className="search_condition_box"
          display={"flex"}
          alignItems="center"
          flexGrow={1}
          my={1}
        >
          <FormControlLabel
            sx={{ width: "50%", marginRight: "10px", alignItems: "end" }}
            control={
              <Switch
                color="main"
                value={searchData.myQna}
                name="myQna"
                onChange={handleOnSearchChange}
                size="middle"
              />
            }
            label="내 문의보기"
            labelPlacement="top"
          />
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-label" sx={{ color: "#ad1457" }}>
              <span style={{ color: "#ad1457" }}>처리상태</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchData.completed}
              label="처리상태"
              onChange={handleOnSearchChange}
              color="main"
              name="completed"
            >
              <MenuItem value={"all"}>전체</MenuItem>
              <MenuItem value={"before"}>처리 전</MenuItem>
              <MenuItem value={"after"}>처리 완료</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {isMobile_700 ? (
        <QnaListCompMobile qnaListData={qnaListData} />
      ) : (
        <QnaListCompPC qnaListData={qnaListData} />
      )}
      <Grid display={"flex"} justifyContent="center" my={4}>
        <Pagination
          count={totalPageNum}
          color="main"
          size={isMobile_700 ? "small" : "large"}
          shape={"rounded"}
          siblingCount={2}
          showFirstButton={!isMobile_700}
          showLastButton={!isMobile_700}
          onChange={handleOnChangePage}
          page={page}
        />
      </Grid>
    </Grid>
  );
};

export default QnaListPage;
