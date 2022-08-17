import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import DrawerLayout from "../../components/AdminPage/DrawerLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const loginUserDataReducer = useSelector(
    (state) => state.loginUserDataReducer
  );
  const navigate = useNavigate();
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLogin") !== "true") {
      alert("어드민 계정의 로그인이 필요합니다.");
      navigate("/login");
    } else {
      if (loginUserDataReducer.type !== "ADMIN") {
        alert("잘못된 접근입니다.");
        navigate(-1, { replace: true });
      } else {
        setIsAdminLogin(true);
      }
    }
  }, []);

  return <Grid className="AdminPage">{isAdminLogin && <DrawerLayout />}</Grid>;
};

export default AdminPage;
