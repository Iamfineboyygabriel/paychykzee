import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import LandingServices from "../services/landing.services";
import type { RegisterUserRequestBody } from "../services/landing.services";

export const RegisterUser = createAsyncThunk(
  "landing/registerUser",
  async (body: RegisterUserRequestBody, thunkAPI) => {
    if (!body) {
      return thunkAPI.rejectWithValue("Body is required");
    }
    try {
      const data = await LandingServices.RegisterUser(body);
      return { landing: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.message) ||
        error.message ||
        error.data.message ||
        error.data ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const VerifyUserAuth = createAsyncThunk(
  "landing/verifyauth",
  async (body: { email: string; token: string }, thunkAPI) => {
    try {
      const data = await LandingServices.VerifyUserAuth(body);
      return { landing: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const LoginUser = createAsyncThunk(
  "landing/loginUser",
  async (body: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await LandingServices.LoginUser(body);
      return { landing: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const PaymentRate = createAsyncThunk(
  "landing/paymentRate",
  async (body: { baseCurrency: string; pairCurrency: string }, thunkAPI) => {
    try {
      const data = await LandingServices.Payment_Rate(body);
      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const PeerToPeer = createAsyncThunk(
  "landing/peer",
  async (
    body: {
      baseCurrency: string;
      baseAmount: number;
      pairCurrency: string;
      pairAmount: number;
      exchangeFee: number;
      rate: number;
    },
    thunkAPI,
  ) => {
    try {
      const data = await LandingServices.PeerToPeer(body);
      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const initialState = {
  getUserRegistered: null,
  verifyAuthData: null,
  getloginUser: null,
  paymentRate: null,
  pair: null,
};

export const userSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.getUserRegistered = action.payload.landing as null;
    });
    builder.addCase(RegisterUser.rejected, (state) => {
      state.getUserRegistered = null;
    });
    builder.addCase(VerifyUserAuth.fulfilled, (state, action) => {
      state.verifyAuthData = action.payload.landing as null;
    });
    builder.addCase(VerifyUserAuth.rejected, (state) => {
      state.verifyAuthData = null;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.getloginUser = action.payload.landing as null;
    });
    builder.addCase(LoginUser.rejected, (state) => {
      state.getloginUser = null;
    });
    builder.addCase(PaymentRate.fulfilled, (state, action) => {
      state.paymentRate = action.payload as null;
    });
    builder.addCase(PaymentRate.rejected, (state) => {
      state.paymentRate = null;
    });
    builder.addCase(PeerToPeer.fulfilled, (state, action) => {
      state.pair = action.payload as null;
    });
    builder.addCase(PeerToPeer.rejected, (state) => {
      state.pair = null;
    });
  },
});

const { reducer } = userSlice;
export default reducer;
