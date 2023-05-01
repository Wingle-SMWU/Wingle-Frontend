import React, { useState, useCallback, useEffect } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { AgreementComponent } from "./agreementComponent";

export default function AgreeBox() {
  const [termsOfUse, checkTermsOfUse] = useState(false);
  const [termsOfPersonalInformation, checkTermsOfPersonalInformation] = useState(false);
  const [termsOfPromotion, checkTermsOfPromotion] = useState(false);

  const handleUseCheck = useCallback((check: boolean) => {
    checkTermsOfUse(check);
  }, []);

  const handlePersonalInformationCheck = useCallback((check: boolean) => {
    checkTermsOfPersonalInformation(check);
  }, []);

  const handlePromotionCheck = useCallback((check: boolean) => {
    checkTermsOfPromotion(check);
  }, []);

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  useEffect(() => {
    setSignUpFormData((prev) => ({
      ...prev,
      termsOfUse: termsOfUse,
      termsOfPersonalInformation: termsOfPersonalInformation,
      termsOfPromotion: termsOfPromotion,
    }));
  }, [setSignUpFormData, termsOfPersonalInformation, termsOfPromotion, termsOfUse]);

  return (
    <>
      <Text.Body1 color="gray700">이용약관 동의</Text.Body1>
      <S.Wrapper>
        <AgreementComponent
          agreementTitle="서비스 이용약관"
          isRequired={true}
          handleCheck={handleUseCheck}
          detail={""}
        />
        <Margin direction="column" size={18} />
        <AgreementComponent
          agreementTitle="개인정보 수집 및 이용동의"
          isRequired={true}
          handleCheck={handlePersonalInformationCheck}
          detail={""}
        />
        <Margin direction="column" size={18} />
        <AgreementComponent
          agreementTitle="이벤트, 프로모션알림 메일 수신"
          isRequired={false}
          handleCheck={handlePromotionCheck}
          detail={""}
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
};
