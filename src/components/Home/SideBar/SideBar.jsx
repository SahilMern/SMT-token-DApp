import styles from "./Sidebar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//ICONS
import {
  FaExchangeAlt,
  FaShoppingCart,
  FaGift,
  FaUserCircle,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";

const Sidebar = () => {
  let location = useLocation();
  // console.log(location.pathname === "/", "loaction");

  return (
    <div className={styles.sidebar}>
      <div className={styles.sideBarContainer}>
        <img
          src="https://token.decentrawood.com/static/media/Logo.1d10f686.png"
          alt="Logo"
          className={styles.logo}
        />
        <ul>
          <NavLink to={"/"} className="Navlink">
            <li className={location.pathname === "/" ? styles.active : ""}>
              <MdDashboard className={styles.icon} /> Dashboard
            </li>
          </NavLink>
          {/* <NavLink to={"/about"} className="Navlink">
            <li className={location.pathname === "/about" ? styles.active : ""}>
              <FaUsers className={styles.icon} /> Users
            </li>
          </NavLink> */}

          <NavLink to={"/setdata"} className="Navlink">
            <li
              className={location.pathname === "/setdata" ? styles.active : ""}
            >
              <FaExchangeAlt className={styles.icon} />Set Data
            </li>
          </NavLink>
          
          <li onClick={() => toast("No page! Its only for design purpose")}>
            <FaShoppingCart className={styles.icon} /> Buy
          </li>
          <li onClick={() => toast("No page! Its only for design purpose")}>
            <FaGift className={styles.icon} /> Airdrop
          </li>
          <li onClick={() => toast("No page! Its only for design purpose")}>
            <FaUserCircle className={styles.icon} /> My Profile
          </li>
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
