import React from "react";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>MySite</h2>

      <ul style={styles.navLinks}>
        <li><a style={styles.link} href="#">Home</a></li>
        <li><a style={styles.link} href="#">About</a></li>
        <li><a style={styles.link} href="#">Services</a></li>
        <li><a style={styles.link} href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#222",
    padding: "10px 40px",
  },
  logo: {
    color: "white",
    fontSize: "22px",
  },
  navLinks: {
    display: "flex",
    gap: "25px",
    listStyle: "none",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Navbar;
