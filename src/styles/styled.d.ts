import "styled-components";

declare module "styled-components" {
  export type DefaultShadowKey = "normal" | "popover";
  export type DefaultThemeColorKey =
    | "black"
    | "white"
    | "gray100"
    | "gray200"
    | "gray300"
    | "gray400"
    | "gray500"
    | "gray600"
    | "gray700"
    | "gray800"
    | "gray900"
    | "orange100"
    | "orange200"
    | "orange300"
    | "orange400"
    | "orange500"
    | "red400"
    | "red500";

  export interface DefaultTheme {
    color: {
      [key in DefaultThemeColorKey]: string;
    };
    boxShadow: {
      [key in DefaultShadowKey]: string;
    };
  }
}
