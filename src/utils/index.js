import axios from "axios";

// const BASE_URL = `${process.env.REACT_APP_API_DEV}/api`;
export const corsAnywhere = "https://syahrul-cors-anywhere.herokuapp.com/";
export const baseURL = () => {
  let BASE_URL;
  if (process.env.REACT_APP_API_KEY === "development") {
    BASE_URL = `${process.env.REACT_APP_API_DEV}`;
  } else if (process.env.REACT_APP_API_KEY === "production") {
    BASE_URL = `${process.env.REACT_APP_API_PROD}`;
  }
  return BASE_URL;
};

export const getToken = () => {
  let isToken = "";
  if (typeof window !== "undefined") {
    let token = localStorage.getItem("token");
    if (token) {
      isToken = token;
    } else {
      isToken = "";
    }
  } else {
  }
  return isToken;
};

export const client = (token) =>
  axios.create({
    baseURL: baseURL(),
    headers: {
      "Content-Type": "application/json",
      ...(token && { "x-access-token": `${token}` }),
    },
  });

export const convertDate = (date, type) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();
  const monthName = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (type) {
    return [day, monthName[d.getMonth()], year].join(" ");
  }
  return [day, month, year].join("-");
};

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const ImageExist = async (url) => {
  const img = new Image();
  img.src = `${url}`;
  return img.height !== 0;
};
