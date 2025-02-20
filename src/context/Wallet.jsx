import { createContext, useEffect } from "react";


export const WalletContext = createContext(); // ✅ Exporting WalletContext
const Wallet = ({ children }) => {
  const username = "mayuresh";

  return (
    <WalletContext.Provider value={username}>
      {children}
    </WalletContext.Provider>
  );
};

export default Wallet;
