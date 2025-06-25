export const formatDate = (timestamp) => {
  if (!timestamp?.toDate) {
    return "Just now"; // Or return an empty string '', or "Just now"
  }
  const dateOption = { year: "numeric", month: "short", day: "numeric" };
  const timeOption = { hour: "numeric", minute: "numeric" };
  const timestampDate = timestamp.toDate();
  const todaysDate = new Date();
  if (
    timestampDate.toLocaleString("en-US", dateOption) ===
    todaysDate.toLocaleString("en-US", dateOption)
  ) {
    return timestampDate.toLocaleString("en-US", timeOption);
  } else {
    return timestampDate.toLocaleString("en-US", dateOption);
  }
};
