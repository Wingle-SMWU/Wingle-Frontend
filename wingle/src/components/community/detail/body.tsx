import styled from "styled-components";
import { Text } from "../../ui";

export default function Body() {
  return (
    <Style.Body>
      <Style.Contents>
        <Text.Body3 color="gray900">
          그녀 역시 그런 엄마의 칭찬이 좋았다. 그건 그녀에게 자부심을 주었다.
          말썽부리지 않는 착한 아이라는 몇 되지 않는 자신의 장점이었다. 그런데
          32살 어느 일요일 명상을 통해 비로소 무언가 이상하다는 생각이 들었다.
          그녀의 모든 기억을 샅샅이 훑어보았는데 어릴 적조차 그녀는 마음
          속으로도 무언가를 바라거나 욕망한 적이 없었다. 무언가를 갖고 싶다고
          느낀 적도 없고 뭘 사달라고 떼쓴 적도 없었다. 어딘가를 가고 싶다거나
          무언가를 배우고 싶다고 느낀 적도 없었다. 그녀의 부모로서는 억울할
          거다. 왜냐하면 그녀의 부모가 그녀의 요구를 거절한 적은 거의 없기
          때문이다. 오히려 그녀의 엄마는 얼마나 많은 날 뭐 갖고 싶은 거 필요한
          거 없냐고 물어보기 바뻤다. 그녀는 마치 애초에 욕망 따윈 지닌 적 없는
          아이처럼 그녀 마음 속으로도 무언가를 바란 적이 없었다. 어린 아이가
          그럴 수가 있을까? 그래서 그녀는 오히려 어릴 적에 어른스럽다거나 누나일
          거란 평가를 듣고 자랐다. 어린 아이는 태어나는 순간부터 모든 걸 다
          이해하고 있었다. 기억에 없더라도 그녀의 무의식 속에 엄마의 탯줄을 끊고
          태어난 그 순간의 모든 기억은 저장된다. 그녀는 태어날 때부터 자신이 이
          세계의 주인공이 될 수 없다는 냉혹한 사실을 알고 있었다. 그녀의
          어머니는 그녀를 계획한 적 없었다. 시집살이를 하며 농사를 지어야 하는
          그 때 그녀를 임신한 건 불편하고 짜증스러운 일이었다. 그녀의 어머니는
          아이를 그다지 좋아하지 않았고 둘째를 낳을 마음은 없었다. 아마 지금처럼
          의료기술이 발달되어 있었다면 분명 그녀를 낙태했을 게 분명했다. (27년이
          지나 이 사실을 알게 되었는데 그녀는 상처받지 않았다. 그녀의 이야기를
          전해들은 친구들이 경악을 금치 못했는데 그녀는 그럴 수 있다고 엄마를
          이해했다. 이제와 돌아보니 이미 알고 있었기에 충격적이지 않았던
          것이다.) 그러나 그 시골에서 그 아이는 이미 10개월이 될 때까지 방치되어
          다행히 무럭무럭 자랐다. 하필 그녀가 광복절날 예고도 없이 태어났기에
          원래 가던
        </Text.Body3>
      </Style.Contents>
    </Style.Body>
  );
}

const Style = {
  Body: styled.div`
    width: 100%;
  `,

  Contents: styled.div`
    padding: 16px 24px 20px 24px;
    border-bottom: 4px solid #eeeef2;
  `,
};
