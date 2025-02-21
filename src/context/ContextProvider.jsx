import ConnectWallet from "./ConnectWallet";
import Wallet from "./Wallet";

const ContextProvider = ({ children }) => {
  return (
    <Wallet>
      <ConnectWallet>{children}</ConnectWallet>
    </Wallet>
  );
};

export default ContextProvider;
