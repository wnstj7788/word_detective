import { View, Text, ImageBackground, TouchableOpacity, TouchableHighlight } from "react-native";
import { Platform } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";
import { Container } from "../../styles/globalStyles";
import styled, { css } from "styled-components/native";
import { IWord } from "../../types/types";

/**
 * 문제 중에 사용되는 미니 단어 카드
 * @param word 단어 정보
 * @param isFront 카드가 앞면인지. 그림이 앞면, 물음표가 뒷면
 * @param isTouchable 카드가 터치 가능한지 아닌지(드래그x 터치o)
 * @param getFunc 클릭했을 때 작동할 함수
 */
const MiniCard = (props: {
  word: IWord;
  isFront: boolean;
  isTouchable: boolean;
  onClick(word: IWord): void;
}) => {
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
      // 터치 불가능하면 아예 투명, 터치 안되도록
      <TouchableHighlight
        activeOpacity={props.isTouchable ? 0.6 : 1}
        underlayColor="white"
        onPress={() => {
          if (props.isTouchable) {
            //TODO: 게임으로 클릭한 단어 데이터 넘겨주는 함수가 들어가야
            // console.log(props.word.name);
            props.onClick(props.word);
          }
        }}
        style={{ borderRadius: 30 }}
      >
        <CardContainer $isFront={props.isFront}>
          {props.isFront ? (
            // <PictureImage source={require("../../assets/card/fruit/apple.png")} />
            <PictureImage source={getImage(props.word.name)} />
          ) : (
            <QmarkImage source={require("../../assets/etc/qmark.png")} resizeMode="contain" />
          )}
        </CardContainer>
      </TouchableHighlight>
    );
  } else {
    return null;
  }
};
export default MiniCard;

//전체 카드 컨테이너
const CardContainer = styled(Container)<{ $isFront: boolean }>`
  width: 135px;
  max-height: 135px;
  background-color: ${props => (props.$isFront ? "white" : "#FFEBC4")};
  border-radius: 30px;
  ${Platform.select({
    ios: css`
      shadow-color: black;
      shadow-offset: {
	    width: 0,
	    height: 2,
      };
      shadow-opacity: 0.5;
      shadow-radius: 10;
    `,
    android: css`
      elevation: 5;
    `,
  })}
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
