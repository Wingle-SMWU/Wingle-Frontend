import React, { useState, useCallback, useEffect } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import { ST } from "next/dist/shared/lib/utils";
import Image from "next/image";

interface SdInputProps {
  Condition: boolean;
}

function WrapperComponent({ title, content, icon, must, handleCheck }: any) {
  const [isAgreed, setAgreed] = useState(false);
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    handleCheck(isAgreed);
  });
  return (
    <>
      <S.ContentWrapper>
        <Image
          alt="selectedCheck"
          width={20}
          height={20}
          src={isAgreed === true ? "/auth/selectedCheck.svg" : "/auth/unselectedCheck.svg"}
          onClick={() => {
            setAgreed((prev) => !prev);
          }}
        />
        <Margin direction="row" size={8} />
        <Text.Body2 color="gray900">{title}</Text.Body2>
        <Margin direction="row" size={3} />
        <Text.Body2 color={icon === true ? "orange500" : "gray500"}>{must}</Text.Body2>

        <S.Img Condition={icon}>
          <Image
            alt="selectedCheck"
            width={20}
            height={20}
            src="/auth/arrow_down.svg"
            onClick={() => {
              setActive((prev) => !prev);
            }}
          />
        </S.Img>
      </S.ContentWrapper>

      <S.Content Condition={isActive}>
        <Text.Body6 color="gray700">{content}</Text.Body6>
      </S.Content>
    </>
  );
}

export default function AgreeBox() {
  useEffect(() => {
    handleCheck();
  });
  const [first, checkFirst] = useState(false);
  const [second, checkSecond] = useState(false);
  const [third, checkThird] = useState(false);
  const [check, setCheck] = useState(false);
  const handleFirstCheckValue = (check: any) => {
    checkFirst(check);
  };
  const handleSecondCheckValue = (check: any) => {
    checkSecond(check);
  };

  const handleThirdCheckValue = (check: any) => {
    checkThird(check);
  };

  const handleCheck = () => {
    if (first === true && second === true) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  return (
    <>
      <Text.Body1 color="gray700">이용약관 동의</Text.Body1>
      <S.Wrapper>
        <WrapperComponent
          title="서비스 이용약관"
          icon={true}
          must={"(필수)"}
          handleCheck={handleFirstCheckValue}
        />
        <Margin direction="column" size={18} />
        <WrapperComponent
          title="개인정보 수집 및 이용동의"
          icon={true}
          must={"(필수)"}
          handleCheck={handleSecondCheckValue}
        />
        <Margin direction="column" size={18} />
        <WrapperComponent
          title="이벤트, 프로모션알림 메일 수신"
          icon={false}
          must={"(선택)"}
          handleCheck={handleThirdCheckValue}
        />
      </S.Wrapper>
    </>
  );
}

const S = {
  Wrapper: styled.div`
    margin-top: 8px;
    margin-bottom: 48px;
  `,
  ContentWrapper: styled.div`
    display: flex;
  `,
  Content: styled.div<SdInputProps>`
    display: ${(props) => (props.Condition ? `block` : `none`)};
    overflow: auto;
    margin-top: 8px;
    padding: 16px;
    background-color: #fff3eb;
    border: 1px solid #ffb07e;
    border-radius: 8px;
    height: 140px;
  `,
  Img: styled.div<SdInputProps>`
    margin-left: auto;
    display: ${(props) => (props.Condition ? `block` : `none`)};
  `,
};
