import ConnectWallet from "./ConnectWallet";

const ContextProvider = ({ children }) => {
  return <ConnectWallet>{children}</ConnectWallet>;
};

export default ContextProvider;
