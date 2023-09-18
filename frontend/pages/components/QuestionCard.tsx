import { View, Text, Image } from "react-native";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useCachedResources from "../../hooks/useCachedResources";
import { BtnContainer } from "../../styles/globalStyles";
import styled, { css } from "styled-components/native";
import { ICard, IWord } from "../../types/types";
import { useEffect } from "react";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const QuestionCard = (props: { word: IWord; type: ICard }) => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  //단어를 글자단위로 쪼갠 리스트
  let wordToLetterList: String[] = props.word.name.split("");

  //TODO: 이미지 소스는 임시로 사과로 세팅해둠
  if (isLoaded) {
    return (
      <CardContainer>
        <ImgContainer>
          {props.type.pictureHidden ? (
            <QmarkImage source={require("../../assets/etc/qmark.png")} resizeMode="stretch" />
          ) : (
            // <PictureImage source={require(`{props.word.imgSrc}`)} />
            <PictureImage source={require("../../assets/card/fruit/apple.png")} />
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
          <Image source={require("../../assets/button/audioBtn.png")} />
        </SoundBtn>
      </CardContainer>
    );
  } else {
    return null;
  }
};
export default QuestionCard;

//전체 카드 컨테이너
const CardContainer = styled(BtnContainer)`
  width: 168px;
  max-height: 251px;
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
  width: 150px;
  height: 150px;
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
  width: 130px;
  height: 130px;
`;

//글씨 영역
const QTextContainer = styled.View`
  flex-direction: row;
`;

//카드의 이름 전체 텍스트
const WordText = styled.Text`
  font-family: "BMJUA";
  font-size: 40px;
  margin: 5px 0;
`;

//카드 이름 중 빈칸인 부분-빈칸
const WordHiddenContainer = styled.View`
  width: 45px;
  height: 45px;
  border: 1px solid black;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 5px 3px;
`;

//카드 이름 중 빈칸인 부분-텍스트
const WordHidden = styled.Text`
  font-family: "BMJUA";
  font-size: 40px;
  color: lightgray;
`;

//발음 듣기 버튼
const SoundBtn = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  border: 1px solid black;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
