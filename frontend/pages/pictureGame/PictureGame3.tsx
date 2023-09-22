import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import QuestionCard from "../components/QuestionCard";
import MiniCard from "../components/MiniCard";
import { ICard, IWord } from "../../types/types";
import React, { useState, useEffect, useRef } from "react";
import GameClearModal from "../components/GameClearModal";
import Modal from "react-native-modal";
import { createDndContext } from "react-native-easy-dnd";
import { Animated } from "react-native";
import { initialWord } from "../initialType";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "PictureGame2">;

const PictureGame3 = () => {
  const { Provider, Droppable, Draggable } = createDndContext();
  const [count, setCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params;
  const Word1Type: ICard = {
    pictureHidden: false, //그림 숨기기
    wordHidden: false, //글씨는 숨기지 않음
    wordHiddenIndx: 1, //글씨를 숨긴다면 몇번째 인덱스의 글씨를 숨기는지(0부터시작)
  };
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
    if (!isDragging) {
      setClickedWord(word);
    }
  };
  // 모달
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (isLoaded) {
    return (
      <Provider>
        <Container>
          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropColor="rgba(0, 0, 0, 0.5)"
            isVisible={isModalVisible}
            onBackButtonPress={closeModal} // onRequestClose 대신 onBackButtonPress 사용
            backdropTransitionOutTiming={0}
            statusBarTranslucent={true} // 이 옵션을 사용하여 상태 표시줄을 숨깁니다.
          >
            <GameClearModal nextScreen="PictureGame3" word={word} />
          </Modal>
          <ContainerBg source={require("../../assets/background/game/fruit.png")}>
            <ContentContainer>
              <View>
                {testList.slice(0, 3).map((choice, index) => {
                  return (
                    <ACardFirst key={index}>
                      <MiniCard
                        word={choice}
                        isFront={true}
                        isTouchable={!isDragging}
                        onClick={getMiniCardInfo}
                        draggable={Draggable}
                      />
                    </ACardFirst>
                  );
                })}
              </View>
              <View>
                <Droppable
                  onEnter={() => {
                    console.log("Draggable entered");
                  }}
                  onLeave={() => {
                    console.log("Draggable left");
                  }}
                  onDrop={({ payload }) => {
                    console.log("Draggable with the following payload was dropped", payload);
                  }}
                >
                  {({ active, viewProps }) => {
                    return (
                      <Animated.View
                        {...viewProps}
                        style={[
                          {
                            width: 300,
                            height: 200,
                            backgroundColor: active ? "blue" : "green",
                          },
                        ]}
                      >
                        <Text style={{ fontWeight: "bold", color: "white" }}>Drop here</Text>
                      </Animated.View>
                    );
                  }}
                </Droppable>
              </View>
              {/* <ACardContainer>
              <ACardLine>
              {newCards.slice(0, 3).map((choice, index) => {
                return (
                  <ACardFirst key={index}>
                  <MiniCard
                  word={choice}
                  isFront={true}
                  isTouchable={true}
                  // onClick={getMiniCardInfo}
                  />
                  </ACardFirst>
                  );
                })}
              </ACardLine>
              <ACardLine>
                {newCards.slice(3, 6).map((choice, index) => {
                  return (
                    <ACardSecond key={index}>
                      <MiniCard
                        word={choice}
                        isFront={true}
                        isTouchable={true}
                        // onClick={getMiniCardInfo}
                      />
                    </ACardSecond>
                  );
                })}
              </ACardLine>
            </ACardContainer>
            <QCardContainer>
              <QCardContainer></QCardContainer>
            </QCardContainer> */}
            </ContentContainer>
          </ContainerBg>
        </Container>
      </Provider>
    );
  } else {
    return null;
  }
};
export default PictureGame3;
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
