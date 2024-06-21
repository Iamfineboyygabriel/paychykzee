import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import TransactionServices from "../services/transaction.services";

interface TransactionState {
  getCurrencies: {
    transaction: any;
  };
  userProfile: any;
  error: string | null;
  updateProfile: null;
}

const initialState: TransactionState = {
  getCurrencies: { transaction: null },
  userProfile: null,
  error: null,
  updateProfile: null,
};

interface UpdateProfileParams {
  userID: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
  phoneNumber?: string;
}

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
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetUserProfile();
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// export const UpdateProfile = createAsyncThunk(
//   "transaction/updateProfile",
//   async (_, thunkAPI) => {
//     try {
//       const data = await TransactionServices.GetUserProfile();
//       return data;
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );
export const UpdateProfile = createAsyncThunk(
  "transaction/updateProfile",
  async (params: UpdateProfileParams, thunkAPI) => {
    try {
      const data = await TransactionServices.UpdateProfile(params);
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
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
    builder.addCase(
      UpdateProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.updateProfile = action.payload;
      },
    );
    builder.addCase(UpdateProfile.rejected, (state, action) => {
      state.updateProfile = null;
      const errorMessage =
        action.error.message || "Failed to fetch user profile.";
      setMessage(errorMessage);
    });
  },
});

const { reducer } = transactionSlice;
export default reducer;
