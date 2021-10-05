import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import styles from "../styles/About.module.css";
import Button from "devextreme-react/button";

import { useRouter } from "next/dist/client/router";

import { isLoggedIn } from "./data";

export default function About() {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  const onClick = async () => {
    if (isLogged) {
      localStorage.removeItem("token");
      setIsLogged(false);
    } else {
      router.push("/signin");
    }
  };

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    const res = await isLoggedIn(token);
    if (res) {
      setIsLogged(true);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Header />
      </div>
      <div className={styles.body}>
        <div className={styles.foreword}>
          <p>
            This project is an attempt to translate words from the book
            &lsquo;Vocabulario de Legua Tagala&lsquo;.
          </p>
          <p>
            I have limited spanish so I rely on Google Translate 70% of the
            time.
          </p>
          <p>
            This is a personal hobby and one my attempts to dig deeper into the
            shrouds of ny history.
          </p>
          <p>
            Updates are continuous but on long intervals since I am quite busy.
          </p>
          <p>Btw, I am Sef Mangampo</p>

          <div className={styles.signInButton}>
            <Button
              text={isLogged ? "Sign Out" : "Sign In"}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
