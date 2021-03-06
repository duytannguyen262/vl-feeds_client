import React, { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";

import goldMedalBtn from "../../../../assets/icons/medal 1.svg";
import silverMedalBtn from "../../../../assets/icons/silver-medal.svg";
import trophyBtn from "../../../../assets/icons/trophy.svg";
import grayGradeBtn from "../../../../assets/icons/medal 1 gray.svg";

import "./styles.scss";
import { useModal } from "@nextui-org/react";
import GradingModal from "./GradingModal";

const imgSrcDependsOnPoints = (averagePoints) => {
  if (averagePoints > 5 && averagePoints <= 7) {
    return silverMedalBtn;
  }
  if (averagePoints > 7 && averagePoints < 9) {
    return goldMedalBtn;
  }
  if (averagePoints >= 9 && averagePoints <= 10) {
    return trophyBtn;
  }
  return grayGradeBtn;
};
const GradeBtn = ({ points, user, postId }) => {
  const { setVisible, bindings } = useModal();
  const [averagePoint, setAveragePoint] = useState(0);
  const handleClick = () => {
    if (user && user.role === "teacher") {
      setVisible(true);
    }
  };

  React.useEffect(() => {
    const pointsArr = points.map((point) => point.point);
    const sum = pointsArr.reduce((a, b) => a + b, 0);
    if (pointsArr.length > 0) {
      setAveragePoint((sum / pointsArr.length).toFixed(1));
    }
  }, [points]);
  return (
    <>
      <Tooltip
        sx={{ backgroundColor: "red" }}
        TransitionComponent={Zoom}
        placement="bottom"
        title={`Đã có ${points.length} giảng viên chấm điểm`}
      >
        <Button
          sx={{
            width: "100px",
            height: "60px",
            padding: "5px 20px",
            borderRadius: "10px",
          }}
          onClick={handleClick}
        >
          {averagePoint > 0 ? (
            <>
              <img
                style={{ marginRight: "5px" }}
                src={imgSrcDependsOnPoints(averagePoint)}
                alt="grade-btn"
              />
              <span>{averagePoint}</span>
            </>
          ) : (
            <img src={grayGradeBtn} alt="grade-btn" />
          )}
        </Button>
      </Tooltip>
      <GradingModal
        user={user}
        postId={postId}
        setVisible={setVisible}
        {...bindings}
      />
    </>
  );
};

export default GradeBtn;
