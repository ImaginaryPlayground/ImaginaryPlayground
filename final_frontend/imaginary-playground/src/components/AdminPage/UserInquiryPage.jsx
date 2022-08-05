import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, DialogTitle, useMediaQuery } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import UserInquiryModal from "./UserInquiryModal";
import axios from "axios";
import { config } from "../../util/config";
import { loginUserToken } from "../../util/token";
import swal from "sweetalert";

const columns = [
  { field: "id", headerName: "id", width: 50 },
  { field: "email", headerName: "이메일", width: 200 },
  { field: "username", headerName: "이름", width: 100 },
  {
    field: "title",
    headerName: "제목",
    width: 600,
  },
  {
    field: "completed",
    headerName: "처리 상태",
    width: 100,
  },
  {
    field: "created_date",
    headerName: "문의 일자",
    width: 180,
  },
];

const UserInquiryPage = () => {
  const [selectedInquiry, setSelectedInquiry] = useState({});
  const [allInquiry, setAllInquiry] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [isAnswerUpdate, setIsAnswerUpdate] = useState(false);
  const loginUserToken = localStorage.getItem("token");

  useEffect(() => {
    //비동기로 전체 문의사항들고온다.
    axios({
      url: `${config.api}/question/lookup/all`, //마지막은 페이지번호
      method: "GET",
      headers: {
        Auth: loginUserToken, //로그인이됐으면 요청
      },
    }).then((res) => {
      console.log(res);
      if (res.data.status === "SUCCESS") {
        const mappingAllInquiry = res.data.data.map((it) => ({
          ...it,
          completed: it.completed === 0 ? "처리 전" : "처리 완료",
          created_date: it.created_date.split(".")[0],
        }));
        setAllInquiry(mappingAllInquiry);
      } else {
        swal("에러!", "데이터를 로드하는데 실패하였습니다!", "error");
      }
    });
  }, [page, isAnswerUpdate]);

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
            "{selectedInquiry.username}"
          </span>
          &nbsp;님의 1:1 문의
        </DialogTitle>
        <DialogContent>
          <UserInquiryModal
            selectedInquiry={selectedInquiry}
            setSelectedInquiry={setSelectedInquiry}
            setIsAnswerUpdate={setIsAnswerUpdate}
            isAnswerUpdate={isAnswerUpdate}
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
