import React, { useEffect, useState } from "react";

import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/Entry.module.css";
import Header from "../../components/Header";

import {
  getAlphabets,
  getEntries,
  getTranslationsByEntry,
  getEntryIdByWord,
} from "../../data";

export default function Entry({ data }) {
  const router = useRouter();
  const [translations, setTranslations] = useState([]);

  const letter = data.entry.orig_word;
  const entry = data.entry.entry;

  useEffect(() => {
    setTranslations(data.translation);
  }, []);

  const onClickBigLetter = () => {
    router.push("/browse");
  };

  const TranslationTemplate = ({ info }) => {
    console.log(info);
    return (
      <div className={styles.itemTemplate}>
        <div className={styles.itemExample}>{info.example_orig}</div>
        <div className={styles.itemOrig}>{info.orig}</div>
        <div className={styles.itemTranslated}>{info.translated}</div>
      </div>
    );
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
        <div className={styles.letterEntry}>{entry}</div>
      </div>
      <div className={styles.itemList}>
        {translations.map((translation) => {
          console.log(translation);
          return (
            <div key={translation.id}>
              <TranslationTemplate info={translation} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const letters = await getAlphabets();
  const entries = await getEntries();

  const paths = [];
  letters.data.map(async (item) => {
    if (entries.data) {
      entries.data.map((e) => {
        paths.push({
          params: {
            id: item.id,
            slug: item.name.toLowerCase(),
            entry: e.orig_word.toLowerCase(),
          },
        });
      });
    }
  });

  return { paths: paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const w = await getEntryIdByWord(params.entry.toLowerCase());
  const t = await getTranslationsByEntry(w.data.id);

  const data = {
    entry: w.data,
    translation: t.data,
  };

  return { props: { data } };
}
