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

const TransactionServices = {
  GetCurrencies,
};

export default TransactionServices;
