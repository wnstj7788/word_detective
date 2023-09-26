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
const { Provider, Droppable, Draggable } = createDndContext();

const PictureGame3 = () => {
  const [count, setCount] = useState(0);

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
  const [canDrag, setCanDrag] = useState(true);
  // 드레그 리스트

  const choiceList = ["사과", "오렌지", "오렌지", "바나나", "딸기", "사과"];
  const [testList, setTestList] = useState<IWord[]>([]);
  choiceList.map(word => {
    let tempStage: IWord = { ...initialWord }; //initialWord를 복사해서 사용
    tempStage.name = word;
    testList.push({
      name: word,
      imgSrc: "",
    });
  });

  // 드롭리스트
  const [dropList, setDropList] = useState<IWord[]>([]);

  useEffect(() => {
    // console.log(clickedWord);
  }, [clickedWord]);

  //미니카드 클릭했을 때 단어값 전달받기
  const getMiniCardInfo = (word: IWord) => {
    setClickedWord(word);
  };

  // 드롭되면 사라지는 리스트

  useEffect(() => {
    const initialList: IWord[] = choiceList.map((word, index) => ({
      id: index,
      name: word,
      imgSrc: "",
      canDrag: true, // 여기 추가
    }));
    setTestList(initialList);
  }, []);

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
                <ACardContainer>
                  <ACardLine>
                    {testList.slice(0, 3).map((choice, index) => {
                      return (
                          <ACardFirst key={index}>
                            <MiniCard
                                word={choice}
                                isFront={true}
                                isTouchable={false}
                                onClick={getMiniCardInfo}
                                draggable={choice.canDrag ? Draggable : undefined} // choice의 canDrag 속성에 따라 결정
                            />
                          </ACardFirst>
                      );
                    })}
                  </ACardLine>
                  <ACardLine>
                    {testList.slice(3, 6).map((choice, index) => {
                      return (
                          <ACardSecond key={index}>
                            <MiniCard
                                word={choice}
                                isFront={true}
                                isTouchable={false}
                                onClick={getMiniCardInfo}
                                draggable={choice.canDrag ? Draggable : undefined} // choice의 canDrag 속성에 따라 결정
                            />
                          </ACardSecond>
                      );
                    })}
                  </ACardLine>
                </ACardContainer>
                <View>
                  <Droppable
                      onEnter={() => {}}
                      onLeave={() => {
                        console.log("Draggable left");
                      }}
                      onDrop={({ payload }) => {
                        console.log(payload);
                        if (word.name === payload.name) {
                          console.log(payload);
                          console.log("hi");
                          const updatedTestList = testList.map(item => {
                            if (item.id === payload.id) {
                              setDropList(prevList => [...prevList, payload]);
                              return { ...item, name: "정답", canDrag: false }; // 해당 아이템의 canDrag를 false로 설정
                            }
                            return item;
                          });
                          setTestList(updatedTestList);
                        }
                      }}
                  >
                    {({ active, viewProps }) => {
                      return (
                          <Animated.View
                              {...viewProps}
                              style={[
                                {
                                  // backgroundColor: active ? "blue" : "green",
                                },
                              ]}
                          >
                            <ImageBackgrounds source={require("../../assets/etc/basket_pic3.png")}>
                              {Array.from({ length: dropList.length }).map((_, index) => (
                                  <Image
                                      key={index}
                                      source={require("../../assets/card/fruit/apple.png")}
                                      style={{ width: 100, height: 100, margin: 5 }}
                                  />
                              ))}
                            </ImageBackgrounds>
                          </Animated.View>
                      );
                    }}
                  </Droppable>
                </View>
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

const ImageBackgrounds = styled(ImageBackground)`
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 1;
`;
