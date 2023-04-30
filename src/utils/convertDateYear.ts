export const convertDateYear = (data: string) => {
  const newDate = new Date(data).toLocaleString().split(".").slice(0, 3);
  return `${newDate[0]}년 ${newDate[1]}월 ${newDate[2]}일`;
};