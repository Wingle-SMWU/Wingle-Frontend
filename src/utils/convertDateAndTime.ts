export const convertDateAndTime = (data: string) => {
  const date = new Date(data);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${month}월 ${day}일 ${time}`;
};
