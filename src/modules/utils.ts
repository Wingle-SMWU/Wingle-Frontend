export const getImageUrl = (currentTab: string) => {
  if (currentTab === "자유" || currentTab === "교류") {
    return "/community/list/wingle-default.svg";
  }
  if (currentTab === "공지") {
    return "/community/list/wingle-manager.svg";
  }
  return "";
};
