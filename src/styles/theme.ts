import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  color: {
    black: "#000000",
    white: "#ffffff",
    gray100: "#fcfcfc",
    gray200: "#eeeef2",
    gray300: "#dcdce0",
    gray400: "#c2c2c7",
    gray500: "#959599",
    gray600: "#6c6c70",
    gray700: "#49494d",
    gray800: "#303033",
    gray900: "#222223",
    orange100: "#fff3eb",
    orange200: "#ffd7bd",
    orange300: "#ffb07e",
    orange400: "#ff9856",
    orange500: "#ff812e",
    red400: "#f03030",
    red500: "#c71b1b",
  },
  boxShadow: {
    normal: "0 3px 8px 0 rgb(0 0 0 / 10%)",
    purple: "0 3px 8px 0 #d6c9ff",
    blue: "0 3px 8px 0 #b3e2e6",
  },
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
