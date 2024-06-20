import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import TransactionServices from "../services/transaction.services";
import authHeader from "../services/headers";
import axios from "axios";

interface TransactionState {
  getCurrencies: {
    transaction: any;
  };
  userProfile: any;
  error: string | null;
}

const initialState: TransactionState = {
  getCurrencies: { transaction: null },
  userProfile: null,
  error: null,
};

export const GetCurrencies = createAsyncThunk(
  "transaction/getCurrencies",
  async () => {
    try {
      const data = await TransactionServices.GetCurrencies();
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      throw new Error(message);
    }
  },
);

export const GetUserProfile = createAsyncThunk(
  "transaction/getProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      console.log("url");
      const url = `${process.env.REACT_APP_API_URL}/users/${userId}`;
      const response = await axios.get(url, { headers: authHeader() });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(errorMessage);
    }
  },
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetCurrencies.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.getCurrencies = action.payload;
      },
    );
    builder.addCase(GetCurrencies.rejected, (state, action) => {
      state.getCurrencies = { transaction: null };
      const errorMessage =
        action.error.message || "Failed to fetch currencies.";
      setMessage(errorMessage);
    });
    builder.addCase(
      GetUserProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.userProfile = action.payload;
      },
    );
    builder.addCase(GetUserProfile.rejected, (state, action) => {
      state.userProfile = null;
      const errorMessage =
        action.error.message || "Failed to fetch user profile.";
      setMessage(errorMessage);
    });
  },
});

const { reducer } = transactionSlice;
export default reducer;
