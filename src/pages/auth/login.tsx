import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import { Text, Margin } from "@/src/components/ui";
import { useMutation } from "react-query";
import { postLogin } from "@/src/api/auth/loginApi";
import { saveRefreshTokenToLocalStorage } from "@/src/utils/refreshTokenHandler";
import { saveAccessTokenToLocalStorage } from "@/src/utils/accessTokenHandler";
import TextInputUI from "@/src/components/ui/textInputUI";
import Button from "@/src/components/ui/button";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({
  locale = "en" || "ko",
}) => {
  return { props: { ...(await serverSideTranslations(locale, ["login"])) } };
};

interface StyledInputProps {
  error: boolean;
}

export default function Login(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { t } = useTranslation();

  const { mutate: login } = useMutation(() => postLogin(email, password), {
    onSuccess: (res) => {
      // 액세스토큰 리프레쉬 토큰 로컬스토리지 넣기, admin에 따라 라우팅
      const { refreshToken, accessToken, admin } = res.data;
      saveRefreshTokenToLocalStorage(refreshToken);
      saveAccessTokenToLocalStorage(accessToken);
      router.push(admin ? "/admin" : "/community");
      window.location.href = admin ? "/admin" : "/community";
    },
    onError: () => {
      setError(true);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    login();
  };

  const handleSignup = (): void => {
    router.push("/auth/signup");
  };

  const isButtonDisabled =
    email.length < 8 ||
    !email.includes("@") ||
    !email.includes(".") ||
    !password;

  return (
    <S.Container>
      <S.Header>
        <Image
          src="/auth/loginLogo.svg"
          alt="logo"
          priority
          width={200}
          height={120}
        />
        <Margin direction="column" size={8} />
        <Text.Body6 color="gray700">
          다함께 즐기는 대학생 국제교류 커뮤니티
        </Text.Body6>
      </S.Header>

      <form onSubmit={handleSubmit}>
        <S.AccountWrapper>
          <TextInputUI
            type="email"
            name="email"
            placeholder={t("login:email")}
            value={email}
            onChange={(e): void => {
              setEmail(e.target.value);
              setError(false);
            }}
            error={error}
          />
          <Margin direction="column" size={8} />

          <TextInputUI
            type="password"
            name="password"
            placeholder={t("login:password")}
            value={password}
            onChange={(e): void => {
              setPassword(e.target.value);
              setError(false);
            }}
            error={error}
            errorMessage={t("login:error")}
          />
        </S.AccountWrapper>

        <S.ButtonWrapper>
          {/* TODO: 버튼 width 모바일뷰로 수정 */}
          <Button
            disabled={isButtonDisabled}
            size="lg"
            type="fill"
            buttonType="submit"
          >
            {t("login:login")}
          </Button>

          <S.RegisterButton type="button" onClick={handleSignup}>
            {t("login:signup")}
          </S.RegisterButton>
        </S.ButtonWrapper>
      </form>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    padding: 0 24px;
  `,

  Header: styled.div`
    margin: 0 auto;
    padding: 48px;
    text-align: center;
  `,

  AccountWrapper: styled.div`
    padding-bottom: 40px;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  LoginButton: styled.button`
    width: 452px;
    height: 50px;
    background-color: ${({ disabled }): string =>
      disabled ? "#eee" : "#ff812e"};
    color: ${({ disabled }): string => (disabled ? "#959599" : "#fff")};
    border-radius: 8px;
    margin: 0 auto;
    font-weight: 700;
    font-size: 16px;
    line-height: 22.4px;
    cursor: ${({ disabled }): string => (disabled ? "not-allowed" : "pointer")};
  `,

  RegisterButton: styled.button`
    margin: 20px;
    border-bottom: 1px solid #49494d;
    color: #49494d;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
  `,
};
