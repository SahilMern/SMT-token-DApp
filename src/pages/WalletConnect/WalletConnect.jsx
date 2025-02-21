import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import styles from "./WalletConnect.module.css";
import { contractAddress } from "../../helper/ContractAddres";
import { Abi } from "../../helper/Abi";

const WalletConnect = () => {
  const [account, setAccount] = useState(localStorage.getItem("account") || null);
  const navigate = useNavigate();

  // 🔹 Check if user is already logged in, then redirect to home "/"
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login");
    if (isLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to continue.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAccount = await signer.getAddress();
      let networkData = await provider.getNetwork();

      const providerForContract = new ethers.JsonRpcProvider(
        "https://bsc-testnet-dataseed.bnbchain.org"
      );
      const contract = new ethers.Contract(contractAddress, Abi, providerForContract);
      const contractOwner = await contract.owner();

      const userValue = "0x1370123705D04A904dC169d75Bf68a6aCA4BdA1E";

      if (userValue === contractOwner) {
        setAccount(userAccount);
        localStorage.setItem("account", userAccount);
        localStorage.setItem("login", "true");

        navigate("/"); // Redirect to home after successful login
      }else{
        alert(`${userAccount} Address Not match with Owner Adress`)
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.WalletConnect_Box}>
        <img src="./star_milestone.png" alt="Token Milestone" />
        <h3>Token Milestone</h3>
        <p>Unlock exclusive benefits by connecting your wallet.</p>
        <button onClick={connectWallet} className={styles.button}>
          {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default WalletConnect;
