import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import AddTaskIcon from "@mui/icons-material/AddTask";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SignupApproval from "./SignupApproval";
import "../../css/AdminPage/DrawerLayout.css";
import SosIcon from "@mui/icons-material/Sos";
import UserManagementPage from "./UserManagementPage";
import UserInquiryPage from "./UserInquiryPage";

const drawerWidth = 240;

const menuList = ["회원가입 승인", "회원 관리", "고객 문의"];

const DrawerLayout = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("회원가입 승인");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const selectMenuList = (e) => {
    setSelectedMenu(e.target.innerText);
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="drawer_layout">
      <Toolbar>
        <span style={{ fontSize: "12px", wordBreak: "keep-all" }}>
          *본 페이지는 1920*1080(FHD) 해상도에 최적화 되어 있습니다.
        </span>
      </Toolbar>
      <Divider />
      <List>
        {menuList.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={selectMenuList}
            className={[text === selectedMenu && "select"].join(" ")}
          >
            <ListItemButton>
              <ListItemIcon
                className={[text === selectedMenu && "color_white"].join(" ")}
              >
                {text === "회원가입 승인" && <AddTaskIcon />}
                {text === "회원 관리" && <ManageSearchIcon />}
                {text === "고객 문의" && <SosIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} className="DrawerLayout">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <span>관리자 페이지</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {selectedMenu === "회원가입 승인" && <SignupApproval />}
        {selectedMenu === "회원 관리" && <UserManagementPage />}
        {selectedMenu === "고객 문의" && <UserInquiryPage />}
      </Box>
    </Box>
  );
};

DrawerLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerLayout;
