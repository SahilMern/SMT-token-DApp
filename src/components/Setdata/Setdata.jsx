import React, { useEffect, useState } from 'react'
import { contractAddress } from '../../helper/ContractAddres';
import { Abi } from '../../helper/Abi';
import { ethers } from 'ethers';
import Style from "./Setdata.module.css"
import { FaCopy } from "react-icons/fa";

const Setdata = () => {
    const [contractOwner, setContractOwner] = useState("");
    const [minterAddress, setMinterAddress] = useState("");
    const [totalSupply, setTotalSupply] = useState("");

    useEffect(() => {
      const contractConnection = async () => {
        try {
          const providerForContract = new ethers.JsonRpcProvider(
            "https://bsc-testnet-dataseed.bnbchain.org"
          );
          const contract = new ethers.Contract(
            contractAddress,
            Abi,
            providerForContract
          );
  
          const owner = await contract.owner();
          const minter = await contract.minter();
          const supply = await contract.totalSupply();
  
          setContractOwner(owner);
          setMinterAddress(minter);
          setTotalSupply(ethers.formatEther(supply)); 
        } catch (error) {
          console.error("Error fetching contract details:", error);
        }
      };
  
      contractConnection();
    }, []);
  return (
    <div className={Style.container}>
      {/* set Admin change ownership and other box */}
         <div className={Style.detailsCard}>
              <div className={Style.card}>
                <span>Change owner Ship</span>
              </div>
      
              <div className={Style.card}>
                <span>Minter Address</span>
             
              </div>
      
              <div className={Style.card}>
                <span>Total Supply</span>
                <p>{totalSupply} Tokens</p>
              </div>
            </div>
    </div>
  )
}

export default Setdata