import React, { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import SelectBox from "devextreme-react/select-box";
import styles from "../../styles/Alphabet.module.css";
import List from "devextreme-react/list";

import { getAlphabets } from "../data/store";

function BrowseSlug({ data }) {
  console.log(data);

  const router = useRouter();

  const items = ["a", "b", "c"];

  const onClickBigLetter = () => {
    router.push("/browse");
  };

  const letter = data.letter.slug;
  return (
    <div className={styles.container}>
      <div className={styles.head}></div>

      <div className={styles.body}>
        <div onClick={() => onClickBigLetter()} className={styles.letterHeader}>
          {letter}
        </div>
        <div className={styles.searchBox}>
          <SelectBox searchEnabled={true} stylingMode="outlined" />
        </div>
      </div>
      <div className={styles.itemList}>
        <List items={items} />
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
  const data = {
    letter: params,
  };

  return { props: { data } };
}

export default BrowseSlug;
