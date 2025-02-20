import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../../helper/ContractAddres";
import { Abi } from "../../helper/Abi";
import "./home.css";

const ConnectWallet = () => {
  const [account, setAccount] = useState(localStorage.getItem("account") || null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [addressesData, setAddressesData] = useState([]);

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

      setAccount(userAccount);
      setNetwork(Number(networkData.chainId));
      localStorage.setItem("account", userAccount);

      getBalance(userAccount);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const getBalance = async (walletAddress) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(walletAddress);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const logout = () => {
    setAccount(null);
    setBalance(null);
    setNetwork(null);
    localStorage.removeItem("account");
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          localStorage.setItem("account", accounts[0]);
          getBalance(accounts[0]);
        } else {
          logout();
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  useEffect(() => {
    const contractConnection = async () => {
      if (!account) return;

      const provider = new ethers.JsonRpcProvider("https://bsc-testnet-dataseed.bnbchain.org");
      const contract = new ethers.Contract(contractAddress, Abi, provider);

      try {
        const minters = await contract.minter();
        console.log(minters, "Minter");

        const address1 = await contract.address1();
        console.log(address1, "address1");
        const balanceOfAccount = await contract.balanceOf(address1);
        console.log(balanceOfAccount, "Balance");
      } catch (error) {
        console.error("Error fetching contract balance:", error);
      }
    };

    contractConnection();
  }, [account]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!account) return;

      const provider = new ethers.JsonRpcProvider("https://bsc-testnet-dataseed.bnbchain.org");
      const contract = new ethers.Contract(contractAddress, Abi, provider);

      try {
        let data = [];
        
        for (let i = 1; i <= 5; i++) {
          const addressKey = `address${i}`;
          if (contract[addressKey]) {
            const address = await contract[addressKey]();
            const balance = await contract.balanceOf(address);
            data.push({
              index: i,
              address,
              balance: ethers.formatEther(balance),
            });
          }
        }

        setAddressesData(data);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };

    fetchAddresses();
  }, [account]);

  return (
    <div className="container">
      <h2>Connect MetaMask</h2>
      {account ? (
        <div className="wallet-info">
          <p><strong>Wallet:</strong> {account}</p>
          <p><strong>Network:</strong> {network === 97 ? "BSC Testnet" : "Other"}</p>
          <p><strong>BNB Balance:</strong> {balance ? `${balance} BNB` : "Loading..."}</p>
          <button className="button logout-button" onClick={logout}>Logout</button>
        </div>
      ) : (
        <button className="button connect-button" onClick={connectWallet}>Connect Wallet</button>
      )}

      <table className="table-container">
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Balance (BNB)</th>
          </tr>
        </thead>
        <tbody>
          {addressesData.map((item) => (
            <tr key={item.index}>
              <td>{item.index}</td>
              <td>{item.address}</td>
              <td>{item.balance} BNB</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConnectWallet;
