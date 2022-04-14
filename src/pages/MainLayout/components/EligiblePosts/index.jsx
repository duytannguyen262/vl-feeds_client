import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import PostCard from "../../../../components/PostCard";
import SkeletonPost from "../../../../components/SkeletonPost";
import { FETCH_POSTS_QUERY } from "../../../../util/graphql";
import PostForm from "../PostForm";

const Home = () => {
  const { loading, data, refetch } = useQuery(FETCH_POSTS_QUERY);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="page-content">
      {user && <PostForm />}
      {loading ? (
        <div>
          <SkeletonPost />
          <SkeletonPost />
        </div>
      ) : (
        data.getPosts &&
        data.getPosts.map((post) => {
          if (post.reputationsCount >= 1 && post.answers.length === 0) {
            return <PostCard post={post} key={post.id} />;
          }
          return null;
        })
      )}
    </div>
  );
};

export default Home;
