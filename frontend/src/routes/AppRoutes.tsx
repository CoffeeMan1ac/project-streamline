import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import QuotesPage from "../pages/QuotesPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quotes" element={<QuotesPage />} />
    </Routes>
  );
};

export default AppRoutes;
