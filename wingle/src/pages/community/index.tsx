import styled from "styled-components";

export default function Community() {
  const Style = {
    Header: styled.div`
      width: 100%;
      height: 56px;
      display: flex;
      flex-direction: row;
      align-items: center;
    `,

    HeaderText: styled.div`
      font-size: 20px;
      font-weight: 700;
      color: #222223;
      padding: 14px 24px;
    `,

    HeaderBar: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 43px;
      border-bottom: 1px solid #eeeef2;
      gap: 24px;
    `,

    HeaderMenu: styled.div`
      font-size: 18px;
      font-weight: 700;
      color: #222223;
      margin-left: 24px;
      padding: 13px 0px 10px 0px;
      border-bottom: 2px solid #ff812e;
    `,

    Body: styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 780px;
      background-color: white;
    `,

    CreateAbsolutePoint: styled.div`
      position: absolute;
    `,

    CreateIcon: styled.img`
      width: 50px;
      height: 50px;
      position: relative;
      left: 428px;
      top: 710px;
    `,

    Contents: styled.div`
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid #eeeef2;
      gap: 2px;
    `,

    ContentsHeader: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 12px 0px 4px 24px;
    `,

    ContentsHeaderImg: styled.img``,

    ContentsHeaderInfo: styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 5px;
      padding-left: 10px;
    `,

    ContentsHeaderId: styled.div`
      font-size: 14px;
      font-weight: 500;
      color: #222223;
    `,

    ContentsHeaderCreatedAt: styled.div`
      font-size: 12px;
      font-weight: 400;
      color: #959599;
    `,

    ContentsBody: styled.div`
      font-size: 16px;
      font-weight: 400;
      color: #222223;
      padding: 0px 24px 12px 24px;
    `,

    Footer: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 72px;
      border-top: 1px solid #eeeef2;
    `,

    FooterMenu: styled.div`
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `,

    FooterMenuImg: styled.img``,

    FooterCommunityText: styled.div`
      font-size: 12px;
      font-weight: 500;
      color: #222223;
      padding-top: 4px;
    `,

    FooterMenuText: styled.div`
      font-size: 12px;
      font-weight: 500;
      color: #959599;
      padding-top: 4px;
    `,
  };

  return (
    <>
      <Style.Header>
        <Style.HeaderText>커뮤니티</Style.HeaderText>
      </Style.Header>
      <Style.HeaderBar>
        <Style.HeaderMenu>자유</Style.HeaderMenu>
        <Style.HeaderMenu>교류</Style.HeaderMenu>
        <Style.HeaderMenu>공지</Style.HeaderMenu>
      </Style.HeaderBar>
      <Style.Body>
        <Style.CreateAbsolutePoint>
          <Style.CreateIcon src="community/create-icon.png" />
        </Style.CreateAbsolutePoint>
        {/* 자유 탭 */}
        <Style.Contents>
          <Style.ContentsHeader>
            <Style.ContentsHeaderImg src="community/list_profile.png" />
            <Style.ContentsHeaderInfo>
              <Style.ContentsHeaderId>한국윙그리</Style.ContentsHeaderId>
              <Style.ContentsHeaderCreatedAt>
                10분 전
              </Style.ContentsHeaderCreatedAt>
            </Style.ContentsHeaderInfo>
          </Style.ContentsHeader>
          <Style.ContentsBody>
            학교 가기 싫어요! 침대에 있는게 좋아요~~ 맛집 추천좀 부탁드려요!
            글로리 재밌어요.
          </Style.ContentsBody>
        </Style.Contents>
        {/* 교류 탭 */}
        <Style.Contents>
          <Style.ContentsHeader>
            <Style.ContentsHeaderImg src="community/list_profile_flag.png" />
            <Style.ContentsHeaderInfo>
              <Style.ContentsHeaderId>가나다라마바사123</Style.ContentsHeaderId>
              <Style.ContentsHeaderCreatedAt>
                10분 전
              </Style.ContentsHeaderCreatedAt>
            </Style.ContentsHeaderInfo>
          </Style.ContentsHeader>
          <Style.ContentsBody>
            학교 가기 싫어요! 침대에 있는게 좋아요~~ 맛집 추천좀 부탁드려요!
            글로리 재밌어요.
          </Style.ContentsBody>
        </Style.Contents>
        {/* 공지 탭 */}
        <Style.Contents>
          <Style.ContentsHeader>
            <Style.ContentsHeaderImg src="community/list_profile_admin.png" />
            <Style.ContentsHeaderInfo>
              <Style.ContentsHeaderId>관리자</Style.ContentsHeaderId>
              <Style.ContentsHeaderCreatedAt>
                10분 전
              </Style.ContentsHeaderCreatedAt>
            </Style.ContentsHeaderInfo>
          </Style.ContentsHeader>
          <Style.ContentsBody>공지 지켜주세요.</Style.ContentsBody>
        </Style.Contents>
      </Style.Body>
      <Style.Footer>
        <Style.FooterMenu>
          <Style.FooterMenuImg src="community/footer-community-icon.png" />
          <Style.FooterCommunityText>커뮤니티</Style.FooterCommunityText>
        </Style.FooterMenu>
        <Style.FooterMenu>
          <Style.FooterMenuImg src="community/footer-letter-icon.png" />
          <Style.FooterMenuText>쪽지</Style.FooterMenuText>
        </Style.FooterMenu>
        <Style.FooterMenu>
          <Style.FooterMenuImg src="community/footer-mypage-icon.png" />
          <Style.FooterMenuText>마이페이지</Style.FooterMenuText>
        </Style.FooterMenu>
      </Style.Footer>
    </>
  );
}
