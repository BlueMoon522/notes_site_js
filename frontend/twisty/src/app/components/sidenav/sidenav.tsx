"use client";
import Link from "next/link";
import styles from "./sidenav.module.css";

const Sidenav = () => {
  return (
    <div className={styles.sidenav}>
      <Link className={styles.logo} href="/dashboard">
        MyApp
      </Link>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/notes">Notes</Link>
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
