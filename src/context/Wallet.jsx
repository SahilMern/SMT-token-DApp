import { createContext } from "react";

export const WalletContext = createContext();

const Wallet = ({ children }) => {
  const username = "mayuresh";

  return (
    <WalletContext.Provider value={{ username }}>
      {children}
    </WalletContext.Provider>
  );
};

export default Wallet;
