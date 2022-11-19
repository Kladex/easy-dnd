import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import cuid from "cuid";

import ImageList from "./ImageList";

const Dropzone = () => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    // acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg"],
      // "text/html": [".html", ".htm"],
    },
    maxFiles: 2,
  });

  // If chosen files didn't meet condition will be rejected.
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.name} - {file.size} bytes
      <h4>
        {errors.map((e) => (
          <p key={e.code}>{e.message}</p>
        ))}
      </h4>
    </li>
  ));

  return (
    <>
      <div className="dropzone-div" {...getRootProps()}>
        <input className="dropzone-input" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">Release to drop the files here</p>
          ) : (
            <p className="dropzone-content">
              Drag and drop some files here, or click to select files
            </p>
          )}
        </div>
      </div>
      <div className="rejected-files">{fileRejectionItems}</div>
      <ImageList images={images} setImages={setImages} />
    </>
  );
};

export default Dropzone;
