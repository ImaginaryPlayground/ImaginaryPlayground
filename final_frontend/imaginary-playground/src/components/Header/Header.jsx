import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";

import React from "react";

import "../../css/Header/Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../util/config";
import { loginUserToken } from "../../util/token";
import swal from "sweetalert";

const drawerWidth = 240;
const navItems = ["내정보", "1:1문의", "로그아웃"];

const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const currentPage = useSelector((state) => state.HomePageCurrentPageReducer);
  const dispatch = useDispatch();

  const handleClickHome = async () => {
    await dispatch({
      type: "SET_CURRENT_PAGE",
      data: { ...currentPage, scrollY: 0, page: 1 },
    });

    navigate("/");
  };

  const handleClickMenu = (e) => {
    switch (e.target.innerText) {
      case "내정보":
        navigate("/mypage");
        break;
      case "1:1문의":
        navigate("/qnapage");
        sessionStorage.setItem("qna_list_page", 1);
        break;
      case "로그아웃": {
        //로그아웃
        axios({
          url: `${config.api}/user/logout`,
          method: "POST",
          headers: {
            Auth: loginUserToken,
          }, //헤더에 토큰
        })
          .then((res) => {
            console.log(res);
            //세션스토리지 토큰값 비우고
            //로그인 페이지로 이동
            if (res.data.status === "SUCCESS") {
              sessionStorage.removeItem("token");
              navigate("/login");
            } else {
              swal({
                title: "에러",
                text: "로그아웃에 실패하였습니다.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }
      default:
        break;
    }
  };
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      className="Header_drawer"
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <span
          className="text_white text_bold"
          onClick={handleClickHome}
          style={{ cursor: "pointer" }}
        >
          상상 놀이터
        </span>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} className={"Header"}>
      <AppBar
        component="nav"
        sx={{ width: "100%", position: "sticky" }}
        color="main"
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            <span
              onClick={handleClickHome}
              className="text_white text_bold"
              style={{
                cursor: "pointer",
                fontSize: "23px",
                marginLeft: "20px",
              }}
            >
              상상 놀이터
            </span>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={handleClickMenu}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
