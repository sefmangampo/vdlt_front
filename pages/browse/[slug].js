import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import SelectBox from "devextreme-react/select-box";
import styles from "../../styles/Alphabet.module.css";
import List from "devextreme-react/list";
import DataSource from "devextreme/data/data_source";

import { getAlphabets, getEntriesByLetter } from "../../data";
import Header from "../../components/Header";

function BrowseSlug({ data }) {
  const router = useRouter();

  const [items, setItems] = useState([]);

  const ds = new DataSource({
    store: {
      data: items,
      type: "array",
    },
    key: "id",
  });

  const onClickBigLetter = () => {
    router.push("/browse");
  };

  useEffect(() => {
    setItems(data.entries);
  }, []);

  const onItemClick = ({ itemData }) => {
    router.push(
      `/browse/${data.letter.toLowerCase()}/${itemData.orig_word.toLowerCase()}`
    );
  };

  const letter = data.letter;

  const inputAttr = {
    class: styles.inputAttr,
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Header />
      </div>

      <div className={styles.body}>
        <div onClick={() => onClickBigLetter()} className={styles.letterHeader}>
          {letter}
        </div>
        <div className={styles.searchBox}>
          <SelectBox
            inputAttr={inputAttr}
            dataSource={ds}
            displayExpr="orig_word"
            searchEnabled={true}
            width={200}
            height={40}
            showClearButton={true}
          />
        </div>
      </div>
      <div className={styles.itemList}>
        <List
          dataSource={ds}
          keyExpr="id"
          displayExpr="orig_word"
          onItemClick={onItemClick}
        />
      </div>
    </div>
  );
}

export async function getStaticPaths({ params }) {
  const letters = await getAlphabets();

  const paths = [];
  letters.data.map((item) => {
    paths.push({
      params: {
        id: item.id,
        slug: item.name.toLowerCase(),
      },
    });
  });

  return { paths: paths, fallback: false };
}

export async function getStaticProps({ params }) {
  let entries = [];

  const d = await getAlphabets();
  const arr = d.data;

  const x = arr.filter((a) => a.name == params.slug.toUpperCase());

  if (x[0]) {
    const l = await getEntriesByLetter(x[0].id);
    entries = l.data;
  }

  const data = {
    letter: params.slug.toUpperCase(),
    entries: entries,
  };

  return { props: { data } };
}

export default BrowseSlug;
