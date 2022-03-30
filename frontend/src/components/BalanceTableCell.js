import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { TaskAlt } from "@mui/icons-material";
import { Box } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import PriceBox from "./PriceBox";
import useInputField from "../hook/useInputField";
import axios from "axios";

const BalanceTableCell = ({}) => {
  const [isEditableNow, setIsEditableNow] = useState(false);
  const [balance, setBalance, changeBalance] = useInputField();
  const [component, setComponent] = useState(null);
  const [cookies, setCookie] = useCookies(["authorization"]);

  useEffect(() => {
    if (isEditableNow) {
      setComponent(
        <TextField
          size="small"
          value={balance || ""}
          variant="standard"
          sx={{
            "& input": {
              fontWeight: "bold",
              textAlign: "right",
              width: "100%",
            },
          }}
          onChange={changeBalance}
          autoFocus
        />
      );
    } else {
      setComponent(<PriceBox price={parseInt(balance)} currencySymbol="₩" />);
    }
  }, [isEditableNow, balance]);

  useEffect(() => {
    (async () => {
      let res = await axios.post(
        process.env.REACT_APP_SERVER_HOST + `/users/balance`,
        { balance: parseInt(balance), authorization: cookies.authorization },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    })();
  }, [balance]);

  useEffect(() => {
    (async () => {
      let res = await axios.get(
        process.env.REACT_APP_SERVER_HOST +
          `/users/balance?authorization=${cookies.authorization}`
      );
      setBalance(res.data.balance);
    })();
  }, []);

  return (
    <TableCell
      sx={{
        cursor: "pointer",
        overflow: "hidden",
      }}
      onBlur={() => {
        setIsEditableNow(false);
      }}
      onClick={() => {
        setIsEditableNow(true);
      }}
    >
      <Box>{component}</Box>
    </TableCell>
  );
};

export default BalanceTableCell;
