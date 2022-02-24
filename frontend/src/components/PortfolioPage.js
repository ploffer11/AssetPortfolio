import AssetTable from "./AssetTable";

const PortfolioPage = () => {
  return (
    <div
      style={{
        paddingTop: "10vh",
        paddingBottom: "20vh",
        boxShadow:
          "0px 0px 3px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      }}
    >
      <AssetTable />
    </div>
  );
};

export default PortfolioPage;
