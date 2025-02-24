import { createContext, useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../helper/ContractAddres";
import { Abi } from "../helper/Abi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importing React Toastify
import { Log } from "ethers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ConnectWalletContex = createContext();

const ConnectWallet = ({ children }) => {
  const [account, setAccount] = useState(
    localStorage.getItem("account") || null
  );
  const navigate = useNavigate();

  const metaMaskConnection = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed. Please install it to continue.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAccount = await signer.getAddress();
      const networkData = await provider.getNetwork();

      const providerForContract = new ethers.JsonRpcProvider(
        "https://bsc-testnet-dataseed.bnbchain.org"
      );
      const contract = new ethers.Contract(
        contractAddress,
        Abi,
        providerForContract
      );
      const contractOwner = await contract.owner();

      //! Define the owner's address Dummy
      // const userValue = "0x08DCCcC7263C7E888D68a9AD1E9f9D008B0D61FD";

      // console.log(
      //   userValue,
      //   contractOwner,
      //   userAccount,
      //   "data sss",

      //   userValue === contractOwner
      // );

      if (userAccount === contractOwner) {
        setAccount(userAccount);
        localStorage.setItem("account", userAccount);
        localStorage.setItem("login", "true");
        navigate("/");
        toast.success("Connected to MetaMask successfully.");
      } else {
        toast.error(`Address ${userAccount} doesn't match the Contract Owner.`);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Error connecting to MetaMask.");
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    localStorage.removeItem("account");
    localStorage.removeItem("login");
    toast.info("Disconnected from MetaMask.");
    navigate("/walletconnect");
  };

  return (
    <ConnectWalletContex.Provider
      value={{ account, metaMaskConnection, handleDisconnect }}
    >
      {children}
      <ToastContainer />
    </ConnectWalletContex.Provider>
  );
};

export default ConnectWallet;
