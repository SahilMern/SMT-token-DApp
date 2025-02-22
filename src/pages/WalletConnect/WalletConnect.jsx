import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WalletConnect.module.css";
import { ConnectWalletContex } from "../../context/ConnectWallet";

const WalletConnect = () => {
  const { metaMaskConnection, data } = useContext(ConnectWalletContex);
  const navigate = useNavigate();

  //? Check if the user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.WalletConnect_Box}>
        <img src="./star_milestone.png" alt="Token Milestone" />
        <h3>Token Milestone</h3>
        <p>Unlock exclusive benefits by connecting your wallet. </p>
        <p>{data}</p>
        <button onClick={metaMaskConnection} className={styles.button}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletConnect;
