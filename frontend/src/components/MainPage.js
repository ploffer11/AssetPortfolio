import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { CookieSharp, Home } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import React, { useState, useEffect } from "react";
import PortfolioPage from "./PortfolioPage";
import SignInDialog from "./SignInDialog";
import SignUpDialog from "./SignUpDialog";
import { useCookies } from "react-cookie";

const fadeIn = keyframes`
  from {
    margin-top: 15vh;
    opacity: 0;
  }
  to {
    margin-top: 0vh;
    opacity: 1;
  }
`;

const MainPage = () => {
  const [currentView, setCurrentView] = useState("main");
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [cookies, setCookie] = useCookies(["uid", "token"]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <Button
              sx={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 700,
                fontSize: "2rem",
                textTransform: "none",
                marginRight: "1vw",
                fontStyle: "italic",
              }}
              onClick={() => setCurrentView("main")}
            >
              Asset Portfolio
            </Button>
            <Box sx={{ flexGrow: 1 }}></Box>
            {cookies.token ? (
              <Box sx={{ color: "black" }}>
                {/* Welcome {name}! */}
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setCurrentView("portfolio")}
                >
                  포트폴리오
                </Button>
              </Box>
            ) : (
              <Box>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ marginRight: "1vw" }}
                  onClick={() => setSignInOpen(true)}
                >
                  로그인
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setSignUpOpen(true)}
                >
                  회원 가입
                </Button>
              </Box>
            )}

            <SignInDialog
              open={signInOpen}
              setOpen={setSignInOpen}
              setCookie={setCookie}
            />
            <SignUpDialog open={signUpOpen} setOpen={setSignUpOpen} />
          </Toolbar>
        </AppBar>
      </Box>
      {currentView === "main" ? (
        <Box
          sx={{
            flexGrow: 1,
            height: "50vh",
            backgroundColor: "rgba(65,105,225,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontFamily: "'Loto', sans-serif",
            color: "white",
          }}
        >
          <Box sx={{ animation: `${fadeIn} 2s ease-out` }}>
            <Box
              sx={{
                fontWeight: 900,
                fontSize: "10rem",
              }}
            >
              Be Rich.
            </Box>
            <Box
              sx={{ fontWeight: 100, fontSize: "3rem", textAlign: "center" }}
            >
              Using Asset Portfolio
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "5vh",
              }}
            ></Box>
          </Box>
        </Box>
      ) : (
        <PortfolioPage />
      )}
    </div>
  );
};

export default MainPage;
