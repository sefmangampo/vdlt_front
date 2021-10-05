import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/Header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <input id="nav-toggle" className={styles.navToggle} type="checkbox" />
        <ul className={styles.links}>
          <li>
            <Link href="/">
              <a>HOME</a>
            </Link>
          </li>
          <li>
            <Link href="/browse">
              <a>INDEX</a>
            </Link>
          </li>
          <li>
            <Link href="/entry">
              <a>ENCODE</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>ABOUT</a>
            </Link>
          </li>
        </ul>
        <label htmlFor="nav-toggle" className={styles.burgerLines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </label>
      </nav>
    </div>
  );
}
