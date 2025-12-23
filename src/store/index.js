import { configureStore } from "@reduxjs/toolkit";
import healthReducer from "../core/health/healthSlice";
import epilepsyReducer from "../modules/epilepsy/epilepsy.slice";

export const store = configureStore({
  reducer: {
    health: healthReducer,
    epilepsy: epilepsyReducer,
  },
});
