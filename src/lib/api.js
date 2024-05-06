import axios from "axios";

const myApi = axios.create({
  baseURL: "https://be-news-api-h65m.onrender.com/api",
});

const getArticles = (page) => {
  return myApi
    .get(`/articles?p=${page}`)
    .then((res) => {
      return res.data;
    })
};

export { getArticles };
