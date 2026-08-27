import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import MarketingNav from "./Nav/MarketingNav";
import AuthNav from "./Nav/AuthNav";
import DashboardNav from "./Nav/DashboardNav";

function Header({ type }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="flex justify-between md:px-10 h-16 w-full items-center shadow-lg p-2">
      {type === "marketingNav" && (
        <MarketingNav showMore={showMore} setShowMore={setShowMore} />
      )}
      {type === "authNav" && <AuthNav />}
      {type === "dashNav" && <DashboardNav />}
    </div>
  );
}

export default Header;
