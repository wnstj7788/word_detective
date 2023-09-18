import { View, Text, Image, ImageBackground } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import QuestionCard from "../components/QuestionCard";
import { ICard } from "../../types/types";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "WordGame1">;

//통글씨인식 첫번째문제 : 그림 맞추기
const Word1Type: ICard = {
  pictureHidden: true, //그림 숨기기
  wordHidden: false, //글씨는 숨기지 않음
  wordHiddenIndx: 0, //글씨를 숨긴다면 몇번째 인덱스의 글씨를 숨기는지(0부터시작)
};

const WordGame1 = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params;
  //선지 8개의 배열
  //TODO: api 로 랜덤 뽑는 기능 받아와서 채우기
  const choiceList = ["사과", "오렌지", "수박", "토마토", "체리", "바나나", "딸기", "사과"];

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg source={require("../../assets/background/game/fruit.png")}>
          <ContentContainer>
            <QCardContainer>
              <QuestionCard word={word} type={Word1Type} />
            </QCardContainer>
            <ACardContainer>
              {choiceList.map((choice, index) => {
                return (
                  <ACard key={index}>
                    <Text>{choice}</Text>
                  </ACard>
                );
              })}
            </ACardContainer>
          </ContentContainer>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default WordGame1;

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
`;

const ACardContainer = styled.View`
  flex: 2;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ACard = styled.View`
  width: 25%;
  height: 50%;
  background-color: yellow;
  justify-content: center;
  align-items: center;
`;
