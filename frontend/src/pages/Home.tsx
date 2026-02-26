import HeroSection from "../components/HeroSection";
import ProductSection from "../components/ProductSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#quotes") {
      requestAnimationFrame(() => {
        document.getElementById("quotes")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.hash]);

  return (
    <>
      <HeroSection />
      <ProductSection />
    </>
  );
};

export default Home;
