import React from 'react';
import styled,{keyframes} from 'styled-components';

const Loading = () => {
    const text = "Loading"
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
const size = 200;

const S = {
    SpinnerWrapper : styled.div`
        width: ${size}px;
        height:${size}px;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    

    Spinner : styled.div`
    width: ${size}px;
    height: ${size}px;
    border:  ${size/12}px solid #fff3eb;
    border-top-color: #ff9856;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
    box-sizing: border-box; 
    `,
}
export default Loading;


