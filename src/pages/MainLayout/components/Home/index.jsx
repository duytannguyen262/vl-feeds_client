import { useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PostCard from "../../../../components/PostCard";
import SkeletonPost from "../../../../components/SkeletonPost";
import { FETCH_POSTS_QUERY } from "../../../../util/graphql";
import PostForm from "../PostForm";
import "./styles.scss";

const Home = () => {
  const { loading, data, fetchMore } = useQuery(FETCH_POSTS_QUERY, {
    variables: {
      limit: 15,
    },
  });
  const user = useSelector((state) => state.auth.user);
  const searchValues = useSelector((state) => state.filter.search);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      const filterPosts = (posts) => {
        if (searchValues === "") {
          return posts;
        }

        return posts.filter((post) => {
          return post.categories.some((category) => {
            return category
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d")
              .replace(/Đ/g, "D")
              .toLowerCase()
              .includes(
                searchValues
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/đ/g, "d")
                  .replace(/Đ/g, "D")
                  .toLowerCase(),
              );
          });
        });
      };
      setPosts(filterPosts(data.posts.edges.map((edge) => edge.node)));
    } else {
      setPosts([]);
    }
  }, [data, searchValues, loading]);

  const handleFetchMoreClick = () => {
    const { startCursor } = data.posts.pageInfo;
    fetchMore({
      variables: {
        limit: 15,
        after: startCursor,
      },
    });
  };

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
          {posts.length > 0 &&
            posts.map((post) => {
              return <PostCard post={post} key={post.id} />;
            })}
          {posts.length > 0 && data.posts.pageInfo.hasNextPage && (
            <div className="d-flex justify-content-center">
              <Button sx={{ padding: "10px 20px", color: "#666666be" }}>
                <span onClick={handleFetchMoreClick}>Tải thêm</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
