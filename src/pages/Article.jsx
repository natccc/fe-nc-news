import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import Error from "./Error";
import { Link } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { getArticle, getComments } from "../lib/api";
import Loading from "../components/Loading";
import CommentCard from "../components/CommentCard";
import NewCommentCard from "../components/NewCommentCard";

const Article = ({}) => {
  const params = useParams();
  const [article, setArticle] = useState([]);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getArticle(params.article_id);
        setArticle(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getComments(params.article_id);
        setComments(data)
      } catch (err) {
        setError(err);
      }
    })();
  }, []);


  if (error) return <Error />;

  return loading ? (
    <Loading />
  ) : (
    <>
      <Link to={"/all"}>
        <div className="absolute ml-12 mt-11">
          <CircleArrowLeft className="size-10 rounded-full stroke-gray-400 hover:bg-gray-100" />
        </div>
      </Link>
      <div className="mx-10 pt-4 md:mx-32 md:space-y-3 lg:mx-64 xl:mx-96">
        <ArticleCard article={article} />
        <NewCommentCard article_id={article.article_id} setComments={setComments}/>
        <div className="flex flex-col rounded-lg border p-2 ">
          {comments.length ? (
            comments.map((comment) => {
              return <CommentCard comment={comment} setComments={setComments} key={comment.comment_id} />;
            })
          ) : (
            <p className="my-2 text-center">No comments yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Article;
