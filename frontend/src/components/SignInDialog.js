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
import { AccountCircle, Close, Lock, Email } from "@mui/icons-material";
import axios from "axios";
import useInputField from "../hook/useInput";

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
            <Email
              sx={{ width: "40px", height: "40px", marginRight: "15px" }}
              color={focus === "email" || email ? "primary" : "disabled"}
            />
            <TextField
              autoFocus
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
            로그인
          </LoadingButton>

          <Box sx={{ color: "red", marginTop: "10px" }}>{failMsg}</Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignInDialog;
