import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00695f",
    },
    secondary: {
      main: "#ff7043",
    },
    background: {
      default: "#fafafa",
    },
    text: {
      primary: "#263238",
      secondary: "#546e7a",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
