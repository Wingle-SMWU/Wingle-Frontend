import { ReactNode } from "react";
import styled, {
  css,
  DefaultTheme,
  DefaultThemeColorKey,
  StyledComponentProps,
} from "styled-components";

export const Img = styled.img`
  display: block;
  -webkit-user-drag: none;
`;

type FlexBoxProperty = {
  justifyContents?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  gap?: number;
  column?: boolean;
  wrap?: boolean;
  width?: number | string;
  height?: number | string;
  minHeight?: string;
  maxHeight?: string;
  doNotShowScrollBar?: boolean;
};

export const FlexBox = styled.div<FlexBoxProperty>`
  width: ${({ width }) =>
    width ? (typeof width === "string" ? width : `${width}px`) : `100%`};
  height: ${({ height }) =>
    height ? (typeof height === "string" ? height : `${height}px`) : `auto`};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 0)};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "none")};
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  gap: ${({ gap }) => (gap ? gap : 0)}px;
  justify-content: ${({ justifyContents }) =>
    justifyContents ? justifyContents : "flex-start"};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "stretch")};
  flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "nowrap")};
  ${({ doNotShowScrollBar }) =>
    doNotShowScrollBar &&
    css`
      -ms-overflow-style: none;
      ::-webkit-scrollbar {
        display: none;
      }
    `}
`;

type StyleText = {
  box?: boolean;
  pointer?: boolean;
  color?: DefaultThemeColorKey;
};

export const Text = {
  Title1: styled.span<StyleText>`
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
  Title2: styled.span<StyleText>`
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
  Title3: styled.span<StyleText>`
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,

  Body1: styled.span<StyleText>`
    font-weight: 700;
    font-size: 16px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
  Body2: styled.span<StyleText>`
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
  Body3: styled.span<StyleText>`
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
  Body4: styled.span<StyleText>`
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
  Body5: styled.span<StyleText>`
    font-weight: 700;
    font-size: 14px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
  Body6: styled.span<StyleText>`
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
  Body7: styled.span<StyleText>`
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,

  Caption1: styled.span<StyleText>`
    font-weight: 700;
    font-size: 12px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
  Caption2: styled.span<StyleText>`
    font-weight: 500;
    font-size: 12px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
  Caption3: styled.span<StyleText>`
    font-weight: 400;
    font-size: 12px;
    line-height: 140%;
    /* common */
    display: ${({ box }) => (box ? "block" : "inline")};
    cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
    color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.white};
    height: fit-content;
  `,
};

type StyleMargin = {
  size: number;
  direction: "row" | "column";
};

export const Margin = styled.div<StyleMargin>`
  height: ${({ direction, size }) => (direction === "column" ? size : 0)}px;
  width: ${({ direction, size }) => (direction === "column" ? 0 : size)}px;
`;

type StyleButton = {
  thema: "black" | "white" | "red";
  bg?: string;
  text?: string | ReactNode;
  width?: string;
  padding?: string;
  cursor?: string;
};

const ButtonBox = styled.button<StyleButton>`
  min-width: ${(props) => (props.width ? `${props.width}` : `117px`)};
  height: 32px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ cursor }) => (cursor ? cursor : "pointer")};
  padding: ${({ padding }) => (padding ? padding : "7px 25px 7px 25px")};
  border: 1px solid
    ${({ thema }) =>
      thema === "black"
        ? "#000000"
        : thema === "white"
        ? "#ffffff"
        : "#434343"};

  background-color: ${({ thema, bg }) =>
    bg
      ? bg
      : thema === "black"
      ? "#000000"
      : thema === "white"
      ? "#ffffff"
      : "#434343"};
`;

// export const Button = (
//   props: StyledComponentProps<"button", DefaultTheme, StyleButton, never>
// ) => (
//   <ButtonBox {...props}>
//     <Text.Menu
//       color={props.thema === "white" ? "black" : "white"}
//       pointer={props.cursor ? false : true}
//       style={props.cursor ? { cursor: props.cursor } : {}}
//     >
//       {props.text}
//     </Text.Menu>
//   </ButtonBox>
// );

type StyleHover = {
  box?: boolean;
};

export const Hover = styled.span<StyleHover>`
  display: ${({ box }) => (box ? "block" : "inline")};
  cursor: pointer;
  :hover {
    opacity: 0.5;
    transition: 0.3s;
  }
`;
