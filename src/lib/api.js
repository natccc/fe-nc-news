import axios from "axios";

const myApi = axios.create({
  baseURL: "https://be-news-api-h65m.onrender.com/api",
});

const getArticles = (topic, sortBy, orderBy) => {
  return myApi
    .get(
      `/articles?p=1&limit=5&topic=${topic}&sort_by=${sortBy}&order=${orderBy}`,
    )
    .then((res) => {
      return res.data.articles;
    });
};

const fetchArticles = (page, topic, sortBy, orderBy) => {
  return myApi
    .get(
      `/articles?p=${page}&limit=5&topic=${topic}&sort_by=${sortBy}&order=${orderBy}`,
    )
    .then((res) => {
      return res.data.articles;
    });
};
const getArticle = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

const getComments = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

const patchArticle = (article_id, vote) => {
  return myApi.patch(`/articles/${article_id}`, { inc_votes: `${vote}` });
};
const postComment = (article_id, reqBody) => {
  return myApi
    .post(`/articles/${article_id}/comments`, reqBody)
    .then((res) => res.data.comment);
};
const deleteComment = (comment_id) => {
  return myApi.delete(`/comments/${comment_id}`);
};

const patchComment = (comment_id, vote) => {
  return myApi.patch(`/comments/${comment_id}`, { inc_votes: `${vote}` });
};
const getTopics = () => {
  return myApi.get(`/topics`).then((res) => {
    return res.data.topics;
  });
};

const getUsers = ()=>{
  return myApi.get(`/users`).then((res)=>{
    return res.data.users
  })
}
const getUser = (username)=>{
  return myApi.get(`/users/${username}`).then((res)=>{
    return res.data.user
  })}

  const getArticlesByUser = (username)=>{
    return myApi.get(`/articles?author=${username}`).then((res)=>{
      return res.data.articles
    })
  }

  const postArticle= (reqBody)=>{
    return myApi.post(`/articles`, reqBody)
  }


export {
  getArticles,
  fetchArticles,
  getArticle,
  getComments,
  patchArticle,
  postComment,
  deleteComment,
  getTopics,
  getUsers,
  getUser,
  getArticlesByUser,
  patchComment
  ,postArticle
};
