import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import DataGrid, {
    Column,
    Editing,
    Lookup,
    ColumnChooser,
    Pager,
    MasterDetail,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";
import styles from "../styles/Entry.module.css";
import Header from "./components/Header";

import {
    getEntriesStore,
    getAlphabets,
    getTranslationStore,
    isLoggedIn,
} from "./data";

const bookPartLU = {
    store: {
        type: "array",
        data: [
            {
                id: 1,
                name: "1",
            },
            {
                id: 2,
                name: "2",
            },
        ],
    },
};

export default function entry() {

    const router = useRouter()

    const [entries, setEntries] = useState([]);
    const [alphabets, setAlphabets] = useState([]);
    const [translations, setTranslations] = useState([]);

    const initEntries = async () => {


        const s = getEntriesStore();
        const a = await getAlphabets();
        const t = getTranslationStore();
        setEntries(s);
        setAlphabets(a.data);
        setTranslations(t);
    };

    const alphabetLU = {
        store: {
            type: "array",
            data: alphabets,
        },
        key: "id",
        pageSize: 10,
        paginate: true,
    };

    const authenticate = async () => {

        const t = localStorage.getItem('token')

        const res = await isLoggedIn(t);

        if (res) {
            initEntries(t)
        } else {
            router.push('/signin')
        }
    }

    useEffect(() => {

        authenticate();

    }, []);

    const ds = new DataSource({
        store: entries,
        key: "id",
        pageSize: 10,
        paginate: true,
    });

    const DetailTemplate = (e) => {
        const dataSource = new DataSource({
            store: translations,
            key: "id",
            pageSize: 10,
            paginate: true,
            filter: ["word_entry_id", "=", e.data.key],
        });

        const onInitNewRow = (row) => {
            row.data.word_entry_id = e.data.key;
        };

        return (
            <div>
                <DataGrid
                    onInitNewRow={onInitNewRow}
                    dataSource={dataSource}
                    wordWrapEnabled={true}
                >
                    <Column dataField="orig" caption="Orig Text" />
                    <Column dataField="translated" />
                    <Column dataField="example_orig" caption="Example" />
                    <Editing
                        mode="popup"
                        allowAdding={true}
                        allowUpdating={true}
                        allowDeleting={true}
                    />
                    <ColumnChooser enabled={true} />
                </DataGrid>
            </div>
        );
    };

    const onToolbarPreparing = ({ toolbarOptions }) => {
        const { items } = toolbarOptions;
        items.push({
            widget: 'dxButton',
            location: 'before',
            options: {
                text: 'Alphabets',
                onClick: () => {
                    router.push("/alphabets")
                }
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <Header />
            </div>

            <div className={styles.body}>
                <h6>Entries</h6>
                <DataGrid onToolbarPreparing={onToolbarPreparing} allowColumnResizing={true} dataSource={ds} key="id">
                    <Editing
                        mode="popup"
                        allowAdding={true}
                        allowUpdating={true}
                        allowDeleting={true}
                    />
                    <Pager visible={true} paginate={true} pageSize={10} />
                    <ColumnChooser enabled={true} />
                    <Column dataField="orig_word" caption="Original " />
                    <Column dataField="correct_word" caption="Corrected" />
                    <Column dataField="alphabet_id" caption="Alphabet">
                        <Lookup dataSource={alphabetLU} valueExpr="id" displayExpr="name" />
                    </Column>
                    <Column dataField="book_part" caption="Book Part" visible={false}>
                        <Lookup dataSource={bookPartLU} valueExpr="id" displayExpr="name" />
                    </Column>
                    <MasterDetail enabled={true} component={DetailTemplate} />
                </DataGrid>
            </div>
        </div>
    );
}
