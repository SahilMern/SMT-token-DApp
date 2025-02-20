import { useContext, useState } from "react";
import styles from "./Navbar.module.css"; 
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger Menu Icons
import { ConnectWalletContex } from "../../context/ConnectWallet";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { account, connectWallet, disconnectWallet } = useContext(ConnectWalletContex);
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h3>MyDeod</h3>
      </div>

      {/* Mobile Menu Icon */}
      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar Links */}
      {/* <div className={`${styles.menu} ${menuOpen ? styles.active : ""}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/services">Services</a></li>
        </ul>
      </div> */}

      {/* Connect Wallet Button */}
      <button className={styles.walletButton} onClick={handleClick}>Connect Wallet</button>
    </nav>
  );
};

export default Navbar;
