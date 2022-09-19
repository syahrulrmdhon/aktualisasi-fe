import { client } from "./index";

export async function getListReport(params, token) {
  return client(token)
    .get("reporter/abberation", { params })
    .then((res) => res)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
}

export async function postReport(data, token) {
  return client(token)
    .post(`reporter/abberation`, { ...data })
    .then((res) => res.data)
    .catch((err) => console.log(err.response));
}

export async function updateReport(id, data, token) {
  return client(token)
    .put(`reporter/abberation/${id}`, { ...data })
    .then((res) => res)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
}

export async function deleteReport(id, token) {
  return client(token)
    .delete(`reporter/abberation/${id}`)
    .then((res) => res)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
}

export async function getReport(id, token) {
  return client(token)
    .get(`reporter/abberation/${id}`)
    .then((res) => res)
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
}
