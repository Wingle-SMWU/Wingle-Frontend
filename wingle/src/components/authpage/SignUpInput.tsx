import React, { useCallback, useEffect, useState } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";

const Style = {
  ContentWrapper: styled.div`
    padding-bottom: 24px;
  `,
  Content: styled.div`
    display: flex;
  `,
  InputField: styled.div<StyledInputProps>`
  width: ${(props) => (props.small ? "345px" : "452px")};
  height: 50px;
  border:${(props) =>
    props.error ? "1px solid #FF7070" : "1px solid #dcdce0;"}; 
  border-radius: 8px;
margin-bottom:8px;

  & > input {
    width:300px;
    border: none;
    
    padding: 14px;
    border-radius: 8px;
    height: 22px;

    &::placeholder {
      font-weight: 400;
      font-size: 16px;
      line-height: 140%
      color: #959599;
    }
  }
`,
  Button: styled.button`
    font-size: 16px;
    font-weight: 700;
    color: #49494d;
    width: 99px;
  `,
  ButtonWrapper: styled.div<StyledInputProps>`
    display: ${(props) => (props.small ? "flex" : "none")};
    height: 50px;
    width: 99px;
    border: 1px solid #959599;
    border-radius: 8px;
    margin-left: 8px;
  `,
  ErrorWrapper: styled.div`
    display: flex;
  `,
};
interface StyledInputProps {
  small: boolean;
  error: boolean;
}

function ErrorMent({ error, errorMent, ment }: any) {
  return (
    <>
      {error === true ? (
        <>
          <Style.ErrorWrapper>
            <img src="/auth/error.svg" alt="error" />
            <Margin direction="row" size={8} />
            <Text.Caption3 color="red500">{errorMent}</Text.Caption3>
          </Style.ErrorWrapper>
        </>
      ) : (
        <Text.Caption3 color="gray900">{ment}</Text.Caption3>
      )}
    </>
  );
}

export default function InputBox({ getError }: any) {
  useEffect(() => {
    handleError();
    getError(error);
  });
  const [count, setCount] = useState(1);
  const [buttonMessage, setButtonMessage] = useState("인증 전송");
  const [emailMent, setEmailMent] = useState("");
  const [data, setData] = useState({
    Email: "",
    CertificationNumber: "",
    PW: "",
    Name: "",
    NickName: "",
  });
  const { Email, CertificationNumber, PW, Name, NickName } = data;
  const [error, setError] = useState(true);
  const [errorCertify, setErrorCertify] = useState(false);
  const [errorPW, setErrorPW] = useState(false);
  const [errorPWCheck, setErrorPWCheck] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorNickName, setErrorNickName] = useState(false);

  const handleData = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleError = () => {
    if (
      errorCertify === false &&
      errorPW === false &&
      errorPWCheck === false &&
      errorName === false &&
      errorNickName === false
    ) {
      setError(false);
    } else {
      setError(true);
    }
  };
  const handlePW = (e: any) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,15}$/;
    if (!passwordRegex.test(e.target.value)) {
      setErrorPW(true);
    } else {
      setErrorPW(false);
    }
  };

  const handleName = (e: any) => {
    const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (special_pattern.test(e.target.value)) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  };

  const handleNickName = (e: any) => {
    const pattern = /[`~!@#$%^&*|\\\'\";:\/?]/;
    const pattern2 = /[0-9]/;
    if (
      pattern.test(e.target.value) ||
      pattern2.test(e.target.value) ||
      e.target.value.length < 2 ||
      e.target.value.length > 10
    ) {
      setErrorNickName(true);
    } else {
      setErrorNickName(false);
    }
  };

  return (
    <>
      <Text.Body1 color="gray700">이메일</Text.Body1>
      <Margin direction="column" size={8} />
      <Style.ContentWrapper>
        <Style.Content>
          <Style.InputField small={true} error={false}>
            <input
              name="Email"
              value={Email}
              type="email"
              placeholder="abc@naver.com"
              onChange={handleData}
            />
          </Style.InputField>
          <Style.ButtonWrapper small={true} error={false}>
            <Style.Button
              onClick={() => {
                setButtonMessage("재전송");
                setCount(count + 1);
                setEmailMent("인증메일을 전송했습니다." + "(" + count + "회)");
              }}
            >
              {buttonMessage}
            </Style.Button>
          </Style.ButtonWrapper>
        </Style.Content>
        <ErrorMent error={false} errorMent="" ment={emailMent} />
      </Style.ContentWrapper>

      <Text.Body1 color="gray700">인증번호 입력</Text.Body1>
      <Margin direction="column" size={8} />
      <Style.ContentWrapper>
        <Style.Content>
          <Style.InputField small={true} error={errorCertify}>
            <input
              name="CertificationNumber"
              value={CertificationNumber}
              type="string"
              placeholder="인증번호"
              onChange={handleData}
            />
          </Style.InputField>
          <Style.ButtonWrapper small={true} error={errorCertify}>
            <Style.Button
              onClick={() => {
                data.CertificationNumber === "123"
                  ? setErrorCertify(false)
                  : setErrorCertify(true);
              }}
            >
              인증 확인
            </Style.Button>
          </Style.ButtonWrapper>
        </Style.Content>
        <ErrorMent
          error={errorCertify}
          errorMent="인증정보가 일치하지 않습니다."
          ment=" "
        />
      </Style.ContentWrapper>

      <Text.Body1 color="gray700">비밀번호</Text.Body1>
      <Margin direction="column" size={8} />
      <Style.ContentWrapper>
        <Style.Content>
          <Style.InputField small={false} error={errorPW}>
            <input
              name="PW"
              value={PW}
              type="string"
              placeholder="비밀번호"
              onChange={(e) => {
                handleData(e);
                handlePW(e);
              }}
            />
          </Style.InputField>
          <Style.ButtonWrapper
            small={false}
            error={false}
          ></Style.ButtonWrapper>
        </Style.Content>
        <ErrorMent
          error={errorPW}
          errorMent="영문자/숫자/특수기호 포함 최소 8자, 최대 15자 "
          ment="영문자/숫자/특수기호 포함 최소 8자, 최대 15자"
        />
      </Style.ContentWrapper>

      <Text.Body1 color="gray700">비밀번호 확인</Text.Body1>
      <Margin direction="column" size={8} />
      <Style.ContentWrapper>
        <Style.Content>
          <Style.InputField small={false} error={false}>
            <input
              type="string"
              placeholder="비밀번호"
              onChange={(e) => {
                e.target.value === data.PW
                  ? setErrorPWCheck(false)
                  : setErrorPWCheck(true);
              }}
            />
          </Style.InputField>
          <Style.ButtonWrapper
            small={false}
            error={false}
          ></Style.ButtonWrapper>
        </Style.Content>
        <ErrorMent
          error={errorPWCheck}
          errorMent="정보를 정확히 입력해주세요."
          ment=" "
        />
      </Style.ContentWrapper>

      <Text.Body1 color="gray700">이름</Text.Body1>
      <Margin direction="column" size={8} />
      <Style.ContentWrapper>
        <Style.Content>
          <Style.InputField small={false} error={false}>
            <input
              name="Name"
              value={Name}
              type="string"
              placeholder="김윙글"
              onChange={(e) => {
                handleData(e);
                handleName(e);
              }}
            />
          </Style.InputField>
          <Style.ButtonWrapper
            small={false}
            error={false}
          ></Style.ButtonWrapper>
        </Style.Content>
        <ErrorMent
          error={errorName}
          errorMent="실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) "
          ment=" 실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) "
        />
      </Style.ContentWrapper>

      <Text.Body1 color="gray700">닉네임</Text.Body1>
      <Margin direction="column" size={8} />
      <Style.ContentWrapper>
        <Style.Content>
          <Style.InputField small={true} error={false}>
            <input
              name="NickName"
              value={NickName}
              type="string"
              placeholder="희망찬윙그리"
              onChange={(e) => {
                handleData(e);
                handleNickName(e);
              }}
            />
          </Style.InputField>
          <Style.ButtonWrapper small={true} error={false}>
            <Style.Button>중복 확인</Style.Button>
          </Style.ButtonWrapper>
        </Style.Content>
        <ErrorMent
          error={errorNickName}
          errorMent="한글/영어 두글자 이상 10글자 이하 "
          ment="  "
        />
      </Style.ContentWrapper>
    </>
  );
}
