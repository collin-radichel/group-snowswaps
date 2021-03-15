import React from "react";
import DropzoneS3Uploader from "react-dropzone-s3-uploader";
import { setState } from "react";

export default function ImageUpload({ state, setState, keyName }) {
  const handleFinishedUpload = (info) => {
    console.log("File uploaded with filename", info.filename);
    setState({ ...state, [keyName]: info.fileUrl });
    // setSwapInfo({ ...swapInfo, swap_img: info.filename });
  };

  const uploadOptions = {
    server: "http://localhost:5000",
  };

  const s3Url = "https://snowswaps.s3.amazonaws.com";

  return (
    <DropzoneS3Uploader
      onFinish={handleFinishedUpload}
      s3Url={s3Url}
      maxSize={1024 * 1024 * 5}
      upload={uploadOptions}
    />
  );
}
