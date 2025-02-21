import { useEffect, useState } from "react";
import styles from "./Setdata.module.css";
import { contractAddress } from "../../helper/ContractAddres";
import { Abi } from "../../helper/Abi";
import { ethers } from "ethers";
import DetailsBox from "../DetailsBox/DetailsBox";

const Setdata = () => {
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

  return (
    <div className={styles.container}>
      <DetailsBox />
      <div>

      <h2>Contract Addresses & Balances</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Balance (BNB)</th>
          </tr>
        </thead>
        <tbody>
          {addressesData.length > 0 ? (
            addressesData.map((element) => (
              <tr key={element.index}>
                <td>{element.index}</td>
                <td>{element.address}</td>
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
  );
};

export default Setdata;
