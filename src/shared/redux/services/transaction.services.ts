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
  }).then((response: any) => {
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

    const token = response.data.data?.accessTokenEncrypt;
    if (token) {
      sessionStorage.setItem("userData", token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

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

    const token = response.data.data?.accessTokenEncrypt;
    if (token) {
      sessionStorage.setItem("userData", token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

const TransactionServices = {
  GetCurrencies,
  GetUserProfile,
  UpdateProfile,
};

export default TransactionServices;
