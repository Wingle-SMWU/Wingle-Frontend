import { useRouter } from "next/router";
import styled from "styled-components";
import { Text } from "../../ui";

export default function ListCard(props: { imgUrl: string; isNotice: boolean }) {
  const router = useRouter();

  const onClickMoveToDetail = () => {
    if (props.isNotice) {
      return;
    }
    router.push({ pathname: `/community/detail`, query: { ...router.query } });
  };

  return (
    <Style.Contents onClick={onClickMoveToDetail}>
      <Style.ContentsHeader>
        <Style.ContentsHeaderImg src={props.imgUrl} />
        <Style.ContentsHeaderInfo>
          <Text.Body6 color="gray900">한국윙그리</Text.Body6>
          <Text.Caption3 color="gray500">10분 전</Text.Caption3>
        </Style.ContentsHeaderInfo>
      </Style.ContentsHeader>
      <Text.Body4 color="gray900">
        학교 가기 싫어요! 침대에 있는게 좋아요~~ 맛집 추천좀 부탁드려요! 글로리
        재밌어요.
      </Text.Body4>
    </Style.Contents>
  );
}

const Style = {
  Contents: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #eeeef2;
    gap: 2px;
    padding: 12px 24px;
  `,

  ContentsHeader: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,

  ContentsHeaderImg: styled.img`
    border-radius: 50%;
    width: 36px;
    height: 36px;
  `,

  ContentsHeaderInfo: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
  `,
};
