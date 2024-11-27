"use client";
import Link from "next/link";
import styles from "./sidenav.module.css";

const Sidenav = () => {
  return (
    <div className={styles.sidenav}>
      <h3 className={styles.logo}>MyApp</h3>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/notes">notes</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>
            <Link href="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidenav;
