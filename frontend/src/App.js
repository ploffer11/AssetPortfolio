import MainPage from "./components/MainPage";
import PortfolioPage from "./components/PortfolioPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
