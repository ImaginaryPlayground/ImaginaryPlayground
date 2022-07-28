import {
  Button,
  easing,
  Grid,
  MenuItem,
  Pagination,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../css/Homepage/KidsGridList.css";
import KidsGridItem from "./KidsGridItem";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CloseIcon from "@mui/icons-material/Close";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

const allData = [
  {
    id: 1,
    name: "Bjorn",
    gender: "Male",
    email: "bbader0@admin.ch",
    profile:
      "In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    age: 1,
  },
  {
    id: 2,
    name: "Braden",
    gender: "Male",
    email: "bnardrup1@oaic.gov.au",
    profile:
      "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
    age: 2,
  },
  {
    id: 3,
    name: "Babb",
    gender: "Female",
    email: "brogerot2@cisco.com",
    profile:
      "Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    age: 3,
  },
  {
    id: 4,
    name: "Garrett",
    gender: "Male",
    email: "gsparwell3@auda.org.au",
    profile:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.",
    age: 4,
  },
  {
    id: 5,
    name: "Nelson",
    gender: "Male",
    email: "ngland4@blogger.com",
    profile:
      "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    age: 5,
  },
  {
    id: 6,
    name: "Lira",
    gender: "Female",
    email: "lappleby5@cornell.edu",
    profile:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    age: 6,
  },
  {
    id: 7,
    name: "Torrence",
    gender: "Genderfluid",
    email: "tiscowitz6@bbc.co.uk",
    profile:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    age: 7,
  },
  {
    id: 8,
    name: "Ranice",
    gender: "Female",
    email: "rhedgeley7@about.me",
    profile:
      "Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.",
    age: 8,
  },
  {
    id: 9,
    name: "Oralla",
    gender: "Female",
    email: "oberndtsson8@europa.eu",
    profile: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.",
    age: 9,
  },
  {
    id: 10,
    name: "Jamima",
    gender: "Female",
    email: "jwicklin9@behance.net",
    profile:
      "Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
    age: 10,
  },
  {
    id: 11,
    name: "Humfried",
    gender: "Male",
    email: "hattenburrowa@digg.com",
    profile: "Nunc nisl.",
    age: 11,
  },
  {
    id: 12,
    name: "Benedikta",
    gender: "Polygender",
    email: "bmothersoleb@yahoo.co.jp",
    profile:
      "Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.",
    age: 12,
  },
  {
    id: 13,
    name: "Godart",
    gender: "Male",
    email: "gocaheyc@cornell.edu",
    profile:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.",
    age: 13,
  },
  {
    id: 14,
    name: "Zsazsa",
    gender: "Female",
    email: "zsowterd@ibm.com",
    profile:
      "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",
    age: 14,
  },
  {
    id: 15,
    name: "Nikki",
    gender: "Non-binary",
    email: "nkarpmanne@squidoo.com",
    profile:
      "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    age: 15,
  },
  {
    id: 16,
    name: "Lucille",
    gender: "Female",
    email: "lstevanif@sfgate.com",
    profile:
      "Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    age: 16,
  },
  {
    id: 17,
    name: "Rochell",
    gender: "Female",
    email: "rastillg@nasa.gov",
    profile:
      "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    age: 17,
  },
  {
    id: 18,
    name: "Brittney",
    gender: "Female",
    email: "blightmanh@mysql.com",
    profile:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.",
    age: 18,
  },
  {
    id: 19,
    name: "Odetta",
    gender: "Female",
    email: "omoralesi@bbb.org",
    profile:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
    age: 19,
  },
  {
    id: 20,
    name: "Normand",
    gender: "Agender",
    email: "nsomervillej@lycos.com",
    profile:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.",
    age: 20,
  },
];

const genderMenu = [
  {
    value: "All",
    label: "전체",
  },
  {
    value: "Male",
    label: "남",
  },
  {
    value: "Woman",
    label: "여",
  },
];

const KidsGridList = () => {
  const [kidsData, setKidsData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchData, setSearchData] = useState({
    name: "",
    age_1: 1,
    age_2: 20,
    gender: "All",
  });
  const [page, setPage] = useState(1);
  const isMobile_655 = useMediaQuery("(max-width:655px)");

  useEffect(() => {
    if (!isSearch) {
      //검색중이지 않을 때
      setKidsData(allData);
    } else {
      //검색중일 때
    }
    //여기서 1페이지에 해당하는 아이들 정보 가져옴
  }, [page]);

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleOnChangeSearch = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchSubmit = (e) => {
    console.log(searchData);
    const submitData = {
      ...searchData,
      page: page,
    };
  };

  return (
    <Grid item mb={2} className="KidsGridList_wrapper">
      <Grid
        item
        sx={{
          borderBottom: "0.5px solid #ad1457",
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
                  <span style={{ marginRight: "3px", fontWeight: "bold" }}>
                    검색 상자
                  </span>
                  <PersonSearchIcon />
                </>
              ) : (
                <>
                  <span style={{ marginRight: "3px", fontWeight: "bold" }}>
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
              전체 환자 수:&nbsp;
              <span style={{ color: "#ad1457", fontWeight: "bold" }}>72</span>명
            </Grid>
            <Grid item sx={{ fontSize: "13px" }} mt={1}>
              *본 페이지는 전체 환자들을 검색할 수 있는 페이지 입니다.
            </Grid>
            <Grid item sx={{ fontSize: "13px" }} mt={1}>
              *검색기능을 통하여 원하는 환자를 검색할 수 있습니다.
            </Grid>
            <Grid item sx={{ fontSize: "13px" }} mt={1}>
              *환자를 클릭하면 상세보기로 이동합니다.
            </Grid>
          </Grid>
          {isSearch && (
            <Grid item mb={1} width={"300px"}>
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
                alignItems="center"
                justifyContent={"flex-end"}
                mt={1}
              >
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
          count={10}
          color="main"
          size="large"
          shape={"rounded"}
          siblingCount={2}
          showFirstButton
          showLastButton
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
};

export default KidsGridList;
