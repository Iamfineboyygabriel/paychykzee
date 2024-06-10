import { combineReducers } from "@reduxjs/toolkit";
import landingReducer from "./slices/landing.slices";

const rootReducer = combineReducers({
  landing: landingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
