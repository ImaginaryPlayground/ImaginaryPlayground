import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import UserInfoReadModal from "./UserInfoReadModal";
import swal from "sweetalert";
import { useEffect } from "react";
import axios from "axios";
import { config } from "../../util/config";
import qs from "qs";

const columns = [
  { field: "id", headerName: "id", width: 50 },
  { field: "email", headerName: "이메일", width: 180 },
  { field: "username", headerName: "이름", width: 130 },
  {
    field: "hospital_name",
    headerName: "병원 이름",
    width: 250,
  },
  {
    field: "hospital_address",
    headerName: "병원 주소",
    width: 600,
  },
  {
    field: "join_date",
    headerName: "가입 날짜",
    width: 175,
  },
  {
    field: "provider",
    headerName: "가입 경로",
    width: 100,
  },
];

const UserManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState({});
  const [page, setPage] = useState(0);
  const [allUserData, setAllUserData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const handleClickOpen = (e) => {
    setOpen(true);
    setSelectedUserInfo(e.row);
  };
  const loginUserToken = localStorage.getItem("token");

  const handleClose = () => {
    setOpen(false);
  };

  const handleModifyUserInfo = () => {
    if (
      !selectedUserInfo.username.length ||
      selectedUserInfo.username.length > 15
    ) {
      alert("이름은 1~15자 여야 합니다.");
      return;
    }

    //회원 정보 관리자가 수정
    axios({
      url: `${config.api}/admin/user/edit`,
      method: "POST",
      headers: {
        Auth: loginUserToken, //로그인이됐으면 요청
      },
      data: {
        username: selectedUserInfo.username,
        id: selectedUserInfo.id,
      },
    }).then((res) => {
      console.log(res);
      if (res.data.status === "SUCCESS") {
        setIsUpdate(!isUpdate);
        swal("성공", "정상적으로 회원정보를 수정하였습니다.", "success");
      } else {
        swal("에러!", "회원 정보를 수정하는데 실패하였습니다.", "error");
      }
    });
  };

  useEffect(() => {
    //비동기 회원관리
    //전체 승인된 전체 회원 개수
    axios({
      url: `${config.api}/admin/lookup/all/1`,
      method: "GET",
      headers: {
        Auth: loginUserToken, //로그인이됐으면 요청
      },
    }).then((res) => {
      console.log(res);
      if (res.data.status === "SUCCESS") {
        setAllUserData(res.data.data);
      } else {
        swal("에러!", "회원 정보를 로드하는데 실패하였습니다.", "error");
      }
    });
  }, [isUpdate]);

  const handleDeleteUserInfo = () => {
    //console.log(selectedUserInfo);
    swal({
      title: "회원 데이터 삭제 경고",
      text: `현재 삭제하려는 유저는 ${selectedUserInfo.email} 입니다.`,
      icon: "warning",
      buttons: true,
    }).then((Approval) => {
      if (Approval) {
        axios({
          url: `${config.api}/admin/`, //마지막은 페이지번호
          method: "DELETE",
          headers: {
            Auth: loginUserToken, //로그인이됐으면 요청
          },
          data: [selectedUserInfo.email],
        }).then((res) => {
          console.log(res);
          if (res.data.status === "SUCCESS") {
            setIsUpdate(!isUpdate);
            swal("삭제가 완료 되었습니다.", {
              icon: "success",
            });
            setOpen(false);
          } else {
            swal("에러!", "회원을 삭제하는데 실패하였습니다!", "error");
          }
        });
      }
    });
  };

  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <div
      className="UserManagementPage"
      style={{ height: "88vh", width: "100%" }}
    >
      <DataGrid
        sx={{ cursor: "pointer" }}
        rows={allUserData}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        onCellClick={(e) => {
          handleClickOpen(e);
        }}
        pagination
        onPageChange={(page) => {
          setPage(page);
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        scroll="body"
        maxWidth="md"
        fullScreen={isMobile}
      >
        <DialogTitle
          sx={{
            fontFamily: "IBM Plex Sans KR",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "30px",
            marginTop: "10px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>회원정보 수정</span>
          <span
            style={{
              fontSize: "15px",
              color: "rgb(117,117,117)",
              cursor: "pointer",
            }}
            onClick={handleDeleteUserInfo}
          >
            탈퇴하기
          </span>
        </DialogTitle>
        <DialogContent>
          <UserInfoReadModal
            userInfo={selectedUserInfo}
            setSelectedUserInfo={setSelectedUserInfo}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <span
              style={{ fontWeight: "bold", fontFamily: "IBM Plex Sans KR" }}
            >
              취소
            </span>
          </Button>
          <Button onClick={handleModifyUserInfo}>
            <span
              style={{ fontWeight: "bold", fontFamily: "IBM Plex Sans KR" }}
            >
              수정
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagementPage;
