import React, { useState } from "react";
import useCloudinaryImageUpload from "../../src/shared/redux/hooks/useCloudinaryImageUpload";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [secureUrl, setSecureUrl] = useState(null);
  const [uploadImageToCloudinary] = useCloudinaryImageUpload();

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleImageUpload = async () => {
    console.log("imageupload.jsx", file);
    if (file) {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setSecureUrl(uploadedUrl);
    }
  };

  return (
    <div>
      <input type="file" accept="*" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {secureUrl && <img src={secureUrl} alt="Uploaded" />}
    </div>
  );
}

export default ImageUpload;
