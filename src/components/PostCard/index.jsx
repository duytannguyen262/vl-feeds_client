import { useMutation, useQuery } from "@apollo/client";
import { Button, Chip, Tooltip } from "@mui/material";
import gql from "graphql-tag";
import moment from "moment";
import "moment/locale/vi";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { TabContent, TabPane } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Modal, useModal } from "@nextui-org/react";

import filledFollowIcon from "../../assets/icons/bookmark-filled.svg";
import arrowIcon from "../../assets/icons/angle-right-for-slide.svg";
import followIcon from "../../assets/icons/bookmark.svg";
import answerIcon from "../../assets/icons/green-shield-check.svg";
import commentIcon from "../../assets/icons/gray-paper-plane.svg";
import userImg from "../../assets/user.png";
import { chipColor } from "../../constants/chipColor";
import { roleColor, roleProp } from "../../constants/role";
import Answers from "./components/Answers";
import Comments from "./components/Comments";
import DeletePost from "./components/DeletePost";
import ResponseInput from "./components/ResponseInput";
import VoteButtons from "./components/VoteButtons";
import "./styles.scss";
import GradeBtn from "./components/GradeBtn";

const PostCard = (props) => {
  const {
    id,
    body,
    createdAt,
    author,
    categories,
    commentCount,
    answers,
    pictures,
    points,
  } = props.post;
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
  const [isReadMoreShown, setIsReadMoreShown] = useState(false);

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="slideBtn prevBtn" onClick={onClick}>
        <img src={arrowIcon} alt="" />
      </button>
    );
  };
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="slideBtn nextBtn" onClick={onClick}>
        <img src={arrowIcon} alt="" />
      </button>
    );
  };
  const slickSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const [clickedImage, setClickedImage] = useState(null);
  const { setVisible, bindings } = useModal();
  const handleOpenFullImg = (e) => {
    setClickedImage(e.target.src);
    setVisible(true);
  };

  const navigate = useNavigate();
  const handleUserClick = () => {
    if (!author) return;
    navigate(`/user/${author?.id}`);
  };

  return (
    <div className="postCard">
      <div className="postCard-inner">
        <div className="postCard-votes">
          <VoteButtons {...props} user={user} />
          {user && (
            <Tooltip title="Lưu" placement="right">
              <div className="postCard-follow" onClick={handleFollow}>
                <img
                  src={isFollowed() ? filledFollowIcon : followIcon}
                  alt=""
                  className="postCard-follow_icon"
                />
              </div>
            </Tooltip>
          )}
          {user &&
            (user.username === author?.username || user.role === "admin") && (
              <DeletePost postId={id} />
            )}
        </div>
        <div className="postCard-content">
          <div className="postCard-content_topRow">
            <div className="postCard-content_header" onClick={handleUserClick}>
              <img
                src={author?.avatar?.url ? author?.avatar?.url : userImg}
                alt=""
              />
              <div className="postCard-content_header--userInfo">
                <p className="authorName">{author?.username ?? "Ẩn Danh"}</p>
                {author && (
                  <span
                    style={{ backgroundColor: roleColor(author.role) }}
                    className="authorRole"
                  >
                    {roleProp(author.role)}
                  </span>
                )}
                <p className="postDate">{moment(createdAt).fromNow()}</p>
              </div>
            </div>
            {user && <GradeBtn points={points} user={user} postId={id} />}
          </div>
          <div className="postCard-content_body">
            <p>
              {isReadMoreShown ? body : body.substr(0, 300)}
              {body.length > 300 && (
                <Button
                  color="primary"
                  className="readMoreBtn"
                  onClick={() => setIsReadMoreShown(!isReadMoreShown)}
                >
                  {isReadMoreShown ? "Thu gọn" : "Xem thêm ..."}
                </Button>
              )}
            </p>
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
            {pictures.length > 0 && (
              <div className="slides-container">
                <Slider {...slickSettings}>
                  {pictures.map((picture, index) => (
                    <div
                      key={index}
                      className="slide-item"
                      onClick={handleOpenFullImg}
                    >
                      <img src={picture.url} alt="" />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
            <Modal
              width="700px"
              css={{ margin: "2rem" }}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              {...bindings}
            >
              <img src={clickedImage} alt="" />
            </Modal>
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
            username={author?.username}
          />
        </TabPane>
        <TabPane tabId="2">
          <Answers
            postId={id}
            isAnswersOpen={isAnswersOpen}
            answers={answers}
            username={author?.username}
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
