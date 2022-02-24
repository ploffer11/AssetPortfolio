import data from "./data";

let rows = data.toUpperCase().split("\n");

let assetCodes = {};

rows.map((row) => {
  let [name, assetCode] = row.split(",");
  assetCodes[name] = assetCode.padStart(6, "0");
  // console.log(`#${name}#${assetCode}#`);
});

const getAssetCode = (name) => {
  name = name.replaceAll(" ", "").toUpperCase();
  return assetCodes[name];
};

export default getAssetCode;
