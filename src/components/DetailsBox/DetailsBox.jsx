import { useState } from "react";
import Style from "./DetailsBox.module.css";
import { FaCopy } from "react-icons/fa";

const DetailsBox = () => {
  const data = [
    { id: 1, address: "0x07167ac...B26Bc32ce4", role: "Admin" },
    { id: 2, address: "0x12345ac...C67Df42ab5", role: "User" },
    { id: 3, address: "0x98765bd...E12Ab98cd3", role: "Manager" }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  };

  return (
    <div className={Style.container}>
      {data.map((elem) => (
        <div key={elem.id} className={Style.detailsCard}>
          <p>{elem.address}</p>
          <p>{elem.role}</p>
          <FaCopy 
            className={Style.copyButton} 
            onClick={() => copyToClipboard(elem.address)}
          />
        </div>
      ))}
    </div>
  );
};

export default DetailsBox;
