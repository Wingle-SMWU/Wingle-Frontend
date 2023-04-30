export const convertDate = (data: string) => {
  const newDate = new Date(data).toLocaleTimeString().split(" ");
  const hour = newDate[0];
  const min = newDate[1].split(":").slice(0, 2).join(":");
  const answer = `${hour} ${min}`;
  return answer;
};
