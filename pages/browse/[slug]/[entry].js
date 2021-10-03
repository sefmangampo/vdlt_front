import React from "react";

import styles from "../../../styles/Entry.module.css";

export default function Entry({ data }) {
  console.log(data);
  const letter = data.entry.slug;
  const entry = data.entry.entry;

  return (
    <div className={styles.container}>
      <div className={styles.head}></div>

      <div className={styles.body}>
        <div className={styles.letterHeader}>{letter}</div>
        <div className={styles.letterEntry}>{entry}</div>
      </div>
      <div className={styles.itemList}>hehe</div>
    </div>
  );
}

export async function getStaticPaths({ params }) {
  const values = [
    { params: { slug: "a", entry: "aa" } },
    { params: { slug: "a", entry: "ab" } },
    { params: { slug: "a", entry: "ac" } },
  ];

  return { paths: values, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = {
    entry: params,
  };

  return { props: { data } };
}
