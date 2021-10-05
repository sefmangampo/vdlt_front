import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/ByIndex.module.css";

import { getAlphabets } from "./data";
import Header from "./components/Header";

export default function Browseindexes() {
  const [alphabets, setAlphabets] = useState([]);

  const onClick = (e) => {
    const router = useRouter();
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
      <div className={styles.head}>
        <Header />
      </div>

      <div className={styles.body}>
        <div className={styles.byIndex}>By Index</div>

        <div className={styles.indexContainer}>
          {alphabets.map((item) => {
            let cn;

            if (item.status === 0) cn = styles.item1;
            else if (item.status === 1) cn = styles.item2;
            else cn = styles.item3;

            return (
              <div
                onClick={() => {
                  onClick(item.name);
                }}
                className={cn}
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
