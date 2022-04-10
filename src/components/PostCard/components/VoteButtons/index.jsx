import React, { useEffect, useState } from "react";

import angleLeftIcon from "../../../../assets/icons/angle-left.svg";
import angleLeftIconClicked from "../../../../assets/icons/angle-left clicked.svg";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Tooltip } from "@mui/material";

const VoteButtons = ({
  post: { id, votesCount, devotesCount, votes, devotes },
  user,
}) => {
  const [voted, setVoted] = useState(false);
  const [devoted, setDevoted] = useState(false);
  const [reputationCount, setReputationCount] = useState(
    votes.length - devotes.length
  );

  useEffect(() => {
    if (user && votes.find((vote) => vote.username === user.username)) {
      setVoted(true);
    } else setVoted(false);
    if (user && devotes.find((devote) => devote.username === user.username)) {
      setDevoted(true);
    } else setDevoted(false);
  }, [user, votes, devotes]);

  const [votePost] = useMutation(VOTE_POST_MUTATION, {
    update(proxy, result) {},
    variables: {
      postId: id,
    },
  });

  const [devotePost] = useMutation(DEVOTE_POST_MUTATION, {
    variables: {
      postId: id,
    },
  });

  const handleVote = () => {
    if (user) {
      if (voted) {
        votePost();
        setVoted(false);
        setReputationCount(reputationCount - 1);
      } else {
        if (devoted) {
          devotePost();
          setDevoted(false);
        }
        votePost();
        setVoted(true);
        setReputationCount(reputationCount + 1);
      }
    }
  };

  const handleDevote = () => {
    if (user) {
      if (devoted) {
        devotePost();
        setDevoted(false);
        setReputationCount(reputationCount + 1);
      } else {
        if (voted) {
          votePost();
          setVoted(false);
        }
        devotePost();
        setDevoted(true);
        setReputationCount(reputationCount - 1);
      }
    }
  };

  return (
    <div className="postCard-votes">
      <Tooltip title="Ủng hộ" placement="right">
        <Button>
          <img
            src={voted ? angleLeftIconClicked : angleLeftIcon}
            alt=""
            className="upvote-icon"
            onClick={handleVote}
          />
        </Button>
      </Tooltip>
      <span className="postCard-votes_count">{reputationCount}</span>
      <Tooltip title="Không ủng hộ" placement="right">
        <Button>
          <img
            src={devoted ? angleLeftIconClicked : angleLeftIcon}
            alt=""
            className="downvote-icon"
            onClick={handleDevote}
          />
        </Button>
      </Tooltip>
    </div>
  );
};

const VOTE_POST_MUTATION = gql`
  mutation votePost($postId: ID!) {
    votePost(postId: $postId) {
      id
      votes {
        username
        createdAt
      }
      votesCount
    }
  }
`;

const DEVOTE_POST_MUTATION = gql`
  mutation devotePost($postId: ID!) {
    devotePost(postId: $postId) {
      id
      devotes {
        username
        createdAt
      }
      votesCount
    }
  }
`;
export default VoteButtons;
