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
import SnackbarAlert from "./SnackbarAlert";

const PageView = (props = { signInOpen: false }) => {
  const [signInOpen, setSignInOpen] = useState(props.signInOpen);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);

  return (
    <>
      <SnackbarAlert />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Toolbar>
          <Button
            sx={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              fontSize: "2rem",
              textTransform: "none",
              fontStyle: "italic",
              "& a": { textDecoration: "none", color: "#1976d2" },
            }}
          >
            <Link to="/">Asset Portfolio</Link>
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          {cookies.authorization ? (
            <Box
              sx={{
                color: "black",
                "& a": { textDecoration: "none", color: "#1976d2" },
              }}
            >
              <Button
                sx={{
                  marginRight: "1rem",
                }}
                variant="outlined"
                size="large"
              >
                <Link to="/history">매매내역</Link>
              </Button>
              <Button
                sx={{
                  marginRight: "1rem",
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
                <Link to="/">로그아웃</Link>
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                variant="outlined"
                size="large"
                sx={{ marginRight: "1rem" }}
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
