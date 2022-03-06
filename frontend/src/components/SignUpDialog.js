import * as React from "react";
import { useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { AccountCircle, Close, Lock, Email, Check } from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";

import useInputField from "../hook/useInput";
import "../scss/sign.scss";

const SignUpDialog = ({ open = false, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName, changeName] = useInputField();
  const [email, setEmail, changeEmail] = useInputField();
  const [password, setPassword, changePassword] = useInputField();
  const [checkPassword, setCheckPassword, changeCheckPassword] =
    useInputField();

  const setClear = () => {
    setFailMsg("");
    setFocus("");
    setName("");
    setEmail("");
    setPassword("");
    setCheckPassword("");
  };

  const submit = () => {
    if (password !== checkPassword) {
      setFailMsg("비밀번호가 동일하지 않습니다. 비밀번호를 확인해주세요.");
    } else if (!(8 <= password.length && password.length <= 20)) {
      setFailMsg("비밀번호는 8자리 ~ 20자리로 설정해주세요.");
    } else {
      setLoading(true);
      axios
        .post(
          process.env.REACT_APP_SERVER_HOST + "/users",
          {
            name,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
          setOpen(false);
          setClear();
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
          // 중복 이메일 or 이메일이 아님
          setFailMsg("올바른 이메일인지 확인해주세요.");
        });
    }
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
            <AccountCircle
              color={focus === "name" || name ? "primary" : "disabled"}
            />
            <TextField
              autoFocus
              label="Name"
              type="text"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={changeName}
              onFocus={() => setFocus("name")}
            />
          </Box>
          <Box className="input-logo-box">
            <Email
              color={focus === "email" || email ? "primary" : "disabled"}
            />
            <TextField
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
          <Box className="input-logo-box">
            <Check
              color={
                focus === "checkPassword" || checkPassword
                  ? "primary"
                  : "disabled"
              }
            />
            <TextField
              label="Password Confirmation"
              type="password"
              variant="outlined"
              margin="normal"
              value={checkPassword}
              onChange={changeCheckPassword}
              onFocus={() => setFocus("checkPassword")}
            />
          </Box>
        </DialogContent>
        <DialogActions className="submit-button">
          <LoadingButton onClick={submit} loading={loading} variant="contained">
            회원 가입
          </LoadingButton>
          <Box sx={{ color: "red", marginTop: "10px" }}>{failMsg}</Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUpDialog;
