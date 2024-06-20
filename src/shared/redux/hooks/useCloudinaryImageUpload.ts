import axios from "axios";

const useCloudinaryImageUpload = () => {
  const uploadImageToCloudinary = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dxprq4bv");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dazavhnjo/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data.secure_url;
    } catch (error) {
      console.log("Error uploading image to Cloudinary:", error);
    }
  };

  return [uploadImageToCloudinary];
};

export default useCloudinaryImageUpload;
