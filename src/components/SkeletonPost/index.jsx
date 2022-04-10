import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonPost = () => {
  return (
    <div className="postCard">
      <div className="postCard-inner">
        <div className="postCard-content" style={{ width: "100%" }}>
          <div className="postCard-content_header">
            <Skeleton
              animation="wave"
              variant="circular"
              width={43}
              height={40}
              style={{ borderRadius: "10px" }}
            />
            <div
              className="postCard-content_header--userInfo"
              style={{ width: "100%" }}
            >
              <Skeleton
                animation="wave"
                height={10}
                width="20%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="10%" />
            </div>
          </div>
          <div className="postCard-content_body">
            <Skeleton
              animation="wave"
              height={20}
              width="100%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              width="100%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              width="100%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              width="60%"
              style={{ marginBottom: 6 }}
            />
          </div>
        </div>
        <Skeleton variant="rect" height={200} />
      </div>
    </div>
  );
};

export default SkeletonPost;
