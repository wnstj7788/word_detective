import { View, Text, ImageBackground, TouchableOpacity, TouchableHighlight } from "react-native";
import { Platform } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";
import { Container, ContainerBg } from "../../styles/globalStyles";
import styled, { css } from "styled-components/native";
import { IWord } from "../../types/types";

/**
 * 미니 단어 카드를 넣어야할 위치, 통글씨 게임2에서 사용
 * @param word 단어 정보
 * @param done 정답(종료) 여부
 */
const WordMiniCard = (props: { word: IWord; done: boolean }) => {
  const isLoaded = useCachedResources();

  //TODO: 이미지 소스는 임시로 getImage 사용, 추후 변경해야
  if (isLoaded) {
    return (
      <CardContainer done={props.done}>
        {props.done ? (
          <CardBackgroundDone>
            <PictureImageDone
              source={
                props.word.url ? { uri: props.word.url } : require("../../assets/etc/qmark.png")
              }
              done={props.done}
            />
            <WordTextDone done={props.done}>{props.word.name}</WordTextDone>
          </CardBackgroundDone>
        ) : (
          <CardBackground source={require("../../assets/etc/wordMiniCard.png")}>
            <PictureImage
              source={
                props.word.url ? { uri: props.word.url } : require("../../assets/etc/qmark.png")
              }
              done={props.done}
            />
            <WordText done={props.done}>{props.word.name}</WordText>
          </CardBackground>
        )}
      </CardContainer>
    );
  } else {
    return null;
  }
};
export default WordMiniCard;

//전체 컨테이너
const CardContainer = styled(Container)<{ done: boolean }>`
  width: 135px;
  max-height: 135px;
  background-color: white;
  border-radius: 30px;
  elevation: ${props => (props.done ? 5 : 0)};
`;

//카드 배경(=그림자)
const CardBackground = styled(ContainerBg)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

//정답 맞힌 카드
const CardBackgroundDone = styled(Container)`
  /* border: 2px solid blue; */
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;

//카드의 이미지
const PictureImage = styled.Image<{ done: boolean }>`
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.done ? 0.7 : 0.3)};
  position: relative;
  top: 25%;
`;

//카드의 글씨
const WordText = styled.Text<{ done: boolean }>`
  font-family: "BMJUA";
  font-size: 48px;
  color: ${props => (props.done ? "black" : "gray")};
  padding: 0 3px;
  /* text-shadow-color: rgba(225, 225, 225, 0.75);
  text-shadow-offset: {
    width: 0;
    height: 0;
  }
  text-shadow-radius: 15px; */
  z-index: 3;
  top: -35%;
  position: relative;
`;

//카드의 이미지
const PictureImageDone = styled.Image<{ done: boolean }>`
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
`;

//카드의 글씨
const WordTextDone = styled.Text<{ done: boolean }>`
  font-family: "BMJUA";
  font-size: 36px;
  color: black;
  padding: 0 3px;
  z-index: 3;
`;
