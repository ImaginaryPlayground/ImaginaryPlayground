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

const drawerWidth = 240;
const navItems = ["내정보", "1:1문의", "로그아웃"];

const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
          onClick={() => {
            navigate("/", { replace: true });
          }}
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
              onClick={() => {
                navigate("/", { replace: true });
              }}
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
              <Button key={item} sx={{ color: "#fff" }}>
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
