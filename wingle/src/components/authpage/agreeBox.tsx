import React, { useState, useCallback } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import { ST } from "next/dist/shared/lib/utils";

const Style = {
  Wrapper: styled.div`
    margin-top: 8px;
    margin-bottom: 48px;
  `,
  ContentWrapper: styled.div`
    display: flex;
  `,
  Content: styled.div<StyledInputProps>`
    display: ${(props) => (props.Condition ? `block` : `none`)};
    overflow: auto;
    margin-top: 8px;
    padding: 16px;
    background-color: #fff3eb;
    border: 1px solid #ffb07e;
    border-radius: 8px;
    height: 140px;
  `,
  Img: styled.div<StyledInputProps>`
    margin-left: auto;
    display: ${(props) => (props.Condition ? `block` : `none`)};
  `,
};

interface StyledInputProps {
  Condition: boolean;
}

function WrapperComponent({ title, content, icon, must }: any) {
  const [isAgreed, setAgreed] = useState(false);
  const [isActive, setActive] = useState(false);
  return (
    <>
      <Style.ContentWrapper>
        <img
          src={
            isAgreed === true
              ? "/auth/selectedCheck.svg"
              : "/auth/unselectedCheck.svg"
          }
          onClick={() => {
            setAgreed((prev) => !prev);
          }}
        />
        <Margin direction="row" size={8} />
        <Text.Body2 color="gray900">{title}</Text.Body2>
        <Margin direction="row" size={3} />
        <Text.Body2 color={icon === true ? "orange500" : "gray500"}>
          {must}
        </Text.Body2>

        <Style.Img Condition={icon}>
          <img
            src="/auth/arrow_down.svg"
            onClick={() => {
              setActive((prev) => !prev);
            }}
          />
        </Style.Img>
      </Style.ContentWrapper>

      <Style.Content Condition={isActive}>
        <Text.Body6 color="gray700">{content}</Text.Body6>
      </Style.Content>
    </>
  );
}

export default function AgreeBox() {
  return (
    <>
      <Text.Body1 color="gray700">이용약관 동의</Text.Body1>
      <Style.Wrapper>
        <WrapperComponent title="서비스 이용약관" icon={true} must={"(필수)"} />
        <Margin direction="column" size={18} />
        <WrapperComponent
          title="개인정보 수집 및 이용동의"
          icon={true}
          must={"(필수)"}
        />
        <Margin direction="column" size={18} />
        <WrapperComponent
          title="이벤트, 프로모션알림 메일 수신"
          icon={false}
          must={"(선택)"}
        />
      </Style.Wrapper>
    </>
  );
}
