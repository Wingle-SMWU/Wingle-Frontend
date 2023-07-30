import { theme } from "@/src/styles/theme";
import styled from "styled-components";
import React from "react";

export default function UnivLabel({ univ }: { univ: string }): JSX.Element {
  return (
    <S.Wrapper>
      <S.UnivName>{univ}</S.UnivName>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    display: inline-flex;
    padding: 2px 4px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    background: ${theme.color.orange100};
    margin-left: 4px;
  `,
  UnivName: styled.div`
    color: ${theme.color.orange400};
    text-align: center;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
  `,
};
