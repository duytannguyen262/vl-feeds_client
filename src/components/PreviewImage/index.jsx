import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = React.useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      if (file.bannerImg) {
        setPreview(file.bannerImg);
      }
      if (file.userImg) {
        setPreview(file.userImg);
      }
      if (file.url && file.url !== "") {
        setPreview(file.url);
      }

      if (file.type && file.type.match("image.*")) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview(reader.result);
        };
      }
    }
  }, [file]);

  return (
    <div>
      {preview ? (
        <img src={preview} alt="preview" />
      ) : (
        <Skeleton variant="circular" width={40} height={40} />
      )}
    </div>
  );
};
export default PreviewImage;
