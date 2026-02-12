import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuotesPage from "./pages/QuotesPage";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AcceptPage from "./pages/AcceptPage";
import DeclinePage from "./pages/DeclinePage";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/accept" element={<AcceptPage/>} />
        <Route path="/decline" element={<DeclinePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;