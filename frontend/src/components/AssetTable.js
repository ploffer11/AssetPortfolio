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
import useAsset from "../hook/useAsset";
import PriceBox from "./PriceBox";

const AssetTable = () => {
  const [asset, setAsset, createAsset, addAsset, insertAsset] = useAsset();
  const [checked, setChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [count, setCount] = useState(1);
  const [focus, setFocus] = useState(-1);
  const [insertIdx, setInsertIdx] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["authorization"]);

  const sum = (str) => {
    return asset.reduce((sum, row) => sum + row[str] * row["count"], 0);
  };

  useEffect(() => {
    setChecked(new Array(asset.length).fill(false));
  }, [asset]);

  const columnName = [
    ["#", "left"],
    ["자산 이름", "left"],
    ["개수", "right"],
    ["매수가", "right"],
    ["매도가", "right"],
    ["구매액", "right"],
    ["평가액", "right"],
    ["수익률", "center"],
    ["편입일", "center"],
    ["목표일", "center"],
    ["편출일", "center"],
  ];

  const getValueArray = [
    (row) => row["index"],
    (row) => row["name"],
    (row) => row["count"],
    (row) => row["buyPrice"],
    (row) => row["sellPrice"],
    (row) => row["buyPrice"] * row["count"],
    (row) => row["sellPrice"] * row["count"],
    (row) =>
      (row["sellPrice"] * row["count"] - row["buyPrice"] * row["count"]) /
      (row["buyPrice"] * row["count"]),
    (row) => row["buyDate"],
    (row) => row["goalDate"],
    (row) => row["sellDate"],
  ];

  const compare = (getValue, x, y) => {
    if (getValue(x) == getValue(y)) return 0;
    else return getValue(x) < getValue(y) ? -1 : 1;
  };

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
            width: "min(1700px, 100vw)",
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
                  console.log(asset, "save");
                  await axios.post(
                    process.env.REACT_APP_SERVER_HOST + "/asset",
                    {
                      assets: asset,
                      authorization: cookies.authorization,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        authorization: cookies.authorization,
                      },
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
                addAsset(`새로운 자산 ` + count, 0, 0, 0, null, null, null);
                setChecked(checked.concat(false));
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
                let count = checked.reduce(
                  (sum, val) => sum + (val === false),
                  0
                );
                setAsset(
                  asset
                    .filter((row, idx) => {
                      return !checked[idx];
                    })
                    .map((row, idx) => {
                      row.index = idx + 1;
                      return row;
                    })
                );
                setAllChecked(false);
                setChecked(new Array(count).fill(false));
              }}
            >
              <Remove sx={{ marginRight: "10px" }} />
              Delete Asset
            </Button>
          </Box>
          <Box
            sx={{
              // boxShadow:
              //   "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
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
                      return (
                        <TableCell key={name} align={align}>
                          <SortButton
                            text={name}
                            focus={focus === idx}
                            setFocus={() => setFocus(idx)}
                            sortAscend={() => {
                              console.log(
                                [
                                  ...asset.sort((x, y) => {
                                    return compare(getValueArray[idx], x, y);
                                  }),
                                ].map((row, idx) => {
                                  row.index = idx + 1;
                                  return row;
                                })
                              );
                              setAsset(
                                [
                                  ...asset.sort((x, y) => {
                                    return compare(getValueArray[idx], x, y);
                                  }),
                                ].map((row, idx) => {
                                  row.index = idx + 1;
                                  return row;
                                })
                              );
                            }}
                            sortDescend={() => {
                              setAsset([
                                ...asset
                                  .sort((x, y) => {
                                    return -compare(getValueArray[idx], x, y);
                                  })
                                  .map((row, idx) => {
                                    row.index = idx + 1;
                                    return row;
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
                        key={row.index}
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
                        placeholder={placeholder}
                        setPlaceholder={setPlaceholder}
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
                      <PriceBox price={sum("buyPrice")} />
                    </TableCell>
                    <TableCell>
                      <PriceBox price={sum("sellPrice")} />
                    </TableCell>
                    <EarningRateTableCell
                      buyPrice={sum("buyPrice")}
                      evalPrice={sum("sellPrice")}
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
      </Box>
    </Box>
  );
};

export default AssetTable;
