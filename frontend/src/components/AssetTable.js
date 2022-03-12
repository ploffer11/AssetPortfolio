import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import { Add, Remove, SaveAlt } from "@mui/icons-material";

import AssetTableRow from "./AssetTableRow";
import EarningRateTableCell from "./EarningRateTableCell";
import SortButton from "./SortButton";
import TotalPriceCell from "./TotalPriceCell";
import "../scss/tableRow.scss";

import useStore from "../state";
const AssetTable = () => {
  const {
    buyPriceSum,
    setBuyPriceSum,
    sellPriceSum,
    setSellPriceSum,
    checked,
    setCheckedAll,
    initChecked,
    addChecked,
    sortColumnIndex,
    asset,
    setAsset,
    addAsset,
    getSortAsset,
    loadAsset,
  } = useStore();
  const [cookies, setCookie] = useCookies(["authorization"]);

  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  // const [insertIdx, setInsertIdx] = useState(null);
  // const [placeholder, setPlaceholder] = useState(null);

  const columnName = [
    "#",
    "자산 이름",
    "개수",
    "매수가",
    "매도가",
    "구매액",
    "평가액",
    "수익률",
    "설명",
  ];

  useEffect(() => {
    loadAsset(cookies);
  }, []);

  useEffect(() => {
    initChecked(asset.length + 1);
  }, [asset]);

  return (
    <Box
      sx={{
        paddingTop: "10vh",
        paddingBottom: "20vh",
        boxShadow:
          "0px 0px 3px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "min(2000px, 100vw)",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}></Box>

            <LoadingButton
              loading={loading}
              variant="outlined"
              color="secondary"
              size="large"
              onClick={async () => {
                setLoading(true);
                try {
                  await axios.post(
                    process.env.REACT_APP_SERVER_HOST + "/asset",
                    {
                      assets: asset,
                      authorization: cookies.authorization,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      withCredentials: true,
                    }
                  );
                  setLoading(false);
                } catch (e) {}
              }}
            >
              <SaveAlt sx={{ marginRight: "10px" }} />
              Save
            </LoadingButton>
            <Button
              sx={{ width: "12rem", marginRight: "20px", marginLeft: "20px" }}
              variant="outlined"
              color="success"
              size="large"
              onClick={() => {
                addAsset({ name: `새로운 자산 ${count}` });
                addChecked(false);
                setCount(count + 1);
              }}
            >
              <Add sx={{ marginRight: "10px" }} />
              Add Asset
            </Button>

            <Button
              sx={{ width: "12rem" }}
              variant="outlined"
              color="error"
              size="large"
              onClick={() => {
                setAsset(
                  asset
                    .filter((row, idx) => {
                      return !checked[idx + 1];
                    })
                    .map((row, idx) => {
                      row.index = idx;
                      return row;
                    })
                );
              }}
            >
              <Remove sx={{ marginRight: "10px" }} />
              Delete Asset
            </Button>
          </Box>
          <Box
            sx={{
              marginTop: "1vh",
            }}
          >
            <TableContainer component={Paper}>
              <Table
                sx={{
                  tableLayout: "auto",
                  width: "100%",
                  "& tr:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    transition: "background-color 0.3s",
                  },
                  "& tr": {
                    backgroundColor: "transparent",
                    transition: "background-color 1s",
                    fontFamily: "'Noto Sans KR', sans-serif",
                  },
                  "& td": {
                    fontSize: "1.05rem",
                    fontFamily: "'Noto Sans KR', sans-serif",
                  },
                  "& th": {
                    backgroundColor: "rgba(65,105,225,1)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    fontFamily: "'Noto Sans KR', sans-serif",
                  },
                  fontFamily: "'Noto Sans KR', sans-serif",
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow id="asset-table-head">
                    <TableCell>
                      <Checkbox
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                        checked={checked[0] || false}
                        onChange={(e) => {
                          setCheckedAll(e.target.checked);
                        }}
                      />
                    </TableCell>
                    {columnName.map((name, idx) => {
                      return (
                        <TableCell key={name}>
                          <SortButton text={name} columnIndex={idx} />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(sortColumnIndex !== -1 ? getSortAsset() : asset).map(
                    (row, idx) => {
                      return <AssetTableRow key={row.key} row={row} />;
                    }
                  )}

                  <TableRow
                    sx={{
                      borderTop: "2px solid gray",
                    }}
                  >
                    <TableCell colSpan="6" align="center">
                      합계
                    </TableCell>

                    <TotalPriceCell
                      asset={asset}
                      priceType="buyPrice"
                      setTotalPrice={setBuyPriceSum}
                    />
                    <TotalPriceCell
                      asset={asset}
                      priceType="sellPrice"
                      setTotalPrice={setSellPriceSum}
                    />

                    <EarningRateTableCell
                      buyPrice={buyPriceSum}
                      evalPrice={sellPriceSum}
                    />
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AssetTable;
