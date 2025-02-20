import { useContext } from "react";
import styles from "./Content.module.css";
import { WalletContext } from "../../../context/Wallet";
import DetailsBox from "../../DetailsBox/DetailsBox";

const Content = () => {
  const username = useContext(WalletContext); // ✅ Now it works!
  console.log(username, "username");

  return (
    <div className={styles.content}>
  
  <div className="detailsBox">
   <DetailsBox />
  </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>28</td>
            </tr>
            <tr className={styles.alternateRow}>
              <td>2</td>
              <td>Jane Smith</td>
              <td>34</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Mike Johnson</td>
              <td>45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Content;
