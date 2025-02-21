import { Route, Routes } from "react-router-dom";
import "./App.css";

//? Components
// import Navbar from "./components/Navbar/Navbar"; // ✅ Fixed import
// import Footer from "./components/Footer/Footer";

//? Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import WalletConnect from "./pages/WalletConnect/WalletConnect";
import Setdata from "./components/Setdata/Setdata";
import ShowData from "./components/ShowData/ShowData";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
      <Route index  element={<ShowData />} />
        <Route path="about" element={<About />} />
        <Route path="setdata" element={<Setdata />} />
      </Route>
      <Route path="/walletconnect" element={<WalletConnect />} />
    </Routes>
  );
};

export default App;
