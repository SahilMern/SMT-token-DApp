<h1 align="center">🔗 SMT Token DApp</h1>

<p align="center">
   SMT Token is a decentralized application (DApp) built on the Binance Smart Chain (BSC). This platform allows an admin to allocate tokens to users securely through smart contracts. It features MetaMask integration, role-based authentication via smart contract, and real-time token balance updates.
</p>

---

## 🖥️ Tech Stacks  

### **Frontend:**  
<p align="">
   <img src="https://shields.io/badge/React-27374D?logo=react&style=for-the-badge" >
   <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javascript" />
   <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="html5" />
   <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
   <img src="https://img.shields.io/badge/Tailwind_CSS-27374D?style=for-the-badge&logo=tailwind-css&" alt="tailwind" />
   <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="redux toolkit" />
   <img src="https://img.shields.io/badge/Context_API-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="context api" />
   <img src="https://img.shields.io/badge/Ethers.js-3C3C3D?style=for-the-badge&logo=ethereum" alt="ethers.js" />
   <img src="https://img.shields.io/badge/MetaMask-ED8B00?style=for-the-badge&logo=metamask&logoColor=white" alt="metamask" />
</p>

### **Blockchain & Smart Contracts:**  
<p align="">
   <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white" alt="solidity" />
   <img src="https://img.shields.io/badge/Smart_Contract-4CAF50?style=for-the-badge&logo=blockchain&logoColor=white" alt="smart contract" />
   <img src="https://img.shields.io/badge/Binance_Smart_Chain-F0B90B?style=for-the-badge&logo=binance&logoColor=white" alt="bsc" />
</p>

---

## 🚀 Functionality  

### 1️⃣ MetaMask Wallet Connection  
- Users can connect their **MetaMask wallet** to the DApp.  
- The DApp interacts with the **Binance Smart Chain (BSC)** using **Ethers.js**.  

### 2️⃣ Role-Based Authentication (Admin Access via Smart Contract)  
- When a user connects their MetaMask wallet, their **wallet address** is sent to the smart contract.  
- The smart contract checks if the user is an **admin**.  
- If **admin**, the user gets full access to token allocation features.  

### 3️⃣ Token Allocation System  
- The admin can **allocate SMT Tokens** to users via the smart contract.  
- Uses **setTokens() & getTokens()** functions from Solidity smart contract.  

### 4️⃣ Smart Contract Interaction using Ethers.js  
- The DApp interacts with a **Solidity Smart Contract** deployed on **BSC**.  
- Functions:  
  - **`setTokens(address user, uint256 amount)`** → Admin can allocate tokens.  
  - **`getTokens(address user)`** → Users can check their token balance.  

### 5️⃣ Real-Time Token Balance Update  
- Users can check their allocated token balance in real-time.  
- Data fetched directly from the **blockchain ledger** using **Ethers.js**.  

### 6️⃣ State Management with Redux Toolkit & Context API  
- **Redux Toolkit** for managing global state efficiently.  
- **Context API** for handling authentication & user session.  

### 7️⃣ Responsive & User-Friendly UI  
- **Tailwind CSS** for modern, responsive UI.  
- Mobile-friendly design for seamless usage across devices.  

---

## 📸 Screenshots  

![Screenshot 1](https://github.com/user-attachments/assets/sample1.png) | ![Screenshot 2](https://github.com/user-attachments/assets/sample2.png) |
| :---: | :---: |  

---

## 📜Ruff Smart Contract Example  

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SMTToken {
    address public admin;
    mapping(address => uint256) public balances;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setTokens(address user, uint256 amount) public onlyAdmin {
        balances[user] += amount;
    }

    function getTokens(address user) public view returns (uint256) {
        return balances[user];
    }

    function isAdmin(address user) public view returns (bool) {
        return user == admin;
    }
}
