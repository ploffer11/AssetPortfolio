import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Icon from "@mui/material/Icon";

import EditableTableCell from "./EditableTableCell";
import EarningRateTableCell from "./EarningRateTableCell";
import CurrentPriceTableCell from "./CurrentPriceTableCell";
import getAssetCode from "../CompanyManager";
import SortButton from "./SortButton";

const AssetTableRow = ({ row, changeRow, checked, setChecked }) => {
  const closure = (colName) => {
    return (newCol) => {
      row[colName] = newCol;
      changeRow(row);
    };
  };

  return (
    <TableRow
      key={row.name}
      sx={{
        backgroundColor:
          row.name === "새로운 자산" ? "rgba(221,220,218,1)" : "transparent",
      }}
    >
      <TableCell>
        <Checkbox
          sx={{
            "&.Mui-checked": {
              color: "rgba(0,153,102,1)",
            },
          }}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </TableCell>
      <TableCell>{row.idx}</TableCell>

      <EditableTableCell
        content={row.name}
        type="text"
        changeCol={closure("name")}
      />

      <EditableTableCell content={row.count} changeCol={closure("count")} />
      <EditableTableCell content={row.price} changeCol={closure("price")} />
      {getAssetCode(row.name) === undefined ? (
        <EditableTableCell
          content={row.currentPrice}
          changeCol={closure("currentPrice")}
          questionMark
        />
      ) : (
        <CurrentPriceTableCell
          content={row.currentPrice}
          assetCode={getAssetCode(row.name)}
          changeCol={closure("currentPrice")}
        />
      )}
      <TableCell>{(row.price * row.count).toLocaleString()}</TableCell>
      <TableCell>{(row.currentPrice * row.count).toLocaleString()}</TableCell>
      <EarningRateTableCell
        buyPrice={row.price * row.count}
        evalPrice={row.currentPrice * row.count}
      />
      <EditableTableCell
        content={row.buyDate}
        type="date"
        changeCol={closure("buyDate")}
      />
      <EditableTableCell
        content={row.goalDate}
        type="date"
        changeCol={closure("goalDate")}
      />
      <EditableTableCell
        content={row.sellDate}
        type="date"
        changeCol={closure("sellDate")}
      />
    </TableRow>
  );
};

const AssetTable = () => {
  const [asset, setAsset] = useState([]);
  const [checked, setChecked] = useState([]);
  const [count, setCount] = useState(1);
  const [focus, setFocus] = useState(-1);

  const sum = (str) => {
    return asset.reduce((sum, row) => sum + row[str] * row["count"], 0);
  };

  const createAsset = (
    idx,
    name,
    price,
    count,
    buyDate = "-",
    goalDate = "-",
    sellDate = "-"
  ) => {
    return {
      idx,
      name,
      price,
      count,
      buyDate,
      goalDate,
      sellDate,
      currentPrice: 0,
    };
  };

  const addAsset = (
    name,
    price,
    count,
    buyDate = "-",
    goalDate = "-",
    sellDate = "-"
  ) => {
    setAsset(
      asset.concat(
        createAsset(
          asset.length + 1,
          name,
          price,
          count,
          buyDate,
          goalDate,
          sellDate
        )
      )
    );
    setChecked(checked.concat(false));
  };

  useEffect(() => {
    setAsset([
      createAsset(
        1,
        "카카오",
        130000,
        10,
        "2022-01-01",
        "2030-01-01",
        "2025-01-01"
      ),
      createAsset(2, "삼성전자", 61000, 10, "2022-01-01", "2030-01-01", "-"),
      createAsset(3, "SK하이닉스", 81000, 20, "2022-01-01", "2030-01-01", "-"),
      createAsset(
        4,
        "LG에너지솔루션",
        300000,
        2,
        "2022-01-01",
        "2030-01-01",
        "-"
      ),
      createAsset(5, "RTX 3060ti", 599000, 1, "2022-01-01", "2030-01-01", "-"),
    ]);
    setChecked(new Array(5).fill(false));
  }, []);

  const columnName = [
    "순번",
    "자산 이름",
    "개수",
    "구매 가격",
    "현재 가격",
    "구매액",
    "평가액",
    "수익률",
    "편입일",
    "목표일",
    "편출일",
  ];

  const getValueArray = [
    (row) => row["idx"],
    (row) => row["name"],
    (row) => row["count"],
    (row) => row["price"],
    (row) => row["currentPrice"],
    (row) => row["price"] * row["count"],
    (row) => row["currentPrice"] * row["count"],
    (row) =>
      (row["currentPrice"] * row["count"] - row["price"] * row["count"]) /
      (row["price"] * row["count"]),
    (row) => row["buyDate"],
    (row) => row["goalDate"],
    (row) => row["sellDate"],
  ];

  const compare = (getValue, x, y) => {
    if (getValue(x) == getValue(y)) return 0;
    else return getValue(x) < getValue(y) ? -1 : 1;
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "min(2000px, 100vw)",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            variant="contained"
            onClick={() => {
              addAsset(`새로운 자산 ` + count, 0, 1, "-", "-", "-");
              setCount(count + 1);
            }}
          >
            Add Asset
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table
            sx={{
              marginTop: "1vh",
              "& tr:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                transition: "background-color 0.3s",
              },
              "& tr": {
                backgroundColor: "transparent",
                transition: "background-color 1s",
              },
              "& td": {
                width: "1rem",
                height: "2.5rem",
                fontSize: "1.05rem",
                flexGrow: 0,
              },
              "& th": {
                backgroundColor: "rgba(53,63,81,0.8)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.2rem",
              },
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                    onChange={(e) => {
                      setChecked(
                        new Array(checked.length).fill(e.target.checked)
                      );
                    }}
                  />
                </TableCell>
                {columnName.map((name, idx) => {
                  return (
                    <TableCell key={name}>
                      <SortButton
                        text={name}
                        focus={focus === idx}
                        setFocus={() => setFocus(idx)}
                        sortAscend={() => {
                          setAsset([
                            ...asset.sort((x, y) => {
                              return compare(getValueArray[idx], x, y);
                            }),
                          ]);
                        }}
                        sortDescend={() => {
                          setAsset([
                            ...asset.sort((x, y) => {
                              return -compare(getValueArray[idx], x, y);
                            }),
                          ]);
                        }}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {asset.map((row, idx) => {
                return (
                  <AssetTableRow
                    key={row.name}
                    idx={idx}
                    row={row}
                    changeRow={(row) => {
                      asset[idx] = row;
                      setAsset([...asset]);
                    }}
                    setChecked={(chk) => {
                      checked[idx] = chk;
                      setChecked([...checked]);
                    }}
                    checked={checked[idx]}
                  />
                );
              })}

              <TableRow
                sx={{
                  borderTop: "2px solid gray",
                }}
              >
                <TableCell colSpan="4" align="center">
                  합계
                </TableCell>
                <TableCell>{sum("price").toLocaleString()}</TableCell>
                <TableCell>{sum("currentPrice").toLocaleString()}</TableCell>
                <EarningRateTableCell
                  buyPrice={sum("price")}
                  evalPrice={sum("currentPrice")}
                />
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AssetTable;
