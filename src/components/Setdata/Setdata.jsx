import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Style from "./Setdata.module.css";
import { contractAddress } from "../../helper/ContractAddres";
import { Abi } from "../../helper/Abi";
import { ethers } from "ethers";

const ChangeOwnerCard = () => {

  const shortAddress = (address) =>
    address ? `${address.slice(0, 10)}...${address.slice(-4)}` : "";
  const [accountAddress, setAccountAddress] = useState(""); // Track account address input
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null); // Track selected address index
  const [ownerAddress, setOwnerAddress] = useState(""); // Store the contract owner address
  const [connectedAddress, setConnectedAddress] = useState(""); // Store the connected wallet address
  const [addressesData, setAddressesData] = useState([]); // Store fetched addresses data
  const [isOwnerAction, setIsOwnerAction] = useState(true); // Toggle between owner and minter action
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if a transaction is in progress

  // Fetch contract owner and connected wallet address when the component mounts
  useEffect(() => {
    const fetchOwnerAndConnectedAddress = async () => {
      const provider = new ethers.JsonRpcProvider(
        "https://bsc-testnet-dataseed.bnbchain.org"
      );
      const contract = new ethers.Contract(contractAddress, Abi, provider);

      try {
        // Get the contract owner address
        const owner = await contract.owner();
        setOwnerAddress(owner);
        // Get the connected wallet address
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

  // Handle change of ownership or minter
  const handleChangeAddress = async () => {
    if (accountAddress) {
      if (connectedAddress !== ownerAddress) {
        toast.error("You must be the contract owner to perform this action!");
        return;
      }

      // Use the provider to get the signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Use the signer to interact with the contract
      const contract = new ethers.Contract(contractAddress, Abi, signer);

      try {
        setIsSubmitting(true); // Start the loader
        let tx;
        if (isOwnerAction) {
          // Change ownership
          tx = await contract.transferOwnership(accountAddress);
        } else {
          // Change minter
          tx = await contract.setMinter(accountAddress);
        }

        // Wait for the transaction to be mined
        await tx.wait();
        toast.success(
          `${isOwnerAction ? "Owner" : "Minter"} changed successfully!`
        );
        setIsModalOpen(false); // Close the modal after success
        setIsSubmitting(false); // Stop the loader
        refreshAddressesData(); // Refresh the data after success
      } catch (error) {
        toast.error("Failed to change address!");
        console.error(error);
        setIsSubmitting(false); // Stop the loader in case of error
      }
    } else {
      toast.error("Please enter a valid account address!");
    }
  };

  // Function to open the modal and set the address action
  const openModal = (addressIndex, address = "") => {
    setSelectedAddressIndex(addressIndex); // Store which address was clicked
    setAccountAddress(""); // Reset the address input to empty when modal opens
    setIsModalOpen(true); // Open the modal
  };

  // Handle specific address updates (setAddress1 through setAddress5)
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
      setIsSubmitting(true); // Start the loader
      let tx;
      console.log("hey i aaa caal", selectedAddressIndex);
      // return true
      
      // Call the correct function depending on the address index
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

      // Wait for the transaction to be mined
      await tx.wait();
      toast.success(`Address ${selectedAddressIndex} changed successfully!`);
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
          <button onClick={() => openModal(0)}>Change Owner</button>
        </div>
        <div className={Style.card}>
          <span>Change Minter Address</span>
          <button onClick={() => openModal(0)}>Change Minter</button>
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
              <button onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table displaying address, ID, and amount */}
      <div className={Style.tableContainer}>
        <h3>Address Table</h3>
        <table className={Style.table}>
          <thead>
            <tr>
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
                  <td>{shortAddress(item.address)}</td>
                  <td>{item.index}</td>
                  <td>{item.balance}</td>
                  <td>
                    <button onClick={() => openModal(item.index, item.address)}>
                      Change Address {item.index}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={Style.loading}>
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

export default ChangeOwnerCard;
