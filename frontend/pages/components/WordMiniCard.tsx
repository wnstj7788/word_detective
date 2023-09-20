import { View, Text, ImageBackground, TouchableOpacity, TouchableHighlight } from "react-native";
import { Platform } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";
import { Container, ContainerBg } from "../../styles/globalStyles";
import styled, { css } from "styled-components/native";
import { IWord } from "../../types/types";

/**
 * 미니 단어 카드를 넣어야할 위치, 통글씨 게임2에서 사용
 * @param word 단어 정보
 * @param onClick 클릭했을 때 작동할 함수, 단어의 정보를 부모가 넘겨받는 기능 등
 */
const WordMiniCard = (props: { word: IWord; onClick(word?: IWord): void }) => {
  const isLoaded = useCachedResources();

  //test용
  function getImage(name: string): any {
    switch (name) {
      case "사과":
        return require("../../assets/card/fruit/apple.png");
      case "오렌지":
        return require("../../assets/card/fruit/orange.png");
      case "수박":
        return require("../../assets/card/fruit/watermelon.png");
      case "토마토":
        return require("../../assets/card/fruit/tomato.png");
      case "체리":
        return require("../../assets/card/fruit/cherry.png");
      case "바나나":
        return require("../../assets/card/fruit/banana.png");
      case "딸기":
        return require("../../assets/card/fruit/strawberry.png");
      case "멜론":
        return require("../../assets/card/fruit/melon.png");
      case "복숭아":
        return require("../../assets/card/fruit/peach.png");
      case "포도":
        return require("../../assets/card/fruit/grapes.png");
    }
  }

  //TODO: 이미지 소스는 임시로 getImage 사용, 추후 변경해야
  if (isLoaded) {
    return (
      <CardContainer>
        <CardBackground source={require("../../assets/etc/wordMiniCard.png")}>
          <PictureImage source={getImage(props.word.name)} />
        </CardBackground>
      </CardContainer>
    );
  } else {
    return null;
  }
};
export default WordMiniCard;

//전체 컨테이너
const CardContainer = styled(Container)`
  width: 135px;
  max-height: 135px;
  background-color: white;
  border-radius: 30px;
`;

//카드 배경
const CardBackground = styled(ContainerBg)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

//카드의 이미지
const PictureImage = styled.Image`
  width: 100px;
  height: 100px;
`;
