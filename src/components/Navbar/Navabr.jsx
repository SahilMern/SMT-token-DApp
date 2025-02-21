import { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger Menu Icons
import { ConnectWalletContex } from "../../context/ConnectWallet";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { account, network, metaMaskConnection, logout } =
    useContext(ConnectWalletContex);

  // Function to shorten the wallet address
  const shortAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <h3>MyDeod</h3>
      </div>

      {/* Wallet Info - Center Aligned */}
      <div className={styles.walletInfo}>
        {account ? (
          <>
            <p>
              <strong>Wallet:</strong> {shortAddress(account)}
            </p>
            <p>
              <strong>Network:</strong>{" "}
              {network === 97 ? "BSC Testnet" : "Other"}
            </p>
          </>
        ) : (
          <button className={styles.walletButton} onClick={metaMaskConnection}>
            Connect Wallet
          </button>
        )}
      </div>

      {/* Disconnect Button */}
      {account && (
        <button className={styles.disconnectButton} onClick={logout}>
          Disconnect
        </button>
      )}

      {/* Mobile Menu Icon */}
      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
