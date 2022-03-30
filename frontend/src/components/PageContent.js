import React from "react";
import AssetTable from "./AssetTable";
import MainPage from "./MainPage";
import MobileAssetTable from "./MobileAssetTable";

const PageContent = ({ currentView }) => {
  if (currentView === "main") {
    return <MainPage />;
  } else if (currentView === "portfolio") {
    return <AssetTable />;
  } else if (currentView === "mobile") {
    return <MobileAssetTable />;
  }
};

export default PageContent;
