import { getStore } from "./store";
import axios from "axios";
import useSWR from "swr";

const baseURL = "https://vdlt.herokuapp.com";

const alphbetURL = baseURL + "/api/v1/indexes";

const entriesURL = baseURL + "/api/v1/entry/";
const entriesByLetter = baseURL + "/api/v1/entry_by_letter/";
const signInURL = baseURL + "/api/v1/login";
const translationURL = baseURL + "/api/v1/translations";
const translationByEntry = baseURL + "/api/v1/translations_by_entry/";
const loggedInURL = baseURL + "/api/v1/auto_login";

const signIn = async (un, pw) => {
  try {
    const data = await axios.post(signInURL, {
      username: un,
      password: pw,
    });

    if (data.data.token) {
      localStorage.setItem("token", data.data.token);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAlphabetStore = (token) => {
  return getStore(alphbetURL, token);
};

const useUser = (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const fetcher = (url) => axios.get(url, config).then((res) => res.data);

  const { data, error } = useSWR(loggedInURL, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const getAlphabets = async () => {
  try {
    const data = await axios.get(alphbetURL);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getEntriesByLetter = async (letter_id) => {
  try {
    const data = await axios.get(entriesByLetter + letter_id);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getEntries = async () => {
  try {
    const data = await axios.get(entriesURL);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const isLoggedIn = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const data = await axios.get(loggedInURL, config);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getEntryIdByWord = async (word) => {
  try {
    const data = await axios.get(entriesURL + word);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getTranslationsByEntry = async (entry_id) => {
  try {
    const data = await axios.get(translationByEntry + entry_id);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getEntriesStore = (token) => {
  return getStore(entriesURL, token);
};

const getTranslationStore = (token) => {
  return getStore(translationURL, token);
};

export {
  getAlphabetStore,
  getAlphabets,
  getEntriesStore,
  getTranslationStore,
  getEntriesByLetter,
  getEntries,
  getTranslationsByEntry,
  getEntryIdByWord,
  signIn,
  isLoggedIn,
  useUser,
};
