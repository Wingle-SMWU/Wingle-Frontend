import Image from "next/image";
import { useEffect, useState } from "react";
import { Margin, Text } from "../../ui";
import styled from "styled-components";

interface SdInputProps {
  Condition: boolean;
}

interface WrapperComponentProps {
  title: string;
  content: string;
  icon: boolean;
  must: string;
  handleCheck: (check: boolean) => void;
}

export function WrapperComponent({
  title,
  content,
  icon,
  must,
  handleCheck,
}: WrapperComponentProps) {
  const [isAgreed, setAgreed] = useState(false);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    handleCheck(isAgreed);
  }, [handleCheck, isAgreed]);

  return (
    <>
      <S.ContentWrapper>
        <Image
          alt="selectedCheck"
          width={20}
          height={20}
          src={isAgreed ? "/auth/selectedCheck.svg" : "/auth/unselectedCheck.svg"}
          onClick={() => {
            setAgreed((prev) => !prev);
          }}
        />
        <Margin direction="row" size={8} />
        <Text.Body2 color="gray900">{title}</Text.Body2>
        <Margin direction="row" size={3} />
        <Text.Body2 color={icon ? "orange500" : "gray500"}>{must}</Text.Body2>

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
