import axios from "axios";
import authHeader from "./headers";
import { AxiosResponse } from "axios";

const API_URL_REGISTER_USER = process.env.REACT_APP_API_URL + "/auth/register";
const API_URL_VERIFY_USER = process.env.REACT_APP_API_URL + "/auth/verifyToken";
const API_URL_LOGIN_USER = process.env.REACT_APP_API_URL + "/auth/login";
const API_URL_PAYMENT_RATE = process.env.REACT_APP_API_URL + "/payment/rate";
const API_URL_PEER_TO_PEER = process.env.REACT_APP_API_URL + "/payment/p2p";
const API_URL_BILL = process.env.REACT_APP_API_URL + "/payment/bills";
const API_URL_UPDATE_PASSWORD =
  process.env.REACT_APP_API_URL + "/users/update-password";

export interface RegisterUserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
}

interface ResetPasswordResponse {
  message: string;
}

export interface LandingServices {
  RegisterUser: (body: RegisterUserRequestBody) => Promise<unknown>;
  VerifyUserAuth: (body: { email: string; token: string }) => Promise<unknown>;
  LoginUser: (body: { email: string; password: string }) => Promise<unknown>;
  Forgot_Password: (
    endpoint: string,
    body: { email: string },
  ) => Promise<unknown>;
  Reset_Password: (
    endpoint: string,
    data: any,
  ) => Promise<AxiosResponse<ResetPasswordResponse, any>>;
  Payment_Rate: (body: {
    baseCurrency: string;
    pairCurrency: string;
  }) => Promise<unknown>;
  PeerToPeer: (body: {
    baseCurrency: string;
    baseAmount: number;
    pairCurrency: string;
    pairAmount: number;
    exchangeFee: number;
    rate: number;
  }) => Promise<unknown>;
  Bill: (body: any) => Promise<unknown>;
  Reach_Out: (endpoint: string, body: { message: string }) => Promise<unknown>;
  Public_Contact: (
    endpoint: string,
    body: {
      message: string;
      firstName: string;
      phoneNumber: string;
      email: string;
    },
  ) => Promise<unknown>;
  Update_Password: (body: {
    oldPassword: string;
    newPassword: string;
  }) => Promise<unknown>;
  Resend_Otp: (endpoint: string, body: { email: string }) => Promise<unknown>;
}

const landingServices: LandingServices = {
  RegisterUser: async (body) => {
    if (!body) {
      throw new Error("RegisterUserRequestBody is required");
    }
    try {
      const response = await axios.post(API_URL_REGISTER_USER, body, {});
      return response?.data;
    } catch (error: unknown) {
      throw new Error(
        `Error registering user: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },

  VerifyUserAuth: async (body) => {
    try {
      const response = await axios.post(API_URL_VERIFY_USER, body, {
        headers: authHeader(),
      });
      return response?.data;
    } catch (error: any) {
      throw error.response?.data?.message || new Error("Verification failed");
    }
  },

  LoginUser: async (body) => {
    try {
      const response = await axios.post(API_URL_LOGIN_USER, body, {});
      const token = response.data.data.accessTokenEncrypt;
      if (token) {
        sessionStorage.setItem("userData", token);
        return response.data;
      } else {
        throw new Error("Token not found in response");
      }
    } catch (error) {
      throw new Error(
        `Error logging in: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },

  Forgot_Password: async (endpoint, body) => {
    try {
      const response = await axios.post(endpoint, body);
      return response.data;
    } catch (error) {
      throw new Error(
        `Error sending forgot password request: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },

  // Reset_Password: async (endpoint, body) => {
  //   try {
  //     const response = await axios.post(endpoint, body);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(
  //       `Error Reseting Password: ${error instanceof Error ? error.message : String(error)}`,
  //     );
  //   }
  // },
  Reset_Password: async (endpoint, body) => {
    try {
      const response = await axios.post(endpoint, body);
      return response.data;
    } catch (response: any) {
      return response?.response?.data;
    }
  },
  Payment_Rate: async (body) => {
    try {
      const response = await axios.post(API_URL_PAYMENT_RATE, body, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error: unknown) {
      throw new Error(
        `Error fetching rate: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
  PeerToPeer: async (body) => {
    try {
      const response = await axios.post(API_URL_PEER_TO_PEER, body, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error: unknown) {
      throw new Error(
        `Error peering: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },

  Bill: async (body) => {
    try {
      const response = await axios.post(API_URL_BILL, body, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error: unknown) {
      throw new Error(
        `Error Paying Bill: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
  Reach_Out: async (endpoint, body) => {
    try {
      const response = await axios.post(endpoint, body, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Error sending message: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
  Public_Contact: async (endpoint, body) => {
    try {
      const response = await axios.post(endpoint, body, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Error sending message: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
  Update_Password: async (body) => {
    try {
      const response = await axios.post(API_URL_UPDATE_PASSWORD, body, {
        headers: authHeader(),
      });
      return response.data;
    } catch (response: any) {
      return response?.response?.data;
    }
  },

  Resend_Otp: async (endpoint, body) => {
    try {
      const response = await axios.post(endpoint, body);
      return response.data;
    } catch (response: any) {
      return response?.response?.data;
    }
  },
};

export default landingServices;
