import React, { useState, useEffect } from "react";

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

import AssetTableRow from "./AssetTableRow";
import EarningRateTableCell from "./EarningRateTableCell";
import SortButton from "./SortButton";
import useAsset from "../hook/useAsset";
import PriceBox from "./PriceBox";

const AssetTable = () => {
  const [asset, setAsset, createAsset, addAsset, insertAsset] = useAsset();
  const [checked, setChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [count, setCount] = useState(1);
  const [focus, setFocus] = useState(-1);
  const [insertIdx, setInsertIdx] = useState(null);

  const sum = (str) => {
    return asset.reduce((sum, row) => sum + row[str] * row["count"], 0);
  };

  useEffect(() => {
    setAsset([
      createAsset(
        1,
        "카카오",
        130000,
        10,
        0,
        "2022-01-01",
        "2030-01-01",
        "2025-01-01"
      ),
      createAsset(2, "삼성전자", 61000, 10, 0, "2022-01-01", "2030-01-01", "-"),
      createAsset(
        3,
        "SK하이닉스",
        81000,
        20,
        0,
        "2022-01-01",
        "2030-01-01",
        "-"
      ),
      createAsset(
        4,
        "LG에너지솔루션",
        300000,
        2,
        0,
        "2022-01-01",
        "2030-01-01",
        "-"
      ),
      createAsset(
        5,
        "RTX 3060ti",
        599000,
        1,
        300000,
        "2022-01-01",
        "2030-01-01",
        "-"
      ),
    ]);
    setChecked(new Array(5).fill(false));
  }, []);

  const columnName = [
    ["#", "left"],
    ["자산 이름", "left"],
    ["개수", "right"],
    ["구매 가격", "right"],
    ["현재 가격", "right"],
    ["구매액", "right"],
    ["평가액", "right"],
    ["수익률", "center"],
    ["편입일", "left"],
    ["목표일", "left"],
    ["편출일", "left"],
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
          width: "min(1700px, 100vw)",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}></Box>

          <Button
            variant="contained"
            onClick={() => {
              addAsset(`새로운 자산 ` + count, 0, 1, "-", "-", "-");
              setChecked(checked.concat(false));
              setCount(count + 1);
            }}
          >
            Add Asset
          </Button>

          <Button
            sx={{ marginLeft: "20px" }}
            variant="contained"
            color="error"
            onClick={() => {
              let count = checked.reduce((sum, val) => sum + val, 0);
              setAsset(
                asset
                  .filter((row, idx) => {
                    return !checked[idx];
                  })
                  .map((row, idx) => {
                    row.idx = idx + 1;
                    return row;
                  })
              );
              setAllChecked(false);
              setChecked(new Array(count).fill(false));
            }}
          >
            Delete Asset
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table
            sx={{
              marginTop: "1vh",
              tableLayout: "auto",
              width: "100%",
              "& tr:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                transition: "background-color 0.3s",
              },
              "& tr": {
                backgroundColor: "transparent",
                transition: "background-color 1s",
              },
              "& td": {
                fontSize: "1.05rem",
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
                    checked={allChecked}
                    onChange={(e) => {
                      setChecked(
                        new Array(checked.length).fill(e.target.checked)
                      );
                      setAllChecked(e.target.checked);
                    }}
                  />
                </TableCell>
                {columnName.map(([name, align], idx) => {
                  console.log(name, align, "??");
                  return (
                    <TableCell key={name} align={align}>
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
                    insertAsset={insertAsset}
                    insertIdx={insertIdx}
                    setInsertIdx={setInsertIdx}
                  />
                );
              })}

              <TableRow
                sx={{
                  borderTop: "2px solid gray",
                }}
              >
                <TableCell colSpan="6" align="center">
                  합계
                </TableCell>
                <TableCell>
                  <PriceBox price={sum("price")} />
                </TableCell>
                <TableCell>
                  <PriceBox price={sum("currentPrice")} />
                </TableCell>
                <EarningRateTableCell
                  buyPrice={sum("price")}
                  evalPrice={sum("currentPrice")}
                />
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              <TableRow
                id="placeholder"
                draggable="true"
                onDragOver={(e) => {
                  e.preventDefault();
                }}
              >
                <TableCell
                  colSpan="12"
                  align="center"
                  sx={{ backgroundColor: "rgba(160,218,169,1)" }}
                >
                  여기에 삽입됩니다.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AssetTable;
