import axios from "axios";
import authHeader from "./headers";
import { AxiosResponse } from "axios";

const API_URL_REGISTER_USER = process.env.REACT_APP_API_URL + "/auth/register";
const API_URL_VERIFY_USER = process.env.REACT_APP_API_URL + "/auth/verifyToken";
const API_URL_LOGIN_USER = process.env.REACT_APP_API_URL + "/auth/login";

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
}

const landingServices: LandingServices = {
  RegisterUser: async (body) => {
    if (!body) {
      throw new Error("RegisterUserRequestBody is required");
    }
    try {
      const response = await axios.post(API_URL_REGISTER_USER, body, {});
      return response.data;
    } catch (error: unknown) {
      throw new Error(
        `Error registering user: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
  VerifyUserAuth: async (body) => {
    try {
      await axios.post(API_URL_VERIFY_USER, body, {
        headers: authHeader(),
      });
    } catch (error: unknown) {
      throw new Error(
        `Error verifying user auth: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
  LoginUser: async (body) => {
    try {
      const response = await axios.post(API_URL_LOGIN_USER, body, {});
      const token = response.data.token;
      if (token) {
        sessionStorage.setItem("userData", token);
        return response.data;
      } else {
        throw new Error("Token not found in response");
      }
    } catch (error) {
      throw new Error(
        `Error loggin in: ${error instanceof Error ? error.message : String(error)}`,
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

  Reset_Password: async (endpoint, body) => {
    try {
      const response = await axios.post(endpoint, body);
      return response.data;
    } catch (error) {
      throw new Error(
        `Error Reseting Password: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
};

export default landingServices;
