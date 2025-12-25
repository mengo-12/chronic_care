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


// جميع نوبات الصرع
export const selectSeizures = (state) =>
  state.health.timeline.filter((e) => e.type === "seizure");

// ملخص نوبات الصرع (للطبيب والذكاء الاصطناعي)
export const selectSeizureStats = (state) => {
  const seizures = state.health.timeline.filter(
    (e) => e.type === "seizure"
  );

  if (seizures.length === 0) {
    return {
      count: 0,
      lastDate: null,
      avgSeverity: null,
      status: "مستقرة",
    };
  }

  const severities = seizures
    .map((s) => s.data?.severity)
    .filter((v) => typeof v === "number");

  const avgSeverity =
    severities.length > 0
      ? severities.reduce((a, b) => a + b, 0) / severities.length
      : null;

  return {
    count: seizures.length,
    lastDate: seizures[0].date, // لأننا نضيف الأحدث أولاً
    avgSeverity: avgSeverity ? avgSeverity.toFixed(1) : null,
    status:
      seizures.length >= 6
        ? "غير مستقرة"
        : seizures.length >= 3
        ? "تحت المراقبة"
        : "مستقرة",
  };
};

// تقييم صحي عام (مدخل AI مستقبلاً)
export const selectHealthStatus = (state) => {
  const stats = selectSeizureStats(state);

  return {
    riskLevel:
      stats.status === "غير مستقرة"
        ? "high"
        : stats.status === "تحت المراقبة"
        ? "medium"
        : "low",
    recommendation:
      stats.status === "غير مستقرة"
        ? "مراجعة الطبيب بشكل عاجل"
        : "الاستمرار في المتابعة",
  };
};
