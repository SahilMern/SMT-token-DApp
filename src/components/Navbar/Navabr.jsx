import { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger Menu Icons
import { ConnectWalletContex } from "../../context/ConnectWallet";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { account, network, metaMaskConnection, logout } =
    useContext(ConnectWalletContex);
  // console.log(account, "account");

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

      {account ? (
        <div className="wallet-info">
          <p>
            <strong>Wallet:</strong> {account}
          </p>
          <p>
            <strong>Network:</strong> {network === 97 ? "BSC Testnet" : "Other"}
          </p>
          {/* <p><strong>BNB Balance:</strong> {balance ? `${balance} BNB` : "Loading..."}</p> */}
          <button className="button logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        // <button className="button connect-button" onClick={metaMaskConnection}>Connect Wallet</button>
        <button className={styles.walletButton} onClick={metaMaskConnection}>
          Connect Wallet
        </button>
      )}
      {/* Connect Wallet Button */}
      {/* <button className={styles.walletButton} onClick={metaMaskConnection}>Connect Wallet</button> */}
    </nav>
  );
};

export default Navbar;
