import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h1 className={styles.logo}>DEOD</h1>
      <p className={styles.copyright}>© 2024 DEOD. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
