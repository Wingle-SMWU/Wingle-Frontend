export const convertDateAndTime = (data: string) => {
  const newTime = new Date(data).toTimeString().split(" ");
  const time = newTime[0].split(":").slice(0, 2).join(":");
  const newDate = new Date(data).toLocaleString().split(".").slice(0, 3);
  return `${newDate[1]}월 ${newDate[2]}일 ${time}`;
};
