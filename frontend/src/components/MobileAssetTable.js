import React, { useState, useEffect, useCallback } from "react";
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
import { Add, Remove, Sell, Upload } from "@mui/icons-material";

import EarningRateTableCell from "./EarningRateTableCell";
import SortButton from "./SortButton";
import TotalPriceCell from "./TotalPriceCell";
import "../scss/table.scss";
import useStore from "../state";
import MobileAssetTableRow from "./MobileAssetTableRow";
import BalanceTableCell from "./BalanceTableCell";

const MobileAssetTable = () => {
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
    errorAlert,
    successAlert,
  } = useStore();
  const [cookies, setCookie] = useCookies(["authorization"]);

  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const saveAssetCallback = useCallback(async () => {
    setLoading(true);
    console.log("asset", asset);
    try {
      await axios.post(
        process.env.REACT_APP_SERVER_HOST + "/asset",
        {
          asset: asset.map(
            ({
              index,
              count,
              buyPrice,
              sellPrice,
              name,
              assetCode,
              description,
              currency,
              currencySymbol,
              isUpdateNow,
            }) => ({
              index,
              count: parseInt(count),
              buyPrice: parseFloat(buyPrice),
              sellPrice: parseFloat(sellPrice),
              name,
              assetCode,
              description,
              currency,
              currencySymbol,
              isUpdateNow,
            })
          ),
          authorization: cookies.authorization,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      successAlert("Save asset success");
    } catch (e) {
      console.log(e.response);
      errorAlert("Save asset failed");
    }
    setLoading(false);
  });

  const addAssetCallback = useCallback(() => {
    addAsset({ name: `새로운 자산 ${count}` });
    addChecked(false);
    setCount(count + 1);
  });

  const deleteAssetCallback = useCallback(() => {
    setAsset(
      asset
        .filter((row, idx) => {
          return !checked[idx + 1];
        })
        .map((row, idx) => {
          row.orderIndex = row.index = idx;
          return row;
        })
    );
  });

  const sellAssetCallback = useCallback(() => {});

  useEffect(() => {
    loadAsset(cookies);
  }, []);

  useEffect(() => {
    initChecked(asset.length + 1);
  }, [asset.length]);

  return (
    <Box
      sx={{
        paddingTop: "10rem",
        paddingBottom: "10rem",
        display: "flex",
        width: "100vw",
      }}
    >
      <Box sx={{ margin: "auto" }}>
        <Box
          sx={{
            display: "flex",
            "& button": {
              marginLeft: "20px",
            },
            "& svg": {
              marginRight: "10px",
            },
          }}
        >
          <LoadingButton
            loading={loading}
            variant="outlined"
            color="secondary"
            size="large"
            onClick={saveAssetCallback}
          >
            <Upload />
            Save
          </LoadingButton>
          <Button
            sx={{ width: "12rem" }}
            variant="outlined"
            color="warning"
            size="large"
            onClick={sellAssetCallback}
          >
            <Sell />
            Sell Asset
          </Button>
          <Button
            sx={{ width: "12rem" }}
            variant="outlined"
            color="success"
            size="large"
            onClick={addAssetCallback}
          >
            <Add />
            Add Asset
          </Button>
          <Button
            sx={{ width: "12rem" }}
            variant="outlined"
            color="error"
            size="large"
            onClick={deleteAssetCallback}
          >
            <Remove />
            Delete Asset
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: "1vh",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              width: "1500px",
            }}
          >
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
                <TableRow className="asset-table-head-mobile">
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
                    return <MobileAssetTableRow key={row.key} row={row} />;
                  }
                )}

                <TableRow
                  sx={{
                    borderTop: "2px solid gray",
                  }}
                  // className="asset-table-row"
                >
                  <TableCell colSpan="2" align="center">
                    잔고
                  </TableCell>
                  <BalanceTableCell />
                  <TableCell colSpan="3" align="center">
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
  );
};

export default MobileAssetTable;
