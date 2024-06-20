import axios from "axios";
import authHeader from "./headers";

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

const GetUserProfile = async (userId: any) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/users/${userId}`;
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw new Error(
      `Error fetching user profile: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

const TransactionServices = {
  GetCurrencies,
  GetUserProfile,
};

export default TransactionServices;
