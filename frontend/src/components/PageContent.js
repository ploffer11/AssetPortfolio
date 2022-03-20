import React from "react";
import AssetTable from "./AssetTable";
import MainPage from "./MainPage";

const PageContent = ({ currentView }) => {
  if (currentView === "main") {
    return <MainPage />;
  } else if (currentView === "portfolio") {
    return <AssetTable />;
  }
};

export default PageContent;
