import axios from "axios";
import authHeader from "./headers";

interface UpdateProfileParams {
  userID: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
  phoneNumber?: string;
}

const GetCurrencies = async () => {
  const url = process.env.REACT_APP_API_URL + "/payment/currency";
  return await axios({
    url,
    headers: authHeader(),
    method: "get",
  }).then((response) => {
    return response.data;
  });
};

const GetUserProfile = async () => {
  const url = `${process.env.REACT_APP_API_URL}/users/user`;
  try {
    const response = await axios({
      url,
      headers: authHeader(),
      method: "get",
    });
    console.log("API response:", response);

    const token = response.data.data?.accessTokenEncrypt;
    if (token) {
      sessionStorage.setItem("userData", token);
      console.log("New token set in sessionStorage:", token);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// const UpdateProfile = async ({ userID }: any) => {
//   const url = `${process.env.REACT_APP_API_URL}/users/${userID}`;
//   try {
//     const response = await axios({
//       url,
//       headers: authHeader(),
//       method: "patch",
//     });
//     console.log("API response:", response);

//     const token = response.data.data?.accessTokenEncrypt;
//     const Id = response.data.data.id;
//     if (token) {
//       sessionStorage.setItem("userData", token);
//       console.log("New token set in sessionStorage:", token);
//     }

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     throw error;
//   }
// };

const UpdateProfile = async (params: UpdateProfileParams) => {
  const { userID, ...updateData } = params;
  const url = `${process.env.REACT_APP_API_URL}/users/${userID}`;

  try {
    const response = await axios({
      url,
      headers: authHeader(),
      method: "patch",
      data: updateData,
    });
    console.log("API response:", response);

    const token = response.data.data?.accessTokenEncrypt;
    if (token) {
      sessionStorage.setItem("userData", token);
      console.log("New token set in sessionStorage:", token);
    }

    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

const TransactionServices = {
  GetCurrencies,
  GetUserProfile,
  UpdateProfile,
};

export default TransactionServices;
