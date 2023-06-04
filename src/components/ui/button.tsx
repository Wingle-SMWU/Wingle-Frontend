import React from "react";
import styled, { css } from "styled-components";
import { theme } from "@/src/styles/theme";

type ButtonProps = {
  children: React.ReactNode;
  size: "sm" | "md" | "lg";
  type?: "fill" | "line";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function Button({
  children,
  disabled,
  size,
  type,
  onClick,
}: ButtonProps) {
  const sizeStyle = S.Size[size];
  const typeStyle = type ? S.Type[type] : "";

  return (
    <S.Button
      disabled={disabled}
      sizeStyle={sizeStyle}
      typeStyle={typeStyle}
      onClick={onClick}
    >
      <p>{children}</p>
    </S.Button>
  );
}

const S = {
  Size: {
    sm: css`
      --btn-width: 37px;
      --btn-height: 33px;
      --btn-padding: 8px;
      --btn-font-size: 12px;
    `,
    md: css`
      --btn-width: 99px;
      --btn-height: 50px;
      --btn-padding: 14px 16px;
      --btn-font-size: 16px;
    `,
    lg: css`
      --btn-width: 312px;
      --btn-height: 52px;
      --btn-padding: 14px 16px;
      --btn-font-size: 16px;
    `,
  },

  Type: {
    fill: css`
      --btn-color: ${theme.color.white};
      --btn-bg-color: ${theme.color.orange500};
      --btn-border: none;
    `,
    line: css`
      --btn-color: ${theme.color.gray700};
      --btn-bg-color: ${theme.color.white};
      --btn-border: 1px solid ${theme.color.gray500};
    `,
  },

  Button: styled.button<any>`
    ${(props) => props.sizeStyle}
    ${(props) => props.typeStyle}

    cursor: pointer;
    border-radius: 8px;
    font-weight: 700;
    font-family: Pretendard;
    font-height: 140%;
    border: var(--btn-border);
    width: var(--btn-width);
    height: var(--btn-height);
    padding: var(--btn-padding);
    font-size: var(--btn-font-size);
    color: var(--btn-color);
    background: var(--btn-bg-color);

    > p {
      margin: -1px;
    }

    &:active,
    &:hover,
    &:focus {
      opacity: 80%;
    }

    &:disabled {
      cursor: default;
      opacity: 0.8;
      border: none;
      background: ${theme.color.gray200};
      color: ${theme.color.gray500};
    }
  `,
};
