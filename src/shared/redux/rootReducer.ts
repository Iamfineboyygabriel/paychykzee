import { combineReducers } from "@reduxjs/toolkit";
import landingReducer from "./slices/landing.slices";
import transactionReducer from "./slices/transaction.slices";

const rootReducer = combineReducers({
  landing: landingReducer,
  transaction: transactionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
