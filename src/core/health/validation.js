export const validateSeizure = (data) => {
  if (!data.duration || data.duration <= 0) return false;
  if (data.severity < 1 || data.severity > 5) return false;
  return true;
};
