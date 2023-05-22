import { getImageUrl } from "@/src/modules/utils";
import { useState } from "react";
import styled from "styled-components";
import Modal from "../../modal";
import { Margin, Text } from "../../ui";
import betweenTime from "@/src/utils/betweenTime";
import { countryImg } from "@/src/modules/utils";

export default function Profile({
  article,
  currentTab,
}: {
  article: Article;
  currentTab: string;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { isMine, userNickname, createdTime, forumId, articleId } = article;
  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  const time = betweenTime(createdTime);

  return (
    <>
      <S.Profile>
        <S.ProfileLeft>
          {currentTab === "교류" ? (
            <S.ImageBox>
              <S.ProfileImg
                src={
                  article.userImage
                    ? article.userImage
                    : getImageUrl(currentTab)
                }
              />
              <S.NationIcon src={countryImg(article.userNation)} />
            </S.ImageBox>
          ) : (
            <S.ProfileImg src={getImageUrl(currentTab)} />
          )}
          <Margin direction="row" size={10} />
          <S.ProfileInfo>
            <Text.Body6 color="gray900">{userNickname}</Text.Body6>
            <Text.Caption3 color="gray500">{time}</Text.Caption3>
          </S.ProfileInfo>
        </S.ProfileLeft>
        {isMine && (
          <S.CancelImg
            src="/community/detail/close-gray.svg"
            onClick={onClickModal}
          />
        )}
      </S.Profile>
      {modalVisible && (
        <Modal
          type="detail-delete-contents"
          deleteInform={{
            forumId: String(forumId),
            articleId: String(articleId),
            id: 0,
          }}
          onClickModal={onClickModal}
        />
      )}
    </>
  );
}

const S = {
  Profile: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 65px 24px 8px 24px;
  `,

  ProfileImg: styled.img`
    border-radius: 50%;
    width: 36px;
    height: 36px;
  `,

  ProfileInfo: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ImageBox: styled.div`
    position: relative;
    width: 36px;
    height: 36px;
  `,
  NationIcon: styled.img`
    width: 16px;
    height: 16px;
    border-radius: 100px;
    position: absolute;
    right: 0%;
    bottom: 0%;
    z-index: 0;
    cursor: pointer;
  `,
  ProfileLeft: styled.div`
    display: flex;
    flex-direction: row;
  `,

  CancelImg: styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
  `,
};
