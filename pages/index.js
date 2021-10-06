import styles from "../styles/Home.module.css";
import Lookup from "devextreme-react/lookup";
import DataSource from "devextreme/data/data_source";
import Button from "devextreme-react/button";
import { useRouter } from "next/dist/client/router";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { getEntries, getAlphabets } from "../data";
import Head from "next/head"

const elemAtrr = {
  class: styles.autoComplete,
};

const buttonAttr = {
  class: styles.button,
};

export default function Home() {
  const [wordEntries, setWordEntries] = useState(null);
  const [alphabets, setAlphabets] = useState(null);

  const router = useRouter();

  const ds = new DataSource({
    store: {
      type: "array",
      data: wordEntries,
    },
    key: "id",
    pageSize: 20,
    paginate: true,
  });

  const onClick = () => {
    router.push("/browse");
  };

  const initWords = async () => {
    const res = await getEntries();
    const al = await getAlphabets();

    if (al.data) {
      setAlphabets(al.data);
    }

    if (res.data) {
      setWordEntries(res.data);
    }
  };

  useEffect(() => {
    initWords();
  }, []);

  const onItemClick = ({ itemData }) => {
    const { alphabet_id, orig_word } = itemData;

    const b = alphabets.filter((a) => a.id === alphabet_id);
    const c = b[0].name.toLowerCase();
    const d = orig_word.toLowerCase();

    router.push(`/browse/${c}/${d}`);
  };

  const dropDownOptions = {
    fullScreen: false,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Project VDLT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Project attempts to retranslate words from the book Vocabulario de Lengua Tagala"></meta>
        <meta name="robots" content="index, follow" />
      </Head>
      <div className={styles.head}>
        <Header />
      </div>

      <div className={styles.body}>
        <h1 className={styles.title}>Vocabulary of the Tagalog Language</h1>
        <div className={styles.subtitle}>
          Based on the Vocabulario de la lengua Tagala
        </div>

        <div className={styles.searchbox}>
          <Lookup
            inputAttr={elemAtrr}
            stylingMode="outlined"
            placeholder="Search for a word..."
            dataSource={ds}
            width={300}
            searchMode="startswith"
            onItemClick={onItemClick}
            searchEnabled={true}
            showDataBeforeSearch={true}
            displayExpr="orig_word"
            showCancelButton={true}
          />
        </div>
        <div className={styles.browsebutton}>
          <Button
            text="Search By Index"
            elementAttr={buttonAttr}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}
