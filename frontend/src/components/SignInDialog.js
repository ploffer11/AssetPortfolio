import * as React from "react";
import { useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { Close, Lock, Email } from "@mui/icons-material";

import useInputField from "../hook/useInput";

import "../scss/sign.scss";

const SignInDialog = ({ open = false, setOpen, setCookie }) => {
  const [loading, setLoading] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const [focus, setFocus] = useState("");
  const [email, setEmail, changeEmail] = useInputField();
  const [password, setPassword, changePassword] = useInputField();

  const setClear = () => {
    setEmail("");
    setPassword("");
    setFailMsg("");
  };

  const submit = () => {
    setLoading(true);
    console.log(process.env.REACT_APP_SERVER_HOST);
    axios
      .post(
        process.env.REACT_APP_SERVER_HOST + "/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )

      .then((res) => {
        console.log(res);
        setLoading(false);
        setOpen(false);

        let expireDate = new Date();
        expireDate.setMinutes(expireDate.getMinutes() + 60 * 24 - 1);

        setCookie("authorization", res.data.authorization, {
          path: "/",
          expires: expireDate,
        });
        setClear();
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        setFailMsg("이메일과 비밀번호를 확인해주세요.");
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setClear();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        }}
        className="dialog-main"
      >
        <DialogTitle className="dialog-title">
          <Box className="asset-portfolio">Asset Portfolio</Box>
          <Box className="close-button">
            <Button
              onClick={() => {
                setOpen(false);
                setClear();
              }}
            >
              <Close />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Box className="input-logo-box">
            <Email
              color={focus === "email" || email ? "primary" : "disabled"}
            />
            <TextField
              autoFocus
              label="Email Address"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={changeEmail}
              onFocus={() => setFocus("email")}
            />
          </Box>
          <Box className="input-logo-box">
            <Lock
              color={focus === "password" || password ? "primary" : "disabled"}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={changePassword}
              onFocus={() => setFocus("password")}
            />
          </Box>
        </DialogContent>
        <DialogActions className="submit-button">
          <LoadingButton onClick={submit} loading={loading} variant="contained">
            로그인
          </LoadingButton>
          <Box sx={{ color: "red", marginTop: "10px" }}>{failMsg}</Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignInDialog;
