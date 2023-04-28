import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  color: {
    black: "#000000",
    white: "#FFFFFF",
    gray100: "#FCFCFE",
    gray200: "#EEEEF2",
    gray300: "#DCDCE0",
    gray400: "#C2C2C7",
    gray500: "#959599",
    gray600: "#6C6C70",
    gray700: "#49494D",
    gray800: "#303033",
    gray900: "#222223",
    orange100: "#FFF3EB",
    orange200: "#FFD7BD",
    orange300: "#FFB07E",
    orange400: "#FF9856",
    orange500: "#FF812E",
    red400: "#FF7070",
    red500: "#F03030",
  },
  boxShadow: {
    normal: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    popover: "0px 4px 8px rgba(0, 0, 0, 0.24);",
  },
};

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
