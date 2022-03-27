import { Route, Routes, BrowserRouter } from "react-router-dom";
import PageView from "./components/PageView";
import StockChart from "./components/StockChart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageView currentView="main" />} />
        <Route
          path="/portfolio"
          element={<PageView currentView="portfolio" />}
        />
        <Route path="/history" element={<PageView currentView="history" />} />
        <Route
          path="/login"
          element={<PageView currentView="main" signInOpen={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
