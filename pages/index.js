import styles from "../styles/Home.module.css";

export default function Home() {
  return <div className={styles.container}>

    <div className={styles.head}>

    </div>

    <div className={styles.body}>
      <div className={styles.title}>Vocabulary of the Tagalog Language</div>
      <div className={styles.subtitle}>Based on the Vocabulario de la lengua Tagala</div>
      <input className={styles.searchbox} type="text" placeholder="Search"></input>
      <button className={styles.browsebutton}>Search by Index</button>
    </div>
  </div>;
}
