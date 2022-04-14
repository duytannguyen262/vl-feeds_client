import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = React.useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      if (typeof file === "string") {
        setPreview(file);
      } else if (file.type.match("image.*")) {
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
