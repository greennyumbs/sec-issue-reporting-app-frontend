export const formatTimestamp = (timestamp: string | undefined) => {
  return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
};
