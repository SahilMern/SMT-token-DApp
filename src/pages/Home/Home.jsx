import React from "react";
import { Outlet } from "react-router-dom"; // ✅ Import Outlet
import Sidebar from "../../components/Home/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navabr";
import Footer from "../../components/Footer/Footer";
import "./home.css"
const Home = () => {
  return (
    <div className="app-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Navbar />
        <div className="extraDiv">

        <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
