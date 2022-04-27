import { useMutation, useQuery } from "@apollo/client";
import { Button, Chip, Tooltip } from "@mui/material";
import gql from "graphql-tag";
import moment from "moment";
import "moment/locale/vi";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TabContent, TabPane } from "reactstrap";

import filledFollowIcon from "../../assets/icons/bookmark-filled.svg";
import followIcon from "../../assets/icons/bookmark.svg";
import answerIcon from "../../assets/icons/comment-check.svg";
import commentIcon from "../../assets/icons/comment.svg";
import userImg from "../../assets/user.png";
import { chipColor } from "../../constants/chipColor";
import { roleColor, roleProp } from "../../constants/role";
import Answers from "./components/Answers";
import Comments from "./components/Comments";
import DeletePost from "./components/DeletePost";
import ResponseInput from "./components/ResponseInput";
import VoteButtons from "./components/VoteButtons";
import "./styles.scss";

const PostCard = (props) => {
  const { id, body, createdAt, author, categories, commentCount, answers } =
    props.post;

  const getUserFollowedPosts = useQuery(FETCH_FOLLOWED_POSTS);

  const user = useSelector((state) => state.auth.user);

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isAnswersOpen, setIsAnswersOpen] = useState(false);
  const openComments = () => {
    setTabId("1");
    setIsCommentsOpen(!isCommentsOpen);
  };
  const openAnswers = () => {
    setTabId("2");
    setIsAnswersOpen(!isAnswersOpen);
  };

  const [tabId, setTabId] = useState("");

  const isFollowed = () => {
    if (getUserFollowedPosts.data) {
      const followedPosts = getUserFollowedPosts.data.getUserFollowedPosts;
      const isFollowed = followedPosts.map((post) => post.id === id);
      if (isFollowed.includes(true)) {
        return true;
      } else {
        return false;
      }
    }
  };
  const [followPost] = useMutation(FOLLOW_POST_MUTATION, {
    update() {
      getUserFollowedPosts.refetch();
    },
    variables: {
      postId: id,
    },
  });
  const handleFollow = async () => {
    await followPost();
  };

  return (
    <div className="postCard">
      {user && (
        <Tooltip title="Theo dõi bài góp ý" placement="right">
          <div className="postCard-follow" onClick={handleFollow}>
            <img
              src={isFollowed() ? filledFollowIcon : followIcon}
              alt=""
              className="postCard-follow_icon"
            />
          </div>
        </Tooltip>
      )}
      <div className="postCard-inner">
        <div className="postCard-votes">
          <VoteButtons {...props} user={user} />
          {user && user.username === author.username && (
            <DeletePost postId={id} />
          )}
        </div>
        <div className="postCard-content">
          <div className="postCard-content_header">
            <img src={author.avatar ? author.avatar : userImg} alt="" />
            <div className="postCard-content_header--userInfo">
              <p className="authorName">{author.username}</p>
              <span
                style={{ backgroundColor: roleColor(author.role) }}
                className="authorRole"
              >
                {roleProp(author.role)}
              </span>
              <p className="postDate">{moment(createdAt).fromNow()}</p>
            </div>
          </div>
          <div className="postCard-content_body">
            <p>{body}</p>
            {categories &&
              categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  style={{
                    backgroundColor: chipColor(category),
                    color: "white",
                    fontWeight: "500",
                    marginRight: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                />
              ))}
            <div className="postCard-content_body--counts">
              <Button
                onClick={openComments}
                className="postCard-content_body--counts_item"
              >
                <img src={commentIcon} alt="" />
                <span>{commentCount} bình luận</span>
              </Button>
              <Button
                className={
                  answers.length >= 1
                    ? "postCard-content_body--counts_item answered"
                    : "postCard-content_body--counts_item"
                }
                onClick={openAnswers}
                disabled={answers.length >= 1 ? false : true}
              >
                <img src={answerIcon} alt="" />
                <span>
                  {answers.length >= 1 ? "Đã trả lời" : "Chưa trả lời"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <TabContent activeTab={tabId}>
        <TabPane tabId="1">
          <Comments
            postId={id}
            isCommentsOpen={isCommentsOpen}
            username={author.username}
          />
        </TabPane>
        <TabPane tabId="2">
          <Answers
            postId={id}
            isAnswersOpen={isAnswersOpen}
            answers={answers}
            username={author.username}
          />
        </TabPane>
      </TabContent>
      <ResponseInput postId={id} />
    </div>
  );
};

const FOLLOW_POST_MUTATION = gql`
  mutation followPost($postId: ID!) {
    followPost(postId: $postId) {
      id
    }
  }
`;

const FETCH_FOLLOWED_POSTS = gql`
  query {
    getUserFollowedPosts {
      id
    }
  }
`;
export default PostCard;
