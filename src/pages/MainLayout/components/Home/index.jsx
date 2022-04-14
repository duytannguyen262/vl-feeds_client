import { useQuery } from "@apollo/client";
import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../../../../components/PostCard";
import SkeletonPost from "../../../../components/SkeletonPost";
import { FETCH_POSTS_QUERY } from "../../../../util/graphql";
import PostForm from "../PostForm";
import "./styles.scss";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const user = useSelector((state) => state.auth.user);

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
        data.getPosts.map((post) => <PostCard post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Home;
