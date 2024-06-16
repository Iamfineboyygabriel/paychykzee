import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import TransactionServices from "../services/transaction.services";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

export const GetCurrencies = createAsyncThunk<
  {
    [x: string]: any;
    transaction: any;
  },
  void,
  AsyncThunkConfig
>("transaction/getCurrencies", async () => {
  try {
    const data = await TransactionServices.GetCurrencies();
    return data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
});

const initialState = {
  getCurrencies: {} as { transaction: any },
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCurrencies.fulfilled, (state, action) => {
      state.getCurrencies = action.payload;
    });
    builder.addCase(GetCurrencies.rejected, (state, action) => {
      state.getCurrencies = { transaction: null };
      const errorMessage =
        action.error.message || "Failed to fetch currencies.";
      setMessage(errorMessage);
    });
  },
});

const { reducer } = transactionSlice;
export default reducer;
