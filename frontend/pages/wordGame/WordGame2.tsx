import {
  View,
  Text,
  Animated,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import QuestionCard from "../components/QuestionCard";
import WordMiniCard from "../components/WordMiniCard";
import MiniCard from "../components/MiniCard";
import { ICard, IWord } from "../../types/types";
import { initialWord } from "../initialType";
import { useEffect, useState } from "react";
import { createDndContext } from "react-native-easy-dnd"; //dragabble

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "WordGame2">;
const { Provider, Droppable, Draggable } = createDndContext();

const WordGame2 = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params; //목표 단어

  const [clickedWord, setClickedWord] = useState<IWord>(initialWord); //클릭한 단어 정보

  //선지 8개의 배열
  //TODO: api 로 랜덤 뽑는 기능 받아와서 채우기
  const choiceList = ["사과", "오렌지", "수박", "바나나", "딸기", "사과"];
  let dropList: IWord[] = []; //드롭될 위치들
  let dragList: IWord[] = []; //드래그할 카드들
  choiceList.map(word => {
    let tempStage: IWord = { ...initialWord }; //initialWord를 복사해서 사용
    tempStage.name = word;
    dropList.push({
      name: word,
      imgSrc: "",
    });
    dragList.push({
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
      <Provider>
        <Container>
          <ContainerBg
            source={require("../../assets/background/game/fruit.png")}
            resizeMode="stretch"
          >
            <ContentContainer>
              <ACardContainer>
                <ACardLine>
                  {dropList.slice(0, 3).map((choice, index) => {
                    return (
                      <ACardFirst key={index}>
                        <Droppable
                          onEnter={() => {
                            console.log("들오옴!!");
                          }}
                          onDrop={({ payload }) => {
                            console.log(
                              "Draggable with the following payload was dropped",
                              payload
                            );
                          }}
                        >
                          {({ active, viewProps }) => {
                            return (
                              <Animated.View
                                {...viewProps}
                                style={[
                                  {
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: active ? "blue" : "green",
                                  },
                                ]}
                              >
                                <WordMiniCard word={choice} onClick={getMiniCardInfo} />
                              </Animated.View>
                            );
                          }}
                        </Droppable>
                      </ACardFirst>
                    );
                  })}
                </ACardLine>
                <ACardLine>
                  {dropList.slice(3, 6).map((choice, index) => {
                    return (
                      <ACardSecond key={index}>
                        <Droppable
                          onEnter={() => {
                            console.log("들오옴!!");
                          }}
                          onDrop={({ payload }) => {
                            console.log(
                              "Draggable with the following payload was dropped",
                              payload
                            );
                          }}
                        >
                          {({ active, viewProps }) => {
                            return (
                              <Animated.View
                                {...viewProps}
                                style={[
                                  {
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: active ? "blue" : "green",
                                  },
                                ]}
                              >
                                <WordMiniCard word={choice} onClick={getMiniCardInfo} />
                              </Animated.View>
                            );
                          }}
                        </Droppable>
                      </ACardSecond>
                    );
                  })}
                </ACardLine>
              </ACardContainer>
              <QCardContainer>
                {dragList.map((dragCard, index) => {
                  return (
                    <MiniCard
                      word={dragCard}
                      isFront={true}
                      isTouchable={false}
                      onClick={getMiniCardInfo}
                      draggable={Draggable}
                    />
                  );
                })}
              </QCardContainer>
            </ContentContainer>
          </ContainerBg>
        </Container>
      </Provider>
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
