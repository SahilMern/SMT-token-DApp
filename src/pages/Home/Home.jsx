import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Home/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navabr";
import Footer from "../../components/Footer/Footer";
import { ConnectWalletContex } from "../../context/ConnectWallet";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const { account } = useContext(ConnectWalletContex);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login");
    if (!account || isLoggedIn !== "true") {
      navigate("/walletconnect");
    }
  }, [account, navigate]);

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
