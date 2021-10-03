import styles from "../styles/Home.module.css";
import { Autocomplete } from 'devextreme-react/autocomplete';
import Button from "devextreme-react/button"
import { useRouter } from "next/dist/client/router";

const elemAtrr = {
  class: styles.autoComplete
}

const buttonAttr = {
  class: styles.button
}



export default function Home() {

  const router = useRouter()

  const onClick = () => {
    router.push('/browse')
  }

  return <div className={styles.container}>

    <div className={styles.head}>

    </div>

    <div className={styles.body}>
      <div className={styles.title}>Vocabulary of the Tagalog Language</div>
      <div className={styles.subtitle}>Based on the Vocabulario de la lengua Tagala</div>

      <div className={styles.searchbox}>
        <Autocomplete
          inputAttr={elemAtrr}
          stylingMode="outlined"
          placeholder="Type first name..."
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
  </div>;
}
