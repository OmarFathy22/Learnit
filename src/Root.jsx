/* eslint-disable no-undef */
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { Outlet } from "react-router";
import getDesignTokens from "./styles/MyTheme";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import CoursesProvider from "./store/Context/courses";
import ChatbotButton from "./Chatbot/ChatbotButton"
import Footer from "./components/Footer";


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
    <CoursesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Box>
            <ScrollToTop />
            <Outlet theme = {theme} />
            <ChatbotButton />

            <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={true}
         />
         <Footer/>
          </Box>
      </ThemeProvider>
    </CoursesProvider>
  );
};

export default Root;
