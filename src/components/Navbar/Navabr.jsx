import { useContext } from "react";
import styles from "./Navbar.module.css";
import { ConnectWalletContex } from "../../context/ConnectWallet";

const Navbar = () => {
  const { account, handleDisconnect } = useContext(ConnectWalletContex);

  const shortAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MileStone</div>
      <div>{account ? `Wallet: ${shortAddress(account)}` : "Not Connected"}</div>
      <button className={styles.disconnectButton} onClick={handleDisconnect}>
        Disconnect
      </button>
    </nav>
  );
};

export default Navbar;
