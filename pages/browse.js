import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/ByIndex.module.css";

import { getAlphabets } from "./data/store";

export default function browseindexes() {
  const router = useRouter();
  const [alphabets, setAlphabets] = useState([]);

  const onClick = (e) => {
    router.push(`browse/${e.toLowerCase()}`);
  };

  const initAlphabets = async () => {
    const d = await getAlphabets();
    setAlphabets(d.data);
  };

  useEffect(() => {
    initAlphabets();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.head}></div>

      <div className={styles.body}>
        <div className={styles.byIndex}>By Index</div>

        <div className={styles.indexContainer}>
          {alphabets.map((item) => {
            return (
              <div
                onClick={() => {
                  onClick(item.name);
                }}
                className={styles.item}
                key={item.id}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
