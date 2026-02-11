import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuotesPage from "./pages/QuotesPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotes" element={<QuotesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;