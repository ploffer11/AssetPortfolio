import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const useAsset = () => {
  const createAsset = (
    index,
    name,
    buyPrice,
    count,
    sellPrice = 0,
    assetCode = null,
    description = null,
    isUpdateNow = true,
    currency = "KRW",
    currencySymbol = "₩"
  ) => {
    return {
      index,
      name,
      buyPrice,
      count,
      assetCode,
      description,
      isUpdateNow,
      sellPrice,
      currency,
      currencySymbol,
    };
  };

  const addAsset = (
    name,
    buyPrice,
    count,
    sellPrice = 0,
    assetCode = null,
    description = null
  ) => {
    setAsset(
      asset.concat(
        createAsset(
          asset.length,
          name,
          buyPrice,
          count,
          sellPrice,
          assetCode,
          description
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
        row.index = idx;
        return row;
      })
    );
  };

  const [asset, setAsset] = useState([]);

  const [cookies, setCookie] = useCookies(["authorization"]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SERVER_HOST +
          `/asset/all?authorization=${cookies.authorization}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setAsset(res.data.sort((x, y) => x.index - y.index));
      })
      .catch((err) => {
        console.log(err.response);
      });
    console.log("use Asset");
  }, []);

  return [asset, setAsset, createAsset, addAsset, insertAsset];
};

export default useAsset;
