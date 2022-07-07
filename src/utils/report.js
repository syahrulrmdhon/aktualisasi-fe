import { client } from "./index";

export async function getListReport(params) {
  return client()
    .get("abberation", { params })
    .then((res) => res.data)
    .catch((err) => console.log(err.response));
}

export async function postReport(data) {
  return client()
    .post(`abberation`, { ...data })
    .then((res) => res.data)
    .catch((err) => console.log(err.response));
}

export async function deleteReport(id) {
  return client()
    .delete(`abberation/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err.response));
}

export async function getReport(id) {
  return client()
    .get(`abberation/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err.response));
}
