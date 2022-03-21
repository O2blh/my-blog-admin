import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./SideBar";

import "./style.css";

const Layout = ({ children }) => {
  return (
    <div className="AdminBox">
      <Sidebar />
      <div className="ContentBox">
        <Header />
        <div className="MainBox">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
