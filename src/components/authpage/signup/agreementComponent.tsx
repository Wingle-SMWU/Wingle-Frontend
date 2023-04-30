import Image from "next/image";
import { useEffect, useState } from "react";
import { Margin, Text } from "../../ui";
import styled from "styled-components";
import { AgreementComponentProps } from "@/src/types/auth/agreementComponentType";

export function AgreementComponent({
  agreementTitle,
  isRequired,
  handleCheck,
  detail,
}: AgreementComponentProps) {
  const [isAgreed, setAgreed] = useState(false);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    handleCheck(isAgreed);
  }, [handleCheck, isAgreed]);

  return (
    <>
      <S.AgreementWrapper>
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
        <Text.Body2
          color="gray900"
          pointer={true}
          onClick={() => {
            setAgreed((prev) => !prev);
          }}
        >
          {agreementTitle}
        </Text.Body2>
        <Margin direction="row" size={3} />
        {isRequired ? (
          <Text.Body2 color="orange500">(필수)</Text.Body2>
        ) : (
          <Text.Body2 color="gray500">(선택)</Text.Body2>
        )}

        <S.PrivacyPolicyIcon Condition={isRequired}>
          <Image
            alt="selectedCheck"
            width={20}
            height={20}
            src="/auth/arrow_down.svg"
            onClick={() => {
              setActive((prev) => !prev);
            }}
          />
        </S.PrivacyPolicyIcon>
      </S.AgreementWrapper>
      <S.PrivacyPolicyContent Condition={isActive}>
        <Text.Body6 color="gray700">{detail}</Text.Body6>
      </S.PrivacyPolicyContent>
    </>
  );
}
const S = {
  AgreementWrapper: styled.div`
    display: flex;
  `,
  PrivacyPolicyIcon: styled.div<{ Condition: boolean }>`
    margin-left: auto;
    display: ${(props) => (props.Condition ? `block` : `none`)};
  `,
  PrivacyPolicyContent: styled.div<{ Condition: boolean }>`
    display: ${(props) => (props.Condition ? `block` : `none`)};
    overflow: auto;
    margin-top: 8px;
    padding: 16px;
    background-color: #fff3eb;
    border: 1px solid #ffb07e;
    border-radius: 8px;
    height: 140px;
  `,
};