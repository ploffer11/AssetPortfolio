import React, { useState, useCallback } from "react";

const useAsset = () => {
  const createAsset = (
    idx,
    name,
    price,
    count,
    currentPrice = 0,
    buyDate = "-",
    goalDate = "-",
    sellDate = "-",
    isUpdateNow = true
  ) => {
    return {
      idx,
      name,
      price,
      count,
      buyDate,
      goalDate,
      sellDate,
      isUpdateNow,
      currentPrice,
    };
  };

  const addAsset = (
    name,
    price,
    count,
    currentPrice = 0,
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
          currentPrice,
          buyDate,
          goalDate,
          sellDate
        )
      )
    );
  };

  const insertAsset = (currentIdx, insertIdx) => {
    console.log(currentIdx, insertIdx);

    if (insertIdx === null || isNaN(insertIdx)) insertIdx = asset.length;

    let selectAsset = asset[currentIdx];
    asset[currentIdx] = null;
    asset.splice(insertIdx, 0, selectAsset);
    asset.splice(asset.indexOf(null), 1);

    setAsset(
      asset.map((row, idx) => {
        row.idx = idx + 1;
        return row;
      })
    );
  };

  const [asset, setAsset] = useState([
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
    createAsset(3, "SK하이닉스", 81000, 20, 0, "2022-01-01", "2030-01-01", "-"),
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

  return [asset, setAsset, createAsset, addAsset, insertAsset];
};

export default useAsset;
