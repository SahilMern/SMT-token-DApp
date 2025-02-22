import React, { useEffect, useState } from 'react'
import { contractAddress } from '../../helper/ContractAddres';
import { Abi } from '../../helper/Abi';
import { ethers } from 'ethers';
import DetailsBox from '../DetailsBox/DetailsBox';
import styles from "./Showdata.module.css"
const ShowData = () => {
  const [addressesData, setAddressesData] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const provider = new ethers.JsonRpcProvider(
        "https://bsc-testnet-dataseed.bnbchain.org"
      );
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
  }, []);

  //Short Address
  const shortAddress = (address) =>
    address ? `${address.slice(0, 15)}...${address.slice(-4)}` : "";
  return (
    <div className={styles.container}>
      <DetailsBox />
      <div>

<div className={styles.tableContent}>

      <h2>Contract Addresses & Balances</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Address</th>
            <th>Balance (BNB)</th>
          </tr>
        </thead>
        <tbody>
          {addressesData.length > 0 ? (
            addressesData.map((element) => (
              <tr key={element.index}>
                <td>{element.index}</td>
                <td>{shortAddress(element.address)}</td>
                <td>{element.balance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className={styles.loading}>
                Loading data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      </div>

    </div>
  );
}

export default ShowData