// src/modules/epilepsy/epilepsy.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seizures: [], // جميع النوبات
};

const epilepsySlice = createSlice({
  name: "epilepsy",
  initialState,
  reducers: {
    addSeizure(state, action) {
      state.seizures.unshift(action.payload); // الأحدث أولاً
    },
    clearSeizures(state) {
      state.seizures = [];
    },
  },
});

export const { addSeizure, clearSeizures } = epilepsySlice.actions;
export default epilepsySlice.reducer;
