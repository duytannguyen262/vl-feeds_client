import { useQuery } from "@apollo/client";
import { Skeleton } from "@mui/material";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLottie } from "lottie-react";

import thinkingAni from "../../../../assets/animations/thinking.json";
import PostCard from "../../../../components/PostCard";
import PostForm from "../PostForm";

import "./styles.scss";
import SkeletonPost from "../../../../components/SkeletonPost";
const FollowedPosts = () => {
  const user = useSelector((state) => state.auth.user);
  const { loading, data, refetch } = useQuery(FETCH_FOLLOWED_POSTS, {
    variables: {
      userId: user.id,
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: thinkingAni,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { View } = useLottie(defaultOptions);

  return (
    <div className="page-content">
      {user && <PostForm />}
      {data && data.getUser.followedPosts.length === 0 && (
        <div className="notFollowed-info">
          <p>Trống trơn hà, theo dõi một bài góp ý ngay thôi!</p>
          {View}
        </div>
      )}
      {loading ? (
        <div>
          <SkeletonPost />
          <SkeletonPost />
        </div>
      ) : (
        data &&
        data.getUser.followedPosts.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })
      )}
    </div>
  );
};

const FETCH_FOLLOWED_POSTS = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      followedPosts {
        id
        body
        createdAt
        author {
          id
          username
          avatar
        }
        commentCount
        votesCount
        devotesCount
        categories
        votes {
          username
          createdAt
        }
        devotes {
          username
          createdAt
        }
        answers {
          id
          createdAt
          body
          author {
            id
            username
          }
        }
      }
    }
  }
`;

export default FollowedPosts;
