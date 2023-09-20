import { View, Text, Image, ImageBackground, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import QuestionCard from "../components/QuestionCard";
import WordMiniCard from "../components/WordMiniCard";
import { ICard, IWord } from "../../types/types";
import { initialWord } from "../initialType";
import { useEffect, useState } from "react";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "WordGame2">;

const WordGame2 = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params; //목표 단어

  const [clickedWord, setClickedWord] = useState<IWord>(initialWord); //클릭한 단어 정보

  //선지 8개의 배열
  //TODO: api 로 랜덤 뽑는 기능 받아와서 채우기
  const choiceList = ["사과", "오렌지", "수박", "바나나", "딸기", "사과"];
  let testList: IWord[] = [];
  choiceList.map(word => {
    let tempStage: IWord = { ...initialWord }; //initialWord를 복사해서 사용
    tempStage.name = word;
    testList.push({
      name: word,
      imgSrc: "",
    });
  });

  useEffect(() => {
    console.log(clickedWord);
  }, [clickedWord]);

  //미니카드 클릭했을 때 단어값 전달받기
  const getMiniCardInfo = (word: IWord) => {
    setClickedWord(word);
  };

  //클릭한 카드가 목표 단어와 같은지 확인하는 함수
  const checkAnswer = () => (word.name === clickedWord.name ? true : false);

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg
          source={require("../../assets/background/game/fruit.png")}
          resizeMode="stretch"
        >
          <ContentContainer>
            <ACardContainer>
              <ACardLine>
                {testList.slice(0, 3).map((choice, index) => {
                  return (
                    <ACardFirst key={index}>
                      <WordMiniCard word={choice} onClick={getMiniCardInfo} />
                    </ACardFirst>
                  );
                })}
              </ACardLine>
              <ACardLine>
                {testList.slice(3, 6).map((choice, index) => {
                  return (
                    <ACardSecond key={index}>
                      <WordMiniCard word={choice} onClick={getMiniCardInfo} />
                    </ACardSecond>
                  );
                })}
              </ACardLine>
            </ACardContainer>
            <QCardContainer>
              <Text>카드더미</Text>
            </QCardContainer>
          </ContentContainer>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default WordGame2;

const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const QCardContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: aqua; */
`;

const ACardContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
`;

const ACardLine = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const ACard = styled.View`
  width: 25%;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const ACardFirst = styled(ACard)`
  margin-bottom: 10px;
`;

const ACardSecond = styled(ACard)`
  margin-top: 10px;
`;
