import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, DialogTitle, useMediaQuery } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import UserInquiryModal from "./UserInquiryModal";
import axios from "axios";
import { config } from "../../util/config";

const columns = [
  { field: "id", headerName: "id", width: 50 },
  { field: "email", headerName: "이메일", width: 200 },
  { field: "name", headerName: "이름", width: 100 },
  {
    field: "title",
    headerName: "제목",
    width: 400,
  },
  {
    field: "content",
    headerName: "내용",
    width: 570,
  },
  {
    field: "process_state",
    headerName: "처리 상태",
    width: 100,
  },
  {
    field: "inquiry_date",
    headerName: "문의 일자",
    width: 180,
  },
];

const rows = [
  {
    id: 1,
    email: "jimdac@naver.com",
    name: "유지홍",
    title: "갑자기 문제가 발생했어요",
    content:
      "도와주세요!! 어떤 문제가 발생해서 문제가 너무 많이 일어납니다. 이러한 사항쫌 고쳐주세요",
    process_state: "처리 대기",
    inquiry_date: "2020-07-06 20:38:56",
  },
  {
    id: 2,
    email: "jimdac1@naver.com",
    name: "홍길동",
    title: "이러쿵 저러쿵 궁금해요!!!",
    content: "너무 힘들어요!! 처리부탁드립니다.",
    process_state: "처리 대기",
    inquiry_date: "2020-07-04 20:38:56",
  },
  {
    id: 3,
    email: "jimdac123@naver.com",
    name: "홍석현",
    title:
      "시스템상 문제가 너무 많습니다. 이러한 저러한 문제들이 계속 발생하는데 제발 도와주세요!!시스템상 문제가 너무 많습니다. 이러한 저러한 문제들이 계속 발생하는데 제발 도와주세요!!시스템상 문제가 너무 많습니다. 이러한 저러한 문제들이 계속 발생하는데 제발 도와주세요!!",
    content:
      "시스템상 문제가 너무 많습니다. 이러한 저러한 문제들이 계속 발생하는데 제발 도와주세요!! 너무 힘들어요!!! 시스템상 문제가 너무 많습니다. 이러한 저러한 문제들이 계속 발생하는데 제발 도와주세요!! 너무 힘들어요!!! 시스템상 문제가 너무 많습니다. 이러한 저러한 문제들이 계속 발생하는데 제발 도와주세요!! 너무 힘들어요!!! 시스템상 문제가 너무 많습니다. 이러한 저러한 문제들이 계속 발생하는데 제발 도와주세요!! 너무 힘들어요!!! 시스템상 문제가 너무 많습니다. 이러한 저러한 문제들이 계속 발생하는데 제발 도와주세요!! 너무 힘들어요!!! 시스템상 문제가 너무 많습니다. 이러한 저러한 문제들이 계속 발생하는데 제발 도와주세요!! 너무 힘들어요!!!",
    process_state: "처리 완료",
    inquiry_date: "2020-07-05 20:38:56",
  },
];

const UserInquiryPage = () => {
  const [selectedInquiry, setSelectedInquiry] = useState({});
  const [allInquiry, setAllInquiry] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  //const [isModifiedState, setIsModifiedState] = useState(false);

  useEffect(() => {
    //비동기로 전체 문의사항들고온다.
    axios({
      url: `${config.api}/question/lookup/all`, //마지막은 페이지번호
      method: "POST",
      headers: {
        token: "", //로그인이됐으면 요청
      },
      data: {
        page: page,
        key: "", //검색할 제목, 내용
        qna_type: 0, //전체검색
        value: "", //검색할 단어
        email: "", //검색할 아이디
      },
    }).then((res) => {
      console.log(res);
    });

    //전체 개수 주는 API 만들기

    setAllInquiry(rows);
  }, [page]);

  const isMobile = useMediaQuery("(max-width:600px)");
  const handleOneclickRow = (e) => {
    setSelectedInquiry(e.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="UserInquiryPage" style={{ height: "88vh", width: "100%" }}>
      <DataGrid
        sx={{ cursor: "pointer" }}
        rows={allInquiry}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        onRowClick={handleOneclickRow}
        pagination
        onPageChange={(page) => {
          setPage(page);
        }}
      />
      <Dialog
        open={open}
        fullWidth
        scroll="body"
        disableEscapeKeyDown
        fullScreen={isMobile}
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            fontFamily: "IBM Plex Sans KR",
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            marginBottom: "30px",
            marginTop: "10px",
          }}
        >
          <span style={{ fontWeight: "bold", color: "#1976d2" }}>
            "{selectedInquiry.name}"
          </span>
          &nbsp;님의 1:1 문의
        </DialogTitle>
        <DialogContent>
          <UserInquiryModal
            selectedInquiry={selectedInquiry}
            setSelectedInquiry={setSelectedInquiry}
            setAllInquiry={setAllInquiry}
            allInquiry={allInquiry}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <span
              style={{ fontWeight: "bold", fontFamily: "IBM Plex Sans KR" }}
            >
              닫기
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserInquiryPage;
