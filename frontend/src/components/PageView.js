import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

import SignInDialog from "./SignInDialog";
import SignUpDialog from "./SignUpDialog";
import PageContent from "./PageContent";

const PageView = (props = { signInOpen: false }) => {
  const [signInOpen, setSignInOpen] = useState(props.signInOpen);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", marginBottom: "1.5vh" }}
      >
        <Toolbar>
          <Button
            sx={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              fontSize: "2rem",
              textTransform: "none",
              marginRight: "1vw",
              fontStyle: "italic",
              "& a": { textDecoration: "none", color: "#1976d2" },
            }}
          >
            <Link to="/">Asset Portfolio</Link>
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          {cookies.authorization ? (
            <Box sx={{ color: "black" }}>
              <Button
                sx={{
                  marginRight: "1vw",
                  "& a": { textDecoration: "none", color: "#1976d2" },
                }}
                variant="outlined"
                size="large"
              >
                <Link to="/portfolio">포트폴리오</Link>
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  removeCookie("authorization");
                  removeCookie("uid");
                  removeCookie("name");
                }}
              >
                로그아웃
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

      <PageContent currentView={props.currentView} />
    </>
  );
};

export default PageView;
