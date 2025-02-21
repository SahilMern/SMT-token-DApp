import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import styles from "./WalletConnect.module.css";
import { contractAddress } from "../../helper/ContractAddres";
import { Abi } from "../../helper/Abi";
import { ConnectWalletContex } from "../../context/ConnectWallet";

const WalletConnect = () => {
  // const [account, setAccount] = useState(
  //   localStorage.getItem("account") || null
  // );

  const { data,account,  metaMaskConnection } = useContext(ConnectWalletContex);
  const navigate = useNavigate();

  //TODO:- METAMASK CONNECTION HERE
  // const connectWallet = async () => {
  //   if (!window.ethereum) {
  //     alert("MetaMask is not installed. Please install it to continue.");
  //     return;
  //   }

  //   try {
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const signer = await provider.getSigner();
  //     const userAccount = await signer.getAddress();
  //     // let networkData = await provider.getNetwork();

  //     //! BNB CODE START HERE  -----------------
  //     const providerForContract = new ethers.JsonRpcProvider(
  //       "https://bsc-testnet-dataseed.bnbchain.org"
  //     );
  //     const contract = new ethers.Contract(
  //       contractAddress,
  //       Abi,
  //       providerForContract
  //     );
  //     const contractOwner = await contract.owner();
  //     console.log(contractOwner, "ContractOwner");

  //     const userValue = "0x07167acA51498BA070858E0a91fcafB26Bc32ce4";
  //     if (userValue === contractOwner) {
  //       setAccount(userAccount);
  //       localStorage.setItem("account", userAccount);
  //       localStorage.setItem("login", "true");
  //       navigate("/");
  //     } else {
  //       alert(`${userAccount} Address Not match with Owner Adress`);
  //     }
  //   } catch (error) {
  //     console.error("Error connecting wallet:", error);
  //   }
  // };

  //TODO:- CHECK USER IS CONNECTED OR NOT
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
        <p>Unlock exclusive benefits by connecting your wallet.</p>
        <p>{data}</p>
        <button onClick={metaMaskConnection} className={styles.button}>
          {/* {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"} */}
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletConnect;
