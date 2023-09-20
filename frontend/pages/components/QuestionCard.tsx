import { View, Text, Image } from "react-native";
import { Platform } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";
import { Container } from "../../styles/globalStyles";
import styled, { css } from "styled-components/native";
import { ICard, IWord } from "../../types/types";
import { useEffect } from "react";

/**
 * 문제에 사용되는 단어 카드
 * @param word 단어 정보
 * @param type 문제 정보: 각 스테이지의 문제 정보를 ICard 타입에 맞게 정의해서 보내기
 * (WordGame1 참고)
 */
const QuestionCard = (props: { word: IWord; type: ICard }) => {
  const isLoaded = useCachedResources();
  //단어를 글자단위로 쪼갠 리스트
  let wordToLetterList: String[] = props.word.name.split("");
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
  //TODO: 이미지 소스는 임시로 사과로 세팅해둠(일단 과일만 정상작동하게 변경했음)
  if (isLoaded) {
    console.log(props.word.name+"letter");
    return (
      <CardContainer>
        <ImgContainer>
          {props.type.pictureHidden ? (
            <QmarkImage source={require("../../assets/etc/qmark.png")} resizeMode="contain" />
          ) : (
            // <PictureImage source={require(`{props.word.imgSrc}`)} />
            <PictureImage source={getImage(props.word.name)} />
          )}
        </ImgContainer>
        <View>
          {props.type.wordHidden === false ? (
            <WordText key={props.word.name}>{props.word.name}</WordText>
          ) : (
            <QTextContainer>
              {wordToLetterList.map((letter, index) => {
                if (index >= props.type.wordHiddenIndx) return null;
                else return <WordText key={index}>{letter}</WordText>;
              })}
              <WordHiddenContainer>
                <WordHidden>{wordToLetterList[props.type.wordHiddenIndx]}</WordHidden>
              </WordHiddenContainer>
              {wordToLetterList.map((letter, index) => {
                if (index <= props.type.wordHiddenIndx) return null;
                else return <WordText key={index}>{letter}</WordText>;
              })}
            </QTextContainer>
          )}
        </View>
        <SoundBtn>
          <Image source={require("../../assets/button/audioBtn.png")} resizeMode="stretch" />
        </SoundBtn>
      </CardContainer>
    );
  } else {
    return null;
  }
};
export default QuestionCard;

//전체 카드 컨테이너
const CardContainer = styled(Container)`
  width: 200px;
  max-height: 300px;
  background-color: white;
  border-radius: 0 30px;
  margin: 10px auto;
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

//이미지 영역
const ImgContainer = styled.View`
  width: 175px;
  height: 175px;
  background-color: #f8f4e8;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

//물음표 이미지
const QmarkImage = styled.Image`
  width: 100px;
  height: 100px;
`;

//원래 카드의 이미지
const PictureImage = styled.Image`
  width: 150px;
  height: 150px;
`;

//글씨 영역
const QTextContainer = styled.View`
  flex-direction: row;
`;

//카드의 이름 전체 텍스트
const WordText = styled.Text`
  font-family: "BMJUA";
  font-size: 48px;
  margin-top: 5px;
`;

//카드 이름 중 빈칸인 부분-빈칸
const WordHiddenContainer = styled.View`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 6px 3px;
`;

//카드 이름 중 빈칸인 부분-텍스트
const WordHidden = styled.Text`
  font-family: "BMJUA";
  font-size: 44px;
  color: lightgray;
`;

//발음 듣기 버튼
const SoundBtn = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  border: 1px solid black;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
