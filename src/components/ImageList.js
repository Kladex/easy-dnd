import React from "react";

// ImageList Component
const ImageList = ({ images, setImages }) => {
  const removeImage = (image) => () => {
    const temp = [...images];
    const newImages = temp.filter((item) => item.id !== image.id);
    // or use this line instead
    // temp.splice(temp.indexOf(image), 1);
    setImages(newImages);
  };

  const removeAllImage = () => {
    setImages([]);
  };

  // MAP each image by calling Image component
  const renderImage = (image, index) => {
    return (
      <>
        <div className="file-item">
          <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
        </div>
        <button className="remove-image" onClick={removeImage(image)}>
          x
        </button>
      </>
    );
  };

  // Return the list of files
  return (
    <>
      <section className="file-list">{images.map(renderImage)}</section>
      {images.length > 0 && (
        <button onClick={removeAllImage}>Remove All Image</button>
      )}
    </>
  );
};

export default ImageList;
