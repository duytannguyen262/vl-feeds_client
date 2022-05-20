import { useQuery } from "@apollo/client";
import { Loading } from "@nextui-org/react";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import bestFriendImg from "../../../../assets/best-friends.png";
import PostCard from "../../../../components/PostCard";
import PostForm from "../PostForm";
const FollowedUsers = () => {
  const user = useSelector((state) => state.auth.user);
  const { data, loading, refetch } = useQuery(FETCH_USER_POSTS, {
    variables: {
      userIds: user.followings.map((user) => user.id),
    },
  });

  const getUsersQuery = useQuery(FETCH_USERS, {
    variables: {
      userIds: user.followings.map((user) => user.id),
    },
  });

  useEffect(() => {
    refetch();
    console.log(getUsersQuery.data);
  }, [refetch, getUsersQuery]);

  return (
    <div className="page-content">
      {user && <PostForm />}
      <div>
        {user.followings.length === 0 && (
          <div className="notFollowed-info">
            <p>Bạn chưa theo dõi ai cả, triển liền nào! ( •̀ ω •́ )✧</p>
            <div>
              <img src={bestFriendImg} alt="" />
            </div>
          </div>
        )}
        {loading ? (
          <div
            style={{ height: "200px" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Loading />
          </div>
        ) : (
          data.getFollowedUsersPosts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })
        )}
      </div>
    </div>
  );
};

const FETCH_USER_POSTS = gql`
  query getFollowedUsersPosts($userIds: [String!]) {
    getFollowedUsersPosts(userIds: $userIds) {
      id
      body
      createdAt
      pictures {
        url
        public_id
      }
      author {
        id
        username
        avatar {
          url
        }
        role
      }
      commentCount
      votesCount
      devotesCount
      reputationsCount
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
          avatar {
            url
          }
        }
      }
    }
  }
`;

const FETCH_USERS = gql`
  query getUsers($userIds: [String!]) {
    getUsers(userIds: $userIds) {
      id
      avatar {
        url
      }
      username
    }
  }
`;
export default FollowedUsers;
