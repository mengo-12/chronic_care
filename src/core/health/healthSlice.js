import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientProfile: {
    name: "",
    chronicConditions: [],
    emergencyContact: {},
  },
  timeline: [], // كل حدث يجب أن يحتوي على: { id, type, date, data }
};

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.patientProfile = action.payload;
    },

    addTimelineEvent(state, action) {
      // action.payload يجب أن يحتوي على type: 'seizure' | 'medication' | 'note'
      state.timeline.unshift(action.payload); // الأحدث أولاً
    },

    clearTimeline(state) {
      state.timeline = [];
    },
  },
});

// Selector إضافي لتسهيل الفلترة حسب النوع
// export const selectTimelineByType = (state, type) => {
//   if (!type) return state.health.timeline; // كل الأحداث إذا لم يحدد النوع
//   return state.health.timeline.filter((event) => event.type === type);
// };

export const selectTimelineByType = (type) => (state) => {
  if (!type) return state.health.timeline;
  return state.health.timeline.filter((event) => event.type === type);
};


export const {
  setProfile,
  addTimelineEvent,
  clearTimeline,
} = healthSlice.actions;

export default healthSlice.reducer;
