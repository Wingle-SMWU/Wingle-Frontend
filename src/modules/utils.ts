import { CountryListType, countryList } from "../constants/countryList";

export const getImageUrl = (currentTab: string) => {
  if (currentTab === "자유" || currentTab === "교류" || currentTab === "기본") {
    return "/community/list/wingle-default.svg";
  }
  if (currentTab === "공지") {
    return "/community/list/wingle-manager.svg";
  }
  return "";
};

export const countryImg = (country: string) => {
  // code로 쓰인 게 있어서 조건 추가
  const countryUnit = countryList.find((countryUnit: CountryListType) => {
    return country === countryUnit.enNation || country === countryUnit.code;
  });

  return `/mypage/flag/${countryUnit?.code.toLocaleLowerCase()}.svg`;
};
