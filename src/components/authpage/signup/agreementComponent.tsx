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
}: AgreementComponentProps): JSX.Element {
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
          src={
            isAgreed ? "/auth/selectedCheck.svg" : "/auth/unselectedCheck.svg"
          }
          onClick={(): void => {
            setAgreed((prev) => !prev);
          }}
        />
        <Margin direction="row" size={8} />
        <Text.Body2
          color="gray900"
          pointer={true}
          onClick={(): void => {
            setAgreed((prev) => !prev);
          }}
        >
          {agreementTitle}{" "}
          {isRequired ? (
            <Text.Body2 color="orange500">(필수)</Text.Body2>
          ) : (
            <Text.Body2 color="gray500">(선택)</Text.Body2>
          )}
        </Text.Body2>
        <Margin direction="row" size={3} />

        {isActive ? (
          <S.PrivacyPolicyIconOpen Condition={isRequired}>
            <Image
              alt="selectedCheck"
              width={20}
              height={20}
              src="/auth/arrow_up.svg"
              onClick={(): void => {
                setActive((prev) => !prev);
              }}
            />
          </S.PrivacyPolicyIconOpen>
        ) : (
          <S.PrivacyPolicyIconNotOpen Condition={isRequired}>
            <Image
              alt="selectedCheck"
              width={20}
              height={20}
              src="/auth/arrow_down.svg"
              onClick={(): void => {
                setActive((prev) => !prev);
              }}
            />
          </S.PrivacyPolicyIconNotOpen>
        )}
      </S.AgreementWrapper>
      {detail && (
        <S.PrivacyPolicyContent Condition={isActive}>
          {detail()}
        </S.PrivacyPolicyContent>
      )}
    </>
  );
}
const S = {
  AgreementWrapper: styled.div`
    display: flex;
  `,
  PrivacyPolicyIconOpen: styled.div<{ Condition: boolean }>`
    margin-left: auto;
    display: ${(props): string => (props.Condition ? `block` : `none`)};
    cursor: pointer;
  `,
  PrivacyPolicyIconNotOpen: styled.div<{ Condition: boolean }>`
    margin-left: auto;
    display: ${(props): string => (props.Condition ? `block` : `none`)};
    cursor: pointer;
  `,
  PrivacyPolicyContent: styled.div<{ Condition: boolean }>`
    display: ${(props): string => (props.Condition ? `block` : `none`)};
    overflow: auto;
    margin-top: 8px;
    padding: 16px;
    background-color: #fff3eb;
    border: 1px solid #ffb07e;
    border-radius: 8px;
    height: 140px;
  `,
};
