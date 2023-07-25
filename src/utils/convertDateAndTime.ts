export const convertDateAndTime = (data: string) => {
  const date = new Date(data);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleTimeString().slice(0, 5);

  return `${month}월 ${day}일 ${time}`;
};
