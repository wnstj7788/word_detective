import { View, Text, Image } from "react-native";
import { Platform } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";
import { BtnContainer } from "../../styles/globalStyles";
import styled, { css } from "styled-components/native";
import { IWord } from "../../types/types";

/**
 * 문제 중에 사용되는 미니 단어 카드
 * @param word 단어 정보
 * @param isFront 카드가 앞면인지. 그림이 앞면, 물음표가 뒷면
 */
const MiniCard = (props: { word: IWord; isFront: boolean }) => {
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
      <CardContainer $isFront={props.isFront}>
        {props.isFront ? (
          // <PictureImage source={require("../../assets/card/fruit/apple.png")} />
          <PictureImage source={getImage(props.word.name)} />
        ) : (
          <QmarkImage source={require("../../assets/etc/qmark.png")} resizeMode="contain" />
        )}
      </CardContainer>
    );
  } else {
    return null;
  }
};
export default MiniCard;

//전체 카드 컨테이너
const CardContainer = styled(BtnContainer)<{ $isFront: boolean }>`
  width: 135px;
  max-height: 135px;
  background-color: ${props => (props.$isFront ? "white" : "#FFEBC4")};
  border-radius: 30px;

  ${Platform.OS === 'ios' && `
    shadow-color: black;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.5;
    shadow-radius: 10px;
  `}

  ${Platform.OS === 'android' && `
    elevation: 5;
  `}
`;

//물음표 이미지
const QmarkImage = styled.Image`
  width: 80px;
  height: 80px;
`;

//원래 카드의 이미지
const PictureImage = styled.Image`
  width: 100px;
  height: 100px;
`;
