/* eslint-disable no-undef */
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { Outlet } from "react-router";
import getDesignTokens from "./styles/MyTheme";
import ScrollToTop from "./components/ScrollToTop";

const Root = () => {

  const [mode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box>
          <ScrollToTop />
          <Outlet />
        </Box>
    </ThemeProvider>
  );
};

export default Root;
