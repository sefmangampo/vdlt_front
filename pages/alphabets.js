import React, { useState, useEffect } from "react";
import DataGrid, { Column, Editing, Pager } from "devextreme-react/data-grid";

import DataSource from "devextreme/data/data_source";

import { getAlphabetStore } from "./data/store";

import styles from "../styles/Add.module.css";

export default function Add() {
  const [store, setStore] = useState();

  const ds = new DataSource({
    store: store,
    key: "id",
    paginate: true,
    pageSize: 5,
  });

  const initStore = async () => {
    const d = getAlphabetStore();

    setStore(d);
  };

  useEffect(() => {
    initStore();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.head}></div>

      <div className={styles.body}>
        <h4>Alphabets</h4>
        <DataGrid dataSource={ds}>
          <Pager pageSize={5} />
          <Column dataField="id" allowEditing={false} />
          <Column dataField="name" />
        </DataGrid>
      </div>
    </div>
  );
}
