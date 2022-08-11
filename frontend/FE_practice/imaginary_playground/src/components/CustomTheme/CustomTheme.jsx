import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    main: {
      main: "#ad1457",
    },
    secondary: {
      main: "#ff1744",
    },
  },
});

export const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[800]),
  backgroundColor: pink[800],
  "&:hover": {
    backgroundColor: pink[600],
  },
}));
