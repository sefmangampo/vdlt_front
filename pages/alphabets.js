import React, { useState, useEffect } from "react";
import DataGrid, {
  Column,
  Editing,
  Pager,
  Lookup,
} from "devextreme-react/data-grid";

import DataSource from "devextreme/data/data_source";

import { getAlphabetStore } from "../data";
import Header from "../components/Header";
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
    const t = localStorage.getItem("token");
    console.log(t);
    const d = getAlphabetStore(t);

    setStore(d);
  };

  useEffect(() => {
    initStore();
  }, []);

  const items = [
    {
      id: 0,
      text: "Pending",
    },
    {
      id: 1,
      text: "On Going",
    },
    {
      id: 2,
      text: "Completed",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Header />
      </div>

      <div className={styles.body}>
        <h4>Alphabets</h4>
        <DataGrid dataSource={ds}>
          <Editing allowUpdating={true} />
          <Pager pageSize={5} />
          <Column dataField="id" allowEditing={false} />
          <Column dataField="name" />
          <Column dataField="status" dataType="number">
            <Lookup dataSource={items} displayExpr="text" valueExpr="id" />
          </Column>
        </DataGrid>
      </div>
    </div>
  );
}
