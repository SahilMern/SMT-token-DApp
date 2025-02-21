import { createContext, useState } from "react";
import { ethers } from "ethers";

export const ConnectWalletContex = createContext();
const ConnectWallet = ({ children }) => {
  const [account, setAccount] = useState(
    localStorage.getItem("account") || null
  );
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [addressesData, setAddressesData] = useState([]);

  const metaMaskConnection = async () => {
    console.log(".... metamask connectect here ");
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to continue.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAccount = await signer.getAddress();
      let networkData = await provider.getNetwork();

      setAccount(userAccount);
      setNetwork(Number(networkData.chainId));
      localStorage.setItem("account", userAccount);

      // getBalance(userAccount);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const logout = () => {
    setAccount(null);
    setBalance(null);
    setNetwork(null);
    localStorage.removeItem("account");
  };
  return (
    <ConnectWalletContex
      value={{
        account,
        balance,
        network,
        addressesData,
        setAccount,
        setBalance,
        setNetwork,
        setAddressesData,
        metaMaskConnection,
        logout,
      }}
    >
      {children}
    </ConnectWalletContex>
  );
};

export default ConnectWallet;
