import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ProfileImageCropper = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%", // ya 'px'
    x: 0,
    y: 0,
    width: 300, // image ke hisaab se adjust karein
    height: 300, // height ko bhi adjust karein
    aspect: 1,
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const imageRef = useRef(null);

  // File select hone par image load karna
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Image load hone par ref set karna
  const onImageLoaded = (image) => {
    imageRef.current = image;
  };

  // Crop complete hone par cropped image generate karna
  const onCropComplete = (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      getCroppedImg(imageRef.current, crop, "cropped.jpg").then(
        (croppedUrl) => {
          setCroppedImageUrl(croppedUrl);
          console.log("croppedUrl: ", croppedUrl);
        }
      );
    }
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  // Canvas ka use karke cropped image banana
  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // toDataURL ka use karke image generate karna
    const base64Image = canvas.toDataURL("image/jpeg");
    return Promise.resolve(base64Image);
  };

  return (
    <div>
      <h2>Profile Image Upload & Crop</h2>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
      {croppedImageUrl && (
        <div>
          <h3>Cropped Image Preview</h3>
          <img
            alt="Cropped"
            src={croppedImageUrl}
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileImageCropper;
