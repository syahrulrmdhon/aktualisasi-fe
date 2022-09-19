import { client } from "./index";

export async function getListReport(params, token) {
  return client(token)
    .get("headsub/abberation", { params })
    .then((res) => res)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
}

export async function getReport(id, token) {
  return client(token)
    .get(`headsub/abberation/${id}`)
    .then((res) => res)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
}

export async function updateReport(id, data, token) {
  return client(token)
    .put(`headsub/abberation/${id}`, { ...data })
    .then((res) => res)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
}
