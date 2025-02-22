import { createContext, useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../helper/ContractAddres";
import { Abi } from "../helper/Abi";
import { useNavigate } from "react-router-dom";

export const ConnectWalletContex = createContext();

const ConnectWallet = ({ children }) => {
  const data = "hanuman ji";

  const [account, setAccount] = useState(
    localStorage.getItem("account") || null
  );
  const navigate = useNavigate();
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

      try {
        const providerForContract = new ethers.JsonRpcProvider(
          "https://bsc-testnet-dataseed.bnbchain.org"
        );
        const contract = new ethers.Contract(
          contractAddress,
          Abi,
          providerForContract
        );
        const contractOwner = await contract.owner();
        console.log(contractOwner, "ContractOwner");

        const userValue = "0x08DCCcC7263C7E888D68a9AD1E9f9D008B0D61FD";
        if (userValue === contractOwner) {
          setAccount(userAccount);

          localStorage.setItem("account", userAccount);
          localStorage.setItem("login", "true");
          navigate("/");
        } else {
          alert(`${userAccount} Address Not match with Owner Adress`);
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    setBalance(null);
    setNetwork(null);
    localStorage.removeItem("account");
    localStorage.removeItem("login");
    navigate("/walletconnect");
  };

  return (
    <ConnectWalletContex.Provider
      value={{
        account,
        metaMaskConnection,
        handleDisconnect,
        data,
      }}
    >
      {children}
    </ConnectWalletContex.Provider>
  );
};

export default ConnectWallet;
