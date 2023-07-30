export const convertTime = (data: string) => {
  const newDate = new Date(data).toTimeString().split(" ");
  const time = newDate[0].split(":").slice(0, 2).join(":");
  return time;
};