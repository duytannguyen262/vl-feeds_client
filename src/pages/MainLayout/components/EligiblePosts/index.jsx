import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import PostCard from "../../../../components/PostCard";
import SkeletonPost from "../../../../components/SkeletonPost";
import { FETCH_POSTS_QUERY } from "../../../../util/graphql";
import PostForm from "../PostForm";
import catImage from "../../../../assets/cat2.webp";

const Home = () => {
  const { loading, data, refetch } = useQuery(FETCH_POSTS_QUERY, {
    variables: {
      limit: 10,
    },
  });
  const user = useSelector((state) => state.auth.user);
  const [eligiblePosts, setEligiblePosts] = React.useState([]);

  useEffect(() => {
    refetch();
    if (data && data.getPosts) {
      const posts = data.getPosts.filter(
        (post) => post.reputationsCount >= 1 && post.answers.length === 0
      );
      setEligiblePosts(posts);
    }

    return () => {
      setEligiblePosts([]);
    };
  }, [refetch, data]);

  return (
    <div className="page-content">
      {user && <PostForm />}
      {loading ? (
        <div>
          <SkeletonPost />
          <SkeletonPost />
        </div>
      ) : (
        <div>
          {data.getPosts &&
            eligiblePosts.map((post) => {
              return <PostCard post={post} key={post.id} />;
            })}
          {!loading && eligiblePosts.length === 0 && (
            <div className="notFollowed-info">
              <p>Có vẻ như chưa có bài góp ý nào đủ điều kiện cả</p>
              <div>
                <img src={catImage} alt="" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
