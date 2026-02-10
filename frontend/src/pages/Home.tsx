import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";
import QuotesPage from "../pages/QuotesPage";

const Home = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <PricingSection />
            <Footer />
          </>
        } />
        <Route path="/quotes" element={<QuotesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Home;