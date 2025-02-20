import { createContext, useState } from "react";
export const ConnectWalletContex = createContext();
const ConnectWallet = ({ children }) => {
  const [account, setAccount] = useState(
    localStorage.getItem("account") || null
  );
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [addressesData, setAddressesData] = useState([]);

  const connectWalletss = async () => {
    console.log("ehehheeh");
    
  }




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
        connectWalletss
      }}
    >
      {children}
    </ConnectWalletContex>
  );
};

export default ConnectWallet;
