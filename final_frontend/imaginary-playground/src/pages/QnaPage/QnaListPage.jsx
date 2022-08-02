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
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import QnaListCompPC from "../../components/QnaPage/QnaListCompPC";
import QnaListCompMobile from "../../components/QnaPage/QnaListCompMobile";
import "../../css/QnaPage/QnaListPage.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../util/config";

const dummyData = [
  {
    id: 1,
    title:
      "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    username: "Marja Gallahue",
    created_date: "2022-03-08 14:33:09",
    completed: true,
    modified_date: "2021-11-08T14:33:55Z",
    email: "mgallahue0@amazon.de",
    content:
      "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
  },
  {
    id: 2,
    title:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    username: "Keenan Oehm",
    created_date: "2022-04-18 10:54:49",
    completed: false,
    modified_date: "2022-05-07T17:36:51Z",
    email: "koehm1@google.cn",
    content:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
  {
    id: 3,
    title:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    username: "Lalo Oran",
    created_date: "2021-07-30 08:57:18",
    completed: true,
    modified_date: "2021-09-17T10:23:13Z",
    email: "loran2@china.com.cn",
    content:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: 4,
    title:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    username: "Norman Milby",
    created_date: "2021-08-07 11:20:52",
    completed: false,
    modified_date: "2021-09-05T15:51:53Z",
    email: "nmilby3@fotki.com",
    content:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
  },
  {
    id: 5,
    title:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    username: "Joly Infantino",
    created_date: "2022-05-30 15:30:35",
    completed: false,
    modified_date: "2022-06-30T02:30:11Z",
    email: "jinfantino4@nydailynews.com",
    content:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
  {
    id: 6,
    title:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    username: "Margette Adderley",
    created_date: "2021-12-25 02:13:34",
    completed: true,
    modified_date: "2022-03-22T00:18:43Z",
    email: "madderley5@intel.com",
    content:
      "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
  },
  {
    id: 7,
    title:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    username: "Minnie Meffan",
    created_date: "2021-10-20 20:43:14",
    completed: false,
    modified_date: "2022-06-23T11:35:08Z",
    email: "mmeffan6@hostgator.com",
    content:
      "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
  },
  {
    id: 8,
    title:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    username: "Janet Tourmell",
    created_date: "2022-01-04 07:37:41",
    completed: true,
    modified_date: "2022-05-03T16:17:37Z",
    email: "jtourmell7@ehow.com",
    content:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
  },
  {
    id: 9,
    title:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    username: "Gun Skitral",
    created_date: "2022-04-24 01:37:27",
    completed: true,
    modified_date: "2021-11-04T09:07:59Z",
    email: "gskitral8@oracle.com",
    content:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
  },
  {
    id: 10,
    title:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    username: "Lucho Metzel",
    created_date: "2021-10-21 20:54:40",
    completed: false,
    modified_date: "2021-07-21T10:53:23Z",
    email: "lmetzel9@t-online.de",
    content:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
  },
  {
    id: 11,
    title:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    username: "Arabele Elias",
    created_date: "2022-06-03 08:03:10",
    completed: true,
    modified_date: "2022-07-08T12:34:42Z",
    email: "aeliasa@facebook.com",
    content:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  },
  {
    id: 12,
    title:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    username: "Danell Tebbett",
    created_date: "2022-02-15 05:24:01",
    completed: true,
    modified_date: "2021-07-12T20:32:08Z",
    email: "dtebbettb@nydailynews.com",
    content:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
  },
  {
    id: 13,
    title:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    username: "Aguste Colleran",
    created_date: "2022-06-16 19:53:07",
    completed: false,
    modified_date: "2021-11-24T00:05:38Z",
    email: "acolleranc@mapquest.com",
    content:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
  },
  {
    id: 14,
    title:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    username: "Eilis Harpham",
    created_date: "2022-02-02 03:54:58",
    completed: false,
    modified_date: "2022-02-06T05:26:31Z",
    email: "eharphamd@usgs.gov",
    content:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  },
  {
    id: 15,
    title:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    username: "Alika Breakey",
    created_date: "2021-12-22 21:53:10",
    completed: false,
    modified_date: "2021-07-25T13:21:02Z",
    email: "abreakeye@addthis.com",
    content:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
  },
  {
    id: 16,
    title:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    username: "Gabi Assante",
    created_date: "2021-07-05 03:58:50",
    completed: true,
    modified_date: "2022-05-21T07:43:14Z",
    email: "gassantef@uiuc.edu",
    content:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
  },
  {
    id: 17,
    title:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    username: "Abby Burdoun",
    created_date: "2022-01-10 19:13:31",
    completed: false,
    modified_date: "2022-06-09T06:37:13Z",
    email: "aburdoung@bigcartel.com",
    content:
      "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  },
  {
    id: 18,
    title:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    username: "Matteo Keyhoe",
    created_date: "2022-04-09 07:57:04",
    completed: false,
    modified_date: "2022-06-29T03:14:45Z",
    email: "mkeyhoeh@nydailynews.com",
    content:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
  },
  {
    id: 19,
    title:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    username: "Jude Leal",
    created_date: "2021-10-30 17:29:21",
    completed: false,
    modified_date: "2022-06-16T06:15:25Z",
    email: "jleali@ustream.tv",
    content:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
  },
  {
    id: 20,
    title:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    username: "Flss Blakeden",
    created_date: "2021-12-11 05:58:52",
    completed: true,
    modified_date: "2021-10-15T09:27:57Z",
    email: "fblakedenj@typepad.com",
    content:
      "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  },
];

const QnaListPage = () => {
  const [qnaListData, setQnaListData] = useState([]);

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
  const [page, setPage] = useState(storagePage);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    //비동기로 데이터를 가져옴
    axios({
      url: `${config.api}/question/lookup/all`, //마지막은 페이지번호
      method: "POST",
      headers: "", //헤더에 토큰
      data: {
        key: searchData.searchCondition,
        qna_type: searchData.myQna ? 1 : 0, //0 은 전체조회 1은, 내qna조회
        completed: "all" ? 2 : searchData.completed === "before" ? 0 : 1, //0처리안된거, 1이 처리된거, 2가 전체
        value: searchData.searchWord,
        page: page,
      },
    })
      .then((res) => {
        //전체 데이터를 배열로 반환
        console.log(res);
        //받은 데이터들 입력
        //setKidsData(allData);
      })
      .catch((err) => {
        console.log(err);
      });

    setQnaListData(dummyData);
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
    console.log(searchData);

    //비동기로 검색된 데이터 설정
    //비동기로 데이터를 가져옴
    axios({
      url: `${config.api}/question/lookup/all`, //마지막은 페이지번호
      method: "POST",
      headers: "", //헤더에 토큰
      data: {
        key: searchData.searchCondition,
        qna_type: searchData.myQna ? 1 : 0, //0 은 전체조회 1은, 내qna조회
        completed: "all" ? 2 : searchData.completed === "before" ? 0 : 1, //0처리안된거, 1이 처리된거, 2가 전체
        value: searchData.searchWord,
        page: 1,
      },
    })
      .then((res) => {
        //전체 데이터를 배열로 반환
        console.log(res);
        //받은 데이터들 입력
        //setKidsData(allData);
      })
      .catch((err) => {
        console.log(err);
      });

    setQnaListData(dummyData);
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
          count={20}
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
