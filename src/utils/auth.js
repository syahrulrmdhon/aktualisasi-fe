import { client } from "./index";

export const postLogin = (token, data) => {
  return client(token)
    .post(`auth/signin`, { ...data })
    .then((res) => res.data)
    .catch((err) => console.log(err.response));
};
