import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Style from "./Setdata.module.css";
import { contractAddress } from "../../helper/ContractAddres";
import { Abi } from "../../helper/Abi";
import { ethers } from "ethers";

const Setdata = () => {
  const shortAddress = (address) =>
    address ? `${address.slice(0, 10)}...${address.slice(-4)}` : "";

  const [accountAddress, setAccountAddress] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null); 
  const [ownerAddress, setOwnerAddress] = useState(""); 
  const [connectedAddress, setConnectedAddress] = useState(""); 
  const [addressesData, setAddressesData] = useState([]); 
  const [isOwnerAction, setIsOwnerAction] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameMappings = [
    "Community Development",
    "Developer Fund",
    "Sid Fund",
    "Development and Marketing",
    "Administration, Legal & Marketing",
  ];

  useEffect(() => {
    const fetchOwnerAndConnectedAddress = async () => {
      const provider = new ethers.JsonRpcProvider(
        "https://bsc-testnet-dataseed.bnbchain.org"
      );
      const contract = new ethers.Contract(contractAddress, Abi, provider);

      try {
        const owner = await contract.owner();
        setOwnerAddress(owner);
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const userAccount = await signer.getAddress();
          setConnectedAddress(userAccount);
        }
      } catch (error) {
        console.error("Error fetching contract owner:", error);
      }
    };

    fetchOwnerAndConnectedAddress();
  }, []);

  const openModal = (addressIndex, isOwner = true) => {
    setSelectedAddressIndex(addressIndex); 
    setAccountAddress(""); 
    setIsOwnerAction(isOwner); 
    setIsModalOpen(true); 
  };

  const handleSetAddress = async () => {
    if (!accountAddress) {
      toast.error("Please enter a valid account address!");
      return;
    }

    if (connectedAddress !== ownerAddress) {
      toast.error("You must be the contract owner to perform this action!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Abi, signer);

    try {
      setIsSubmitting(true); 
      let tx;

      if (isOwnerAction && selectedAddressIndex === 0) {
        tx = await contract.transferOwnership(accountAddress);
      } else if (isOwnerAction) {
        switch (selectedAddressIndex) {
          case 1:
            tx = await contract.setAddress1(accountAddress);
            break;
          case 2:
            tx = await contract.setAddress2(accountAddress);
            break;
          case 3:
            tx = await contract.setAddress3(accountAddress);
            break;
          case 4:
            tx = await contract.setAddress4(accountAddress);
            break;
          case 5:
            tx = await contract.setAddress5(accountAddress);
            break;
          default:
            toast.error("Invalid address index!");
            setIsSubmitting(false); // Stop the loader
            return;
        }
      } else {
        // Minter action: Change minter function
        tx = await contract.setMinter(accountAddress);
      }

      // Wait for the transaction to be mined
      await tx.wait();
      toast.success(
        `${
          isOwnerAction && selectedAddressIndex === 0
            ? "Ownership"
            : isOwnerAction
            ? "Address"
            : "Minter"
        } changed successfully!`
      );
      setIsModalOpen(false); // Close the modal after success
      setIsSubmitting(false); // Stop the loader
      refreshAddressesData(); // Refresh the data after success
    } catch (error) {
      toast.error("Failed to change address!");
      console.error(error);
      setIsSubmitting(false); // Stop the loader
    }
  };

  // Fetch contract addresses
  const refreshAddressesData = async () => {
    const provider = new ethers.JsonRpcProvider(
      "https://bsc-testnet-dataseed.bnbchain.org"
    );
    const contract = new ethers.Contract(contractAddress, Abi, provider);

    try {
      let data = [];
      // Assume there are address1, address2, etc. in the contract
      for (let i = 1; i <= 5; i++) {
        const addressKey = `address${i}`;
        if (contract[addressKey]) {
          const address = await contract[addressKey]();
          const balance = await contract.balanceOf(address);
          data.push({
            index: i,
            name: nameMappings[i - 1],  // Assign name based on index
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

  useEffect(() => {
    refreshAddressesData();
  }, []);

  return (
    <div className={Style.container}>
      <div className={Style.cardBoxs}>
        <div className={Style.card}>
          <span>Change Ownership</span>
          <button onClick={() => openModal(0, true)}>Change Owner</button>
        </div>
        <div className={Style.card}>
          <span>Change Minter Address</span>
          <button onClick={() => openModal(0, false)}>Change Minter</button>
        </div>
      </div>

      {/* Modal for entering new address */}
      {isModalOpen && (
        <div className={Style.modalOverlay}>
          <div className={Style.modalContent}>
            <h3>Enter New Account Address</h3>
            <input
              type="text"
              placeholder="Enter new account address"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)} // Update accountAddress on change
            />
            <div className={Style.modalActions}>
              <button onClick={handleSetAddress} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table displaying address, Name, Id, and amount */}
      <div className={Style.tableContainer}>
        <h3>Address Table</h3>
        <table className={Style.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Id</th>
              <th>Balance (BNB)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {addressesData.length > 0 ? (
              addressesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td> {/* Display Name here */}
                  <td>{shortAddress(item.address)}</td>
                  <td>{item.index}</td>
                  <td>{item.balance}</td>
                  <td>
                    <button onClick={() => openModal(item.index, true)}>
                      Change Address {item.index}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={Style.loading}>
                  Loading data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Setdata;
