import Contents from "@/src/components/admin/detail/contents";
import Modal from "@/src/components/admin/detail/modal";
import Header from "@/src/components/admin/index/header";
import styled from "styled-components";
import { theme } from "@/src/styles/theme";
import Loading from "@/src/components/ui/loadingUI";
import useDetailDispatch from "@/src/hooks/admin/useDetailDispatch";

export default function Detail() {
  const {
    isOpen,
    setIsOpen,
    userId,
    inputs,
    setInputs,
    data,
    isError,
    isLoading,
    handleSubmit,
  } = useDetailDispatch();

  if (isError) {
    return <S.Main modal={isOpen}>404</S.Main>;
  }

  return (
    <S.Main modal={isOpen}>
      <Header />
      {data && (
        <>
          <S.TabBar>
            <p>수락{data.message.split(" ")[1]}</p>
          </S.TabBar>
          <S.Card card={data.data.idCardImage} />
          <Contents
            userId={userId}
            data={data.data}
            setIsOpen={setIsOpen}
            inputs={inputs}
            setInputs={setInputs}
            handleSubmit={handleSubmit}
          />
        </>
      )}

      {isOpen && (
        <Modal setIsOpen={setIsOpen} isLoading={false}>
          {isOpen}
        </Modal>
      )}
      {isLoading && (
        <>
          <Modal setIsOpen={setIsOpen} isLoading={true}>
            {isOpen}
          </Modal>
          <S.Load>
            <Loading />
          </S.Load>
        </>
      )}

      <S.Button onClick={() => setIsOpen("수락")}>
        <button type="button">가입수락</button>
      </S.Button>
    </S.Main>
  );
}

const S = {
  Main: styled.div<{ modal: string }>`
    width: 100%;
    height: 1500px;
    background: ${({ modal }) =>
      modal ? theme.color.gray200 : theme.color.white};
    position: relative;
  `,
  Load: styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    left: 500px;
    top: 920px;
  `,
  TabBar: styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px 0px 0px 248px;
    gap: 24px;
    width: 1440px;
    height: 44px;
    left: 0px;
    top: 143px;
    border-bottom: 1px solid ${theme.color.gray200};
    > p {
      padding: 8px;
      width: 63px;
      height: 27px;
      font-family: "Pretendard Variable", Pretendard;
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 150%;
      display: flex;
      align-items: center;
      text-align: center;
      color: ${theme.color.gray900};
    }
  `,
  Card: styled.div<{ card: string | undefined }>`
    position: absolute;
    width: 700px;
    height: 600px;
    left: 373px;
    top: 123px;
    background-image: ${({ card }) => (card ? `url(${card})` : "")};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  `,
  Button: styled.div`
    position: absolute;
    width: 1440px;
    height: 80px;
    left: 0px;
    bottom: 0px;
    border-top: 1px solid ${theme.color.gray200};
    > button {
      position: absolute;
      left: 992px;
      top: 15px;
      width: 200px;
      height: 50px;
      padding: 14px 16px;
      background: ${theme.color.orange500};
      border-radius: 8px;
      font-weight: 700;
      font-size: 16px;
      color: ${theme.color.white};
      font-family: "Pretendard Variable", Pretendard;
    }
  `,
};
