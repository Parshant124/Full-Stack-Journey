import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="marketingNav" />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MarketingLayout;
