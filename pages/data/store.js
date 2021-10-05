import CustomStore from "devextreme/data/custom_store";

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

export const getStore = (baseURL, token) => {
  const config = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

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
        .catch((e) => {
          console.log(e);
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
        headers: config,
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
        headers: config,
      })
        .then(handleErrors)
        .catch(() => {
          throw "Network error";
        });
    },
    update: async (id, values) => {
      return fetch(baseURL + `/${id}`, {
        method: "PATCH",
        headers: config,
        body: JSON.stringify(values),
      })
        .then(handleErrors)
        .catch(() => {
          throw "Network error";
        });
    },
  });

  return store;
};
