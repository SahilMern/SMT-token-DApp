import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
// import Navbar from "./components/Navbar/Navabr";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Home/SideBar/SideBar";
import "./App.css"; // CSS import
import Navbar from "./components/Navbar/Navabr";

const App = () => {
  return (
    <div className="app-container">
      <div className="sidebar">
      <Sidebar />
      </div>
      <div className="content">
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;

