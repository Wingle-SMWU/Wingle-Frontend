import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  const text = "Loading";
  return (
    <S.SpinnerWrapper>
      <S.Spinner />
      {/* {text && <S.SpinnerText>{text}</S.SpinnerText>} */}
    </S.SpinnerWrapper>
  );
};

const spin = keyframes`
  to { transform: rotate(360deg); }
`;
const size = 100;

const S = {
  SpinnerWrapper: styled.div`
    @media (min-width: 501px) {
      width: 500px;
    }
    @media (max-width: 500px) {
      width: 100vw;
    }
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
  `,

  Spinner: styled.div`
    width: ${size}px;
    height: ${size}px;
    border: ${size / 12}px solid #fff3eb;
    border-top-color: #ff9856;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
    box-sizing: border-box;
  `,
};
export default Loading;
