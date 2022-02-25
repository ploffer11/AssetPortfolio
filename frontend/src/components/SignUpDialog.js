import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { AccountCircle, Close, Lock, Email, Check } from "@mui/icons-material";
import axios from "axios";
import useInputField from "../hook/useInput";

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
    <div>
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
      >
        <DialogTitle sx={{ textAlign: "center", position: "relative" }}>
          <Box
            sx={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              fontSize: "2rem",
              textTransform: "none",
              marginRight: "1vw",
              fontStyle: "italic",
              display: "inline",
              color: "rgb(25, 118, 210)",
            }}
          >
            Asset Portfolio
          </Box>
          <Box
            sx={{
              display: "inline",
              position: "absolute",
              marginLeft: "80px",
            }}
          >
            <Button
              onClick={() => {
                setOpen(false);
                setClear();
              }}
            >
              <Close sx={{ width: "35px", height: "35px", color: "black" }} />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* <DialogContentText>안뇽</DialogContentText> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "500px",
              marginTop: "50px",
              "& input": { width: "300px" },
            }}
          >
            <AccountCircle
              sx={{ width: "40px", height: "40px", marginRight: "15px" }}
              color={focus === "name" || name ? "primary" : "disabled"}
            />
            <TextField
              autoFocus
              id="outline-basic"
              label="Name"
              type="text"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={changeName}
              onFocus={() => setFocus("name")}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "500px",
              "& input": { width: "300px" },
            }}
          >
            <Email
              sx={{ width: "40px", height: "40px", marginRight: "15px" }}
              color={focus === "email" || email ? "primary" : "disabled"}
            />
            <TextField
              id="outline-basic"
              label="Email Address"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={changeEmail}
              onFocus={() => setFocus("email")}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "500px",
              "& input": { width: "300px" },
            }}
          >
            <Lock
              sx={{ width: "40px", height: "40px", marginRight: "15px" }}
              color={focus === "password" || password ? "primary" : "disabled"}
            />
            <TextField
              id="outline-basic"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={changePassword}
              onFocus={() => setFocus("password")}
              // helperText="비밀번호는 8자리 이상 20자리 이하로 설정해주세요."
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "500px",
              "& input": { width: "300px" },
            }}
          >
            <Check
              sx={{ width: "40px", height: "40px", marginRight: "15px" }}
              color={
                focus === "checkPassword" || checkPassword
                  ? "primary"
                  : "disabled"
              }
            />
            <TextField
              id="outline-basic"
              label="Password Confirmation"
              type="password"
              variant="outlined"
              margin="normal"
              value={checkPassword}
              onChange={changeCheckPassword}
              onFocus={() => setFocus("checkPassword")}
              // helperText="비밀번호 확인"
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            marginBottom: "100px",
            marginTop: "15px",
            flexDirection: "column",
          }}
        >
          <LoadingButton
            onClick={submit}
            loading={loading}
            sx={{ width: "383px", height: "60px", fontSize: "1.3rem" }}
            variant="contained"
          >
            회원 가입
          </LoadingButton>

          <Box sx={{ color: "red", marginTop: "10px" }}>{failMsg}</Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignUpDialog;
