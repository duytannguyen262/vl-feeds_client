import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { Loading } from "@nextui-org/react";

import "./singleUserMainContent.scss";
import PostCard from "../../../../components/PostCard";
import bannerImg from "../../../../assets/authBanner.jpg";
import userImg from "../../../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { Button, styled } from "@mui/material";
import { FETCH_USER_QUERY } from "../../../../util/graphql";
import { updateFollowings } from "../../../auth/authSlice";

const FollowButton = styled(Button)({
  backgroundColor: "#0072f5",
  boxShadow: "0 4px 14px 0 #5ea2ef",
  transition: "all 0.3s linear",

  borderRadius: "12px",
  border: "none",

  padding: "8px 16px",

  fontSize: "1rem",
  color: "white",
  fontWeight: "600",
});

const SingleUserMainContent = ({ user }) => {
  const { data, loading } = useQuery(FETCH_USER_POSTS, {
    variables: {
      userId: user.id,
    },
  });
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [isFollowed, setIsFollowed] = React.useState(null);

  React.useEffect(() => {
    if (
      user &&
      currentUser &&
      user.followers.find((follower) => follower.id === currentUser.id)
    ) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  }, [isFollowed, user, currentUser]);

  const [followUser] = useMutation(FOLLOW_USER, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USER_QUERY,
        variables: {
          userId: user.id,
        },
      });
      proxy.writeQuery({
        query: FETCH_USER_QUERY,
        data: {
          getUser: {
            ...data.getUser,
            followers: [...result.data.followUser.followers],
          },
        },
      });
    },
    onCompleted() {
      const action = isFollowed
        ? updateFollowings(
            currentUser.followings.filter(
              (following) => following.id !== user.id
            )
          )
        : updateFollowings([
            ...currentUser.followings,
            { __typename: "User", id: user.id },
          ]);
      dispatch(action);
    },
    variables: {
      userId: user.id,
    },
  });

  const handleFollowClick = () => {
    followUser();
  };

  return (
    <>
      {loading ? (
        <Loading className="d-flex align-center justify-content-center" />
      ) : (
        <div>
          <div className="singleUser-top">
            <div className="singleUser-top-banner">
              <img src={user.banner.url ? user.banner.url : bannerImg} alt="" />
            </div>
            <div className="singleUser-top-userInfo">
              <div className="singleUser-top-userInfo-avatar">
                <img src={user.avatar.url ? user.avatar.url : userImg} alt="" />
              </div>
              <div className="singleUser-top-userInfo-detail">
                <p className="singleUser-top-userInfo-detail_username">
                  {user.username}
                </p>
                <p className="singleUser-top-userInfo-detail_email">
                  {user.email}
                </p>
                <div className="singleUser-top-userInfo-detail_numbers">
                  <div className="singleUser-top-userInfo-detail_numbers-posted">
                    <span className="styled-number">
                      {data.getUserPosts.length}
                    </span>{" "}
                    bài góp ý đã đăng
                  </div>
                  <div className="singleUser-top-userInfo-detail_numbers-friends">
                    <span className="styled-number">
                      {user.followers.length}
                    </span>{" "}
                    lượt theo dõi
                  </div>
                </div>
              </div>
              {currentUser && currentUser.id !== user.id && (
                <FollowButton
                  variant="contained"
                  className={isFollowed ? " followed" : ""}
                  onClick={handleFollowClick}
                >
                  {isFollowed ? "✓ Đã theo dõi" : "Theo dõi"}
                </FollowButton>
              )}
            </div>
          </div>
          <div className="singleUser-posts">
            {data.getUserPosts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const FETCH_USER_POSTS = gql`
  query getUserPosts($userId: String!) {
    getUserPosts(userId: $userId) {
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

const FOLLOW_USER = gql`
  mutation followUser($userId: String!) {
    followUser(userId: $userId) {
      username
      followers {
        id
        username
        avatar {
          url
        }
      }
    }
  }
`;
export default SingleUserMainContent;
