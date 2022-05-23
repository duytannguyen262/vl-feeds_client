import { useMutation } from "@apollo/client";
import { Button, Slider } from "@mui/material";
import { Modal } from "@nextui-org/react";
import gql from "graphql-tag";
import React from "react";

import "./styles.scss";

const GradingModal = ({ user, postId, setVisible, ...bindings }) => {
  const [value, setValue] = React.useState(5);
  const [pointPost] = useMutation(POINT_POST, {
    variables: {
      postId,
      point: value,
    },
  });
  const handleClose = () => setVisible(false);
  const handleClick = async () => {
    await pointPost();
    setVisible(false);
  };

  return (
    <Modal {...bindings}>
      <div className="grading-modal">
        <div className="grading-modal-header">
          <h1>Chấm điểm bài góp ý</h1>
        </div>
        <div className="grading-modal-content">
          <Slider
            value={value}
            sx={{ color: "#0072f5", marginBottom: "20px" }}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={10}
            onChange={(e, v) => setValue(v)}
          />
        </div>
        <div className="grading-modal-footer">
          <Button
            sx={{
              backgroundColor: "#0072f5",
              boxShadow: "0px 4px 14px #5ea2ef",
              marginRight: "10px",
            }}
            variant="contained"
            onClick={handleClick}
          >
            Gửi điểm
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Hủy
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const POINT_POST = gql`
  mutation pointPost($postId: ID!, $point: Float!) {
    pointPost(postId: $postId, point: $point) {
      id
      points {
        point
      }
    }
  }
`;
export default GradingModal;
