export const getImageUrl = (currentTab: string) => {
  if (currentTab === "자유") {
    return "/community/list/wingle-default.svg";
  }
  if (currentTab === "교류") {
    return "/community/list/list-profile-flag.png";
  }
  if (currentTab === "공지") {
    return "/community/list/wingle-manager.svg";
  }
  return "";
};
