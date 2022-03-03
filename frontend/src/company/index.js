import data from "./data";

let rows = data.toUpperCase().split("\n");

let assetCodes = {};
let autoCompleteList = [];

rows.map((row) => {
  let [name, assetCode] = row.split(",");
  assetCodes[name] = assetCode.padStart(6, "0");
  autoCompleteList.push({ label: name, assetCode });
});

const getAssetCode = (name) => {
  name = name.replaceAll(" ", "").toUpperCase();
  return assetCodes[name];
};

export { autoCompleteList, getAssetCode };
