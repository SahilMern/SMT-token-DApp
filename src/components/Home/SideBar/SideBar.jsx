import styles from "./Sidebar.module.css"; // CSS module import
import {
  FaExchangeAlt,
  FaShoppingCart,
  FaGift,
  FaUserCircle,
} from "react-icons/fa"; // Importing icons
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  let location = useLocation();
  console.log(location.pathname === "/", "loaction");

  return (
    <div className={styles.sidebar}>
      <div className={styles.sideBarContainer}>
        <img
          src="https://token.decentrawood.com/static/media/Logo.1d10f686.png"
          alt="Logo"
          className={styles.logo}
        />
        {/* {
          URL.path
        } */}
        <ul>
        <NavLink to={"/"} className="Navlink">
          <li className={location.pathname === "/" ? styles.active : ""}>
            <MdDashboard className={styles.icon} /> Dashboard
          </li>
        </NavLink>
          <NavLink to={"/about"} className="Navlink">
            <li className={location.pathname === "/about" ? styles.active : ""}>
              <FaUsers className={styles.icon} /> Users
            </li>
          </NavLink>
          <li>
            <FaExchangeAlt className={styles.icon} /> Direct Transfer
          </li>
          <li>
            <FaShoppingCart className={styles.icon} /> Buy
          </li>
          <li>
            <FaGift className={styles.icon} /> Airdrop
          </li>
          <li>
            <FaUserCircle className={styles.icon} /> My Profile
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
