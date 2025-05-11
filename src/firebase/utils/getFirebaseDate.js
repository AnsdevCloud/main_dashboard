import dayjs from "dayjs";

const getFirebaseDate = (createdAt) => {
  console.log("createdAt: ", createdAt);
  const newDate = new Date(
    createdAt?._seconds * 1000 || createdAt?.seconds * 1000
  );

  // Format with dayjs
  const formatted = dayjs(newDate).format("DD MMM YYYY");
  return formatted;
};

function getSmartAgoString(createdAt) {
  if (!createdAt || !createdAt.seconds) return "Unknown time";

  const createdDate = new Date(createdAt.seconds * 1000);
  const now = dayjs();
  const created = dayjs(createdDate);

  const seconds = now.diff(created, "second");
  const minutes = now.diff(created, "minute");
  const hours = now.diff(created, "hour");
  const days = now.diff(created, "day");
  const months = now.diff(created, "month");
  const years = now.diff(created, "year");

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}

export { getFirebaseDate, getSmartAgoString };
