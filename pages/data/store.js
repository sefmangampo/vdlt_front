import axios from "axios";

import CustomStore from "devextreme/data/custom_store";

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

export const getAlphabets = async () => {
  try {
    const data = await axios.get("http://localhost:8000/api/v1/indexes");
    return data;
  } catch (error) {
    console.error(error);
  }
};

//http://localhost:8000/api/v1/indexes

export const getAlphabetStore = () => {
  const baseURL = "http://localhost:8000/api/v1/indexes";

  const store = new CustomStore({
    key: "id",
    load: () => {
      return fetch(baseURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .then((response) => {
          return response.json();
        })
        .catch(() => {
          throw "Network Error";
        });
    },
    byKey: async (id) => {
      return fetch(baseURL + `/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .catch(() => {
          throw "Network error";
        });
    },
    insert: async (data) => {
      return fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .then((res) => res.json())
        .catch(() => {
          throw "Network error";
        });
    },
    remove: async (data) => {
      return fetch(baseURL + `/${data}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .catch(() => {
          throw "Network error";
        });
    },
    update: async (id, values) => {
      return fetch(baseURL + `/${id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .catch(() => {
          throw "Network error";
        });
    },
  });

  return store;
};
