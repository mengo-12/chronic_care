export const selectPatientProfile = (state) => state.health.patientProfile;
export const selectTimeline = (state) => state.health.timeline;
export const selectSeizures = (state) =>
  state.health.timeline.filter(e => e.type === "seizure");
