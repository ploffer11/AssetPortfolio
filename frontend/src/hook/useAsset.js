import React, { useState, useCallback } from "react";

const useAsset = () => {
  const [asset, setAsset] = useState([]);

  const createAsset = (
    idx,
    name,
    price,
    count,
    currentPrice = 0,
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

  return [asset, setAsset, createAsset, addAsset, insertAsset];
};

export default useAsset;
