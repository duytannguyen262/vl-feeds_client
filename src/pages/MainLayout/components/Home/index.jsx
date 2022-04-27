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
  // const { loading, data, fetchMore, updateQuery } = useQuery(
  //   FETCH_POSTS_PAGINATION,
  //   {
  //     variables: {
  //       first: 2,
  //     },
  //   }
  // );
  const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
    variables: {
      first: 2,
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
                  .toLowerCase()
              );
          });
        });
      };
      // setPosts(filterPosts(data.posts.edges.map((post) => post.node)));
      setPosts(filterPosts(data.getPosts));
    }
  }, [data, searchValues]);

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
          {posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}
          {/* {data.posts && data.posts.pageInfo.hasNextPage && (
            <Button>
              <span
                onClick={() => {
                  fetchMore({
                    variables: { after: data.posts.pageInfo.startCursor },
                  });
                  updateQuery((prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                      posts: {
                        ...fetchMoreResult.posts,
                        edges: [
                          ...prev.posts.edges,
                          ...fetchMoreResult.posts.edges,
                        ],
                      },
                    };
                  });
                }}
              >
                Tải thêm
              </span>
            </Button>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Home;
