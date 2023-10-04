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
import { initialWord } from "../../common/initialType";
import Boom from "./boom";
import { shuffleArray } from "../../utils/utils";
import { WordAPI } from "../../utils/api";
import getBackgroundImage from "../components/BackGroundImageSelect";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "PictureGame2">;
const { Provider, Droppable, Draggable } = createDndContext();

type PictureGameWordType = {
  word: IWord;
  canDrag: boolean;
};
const getDropImage = category => {
  switch (category) {
    case 1:
      return require("../../assets/etc/basket_pic3.png");
    case 2:
      return require("../../assets/etc/ground_pic3.png");
    case 3:
      return require("../../assets/etc/floor_pic3.png");
    default:
      return require("../../assets/etc/basket_pic3.png");
  }
};

export default getDropImage;

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
  const dropImage = getDropImage(word.category);
  // 배경
  const backgroundImage = getBackgroundImage(word.category);
  // 드레그 리스트
  const [shuffledDragList, setShuffledDragList] = useState<PictureGameWordType[]>([
    { word: initialWord, canDrag: true },
  ]); //리스트를 섞기
  // const [testList, setTestList] = useState<PictureGameWordType[]>([]);
  useEffect(() => {
    let choiceList: IWord[] = [];
    //선지 8개 배열 choiceList에
    const promise = WordAPI.getRandom(word.name, 3, 3);
    promise
      .then(res => {
        choiceList = res.data;
      })
      .then(() => {
        const dragRandList = shuffleArray(choiceList);
        let draglist: PictureGameWordType[] = []; //드롭될 위치들
        dragRandList.map((word, index) => {
          word.index = index;
          draglist.push({
            word: word,
            canDrag: true,
          });
        });
        return draglist;
      })
      .then(res => {
        setShuffledDragList(res);
      });
  }, []);
  useEffect(() => {
    console.log(shuffledDragList);
  });

  // 드롭리스트
  const [dropList, setDropList] = useState<IWord[]>([]);

  useEffect(() => {
    if (dropList.length === 3) {
      openModal();
    }
  }, [clickedWord, dropList]);

  //미니카드 클릭했을 때 단어값 전달받기
  const getMiniCardInfo = (word: IWord) => {
    setClickedWord(word);
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
            <GameClearModal nextScreen="Main" word={word} />
          </Modal>
          <ContainerBg source={backgroundImage}>
            <ContentContainer>
              <ACardContainer>
                <ACardLine>
                  {shuffledDragList.slice(0, 3).map((choice, index) => {
                    console.log(choice);
                    return (
                      <ACardFirst key={index}>
                        <MiniCard
                          word={choice.word}
                          isFront={true}
                          isTouchable={false}
                          onClick={getMiniCardInfo}
                          draggable={choice.canDrag ? Draggable : undefined}
                        />
                      </ACardFirst>
                    );
                  })}
                </ACardLine>
                <ACardLine>
                  {shuffledDragList.slice(3, 6).map((choice, index) => {
                    return (
                      <ACardSecond key={index}>
                        <MiniCard
                          word={choice.word}
                          isFront={true}
                          isTouchable={false}
                          onClick={getMiniCardInfo}
                          draggable={choice.canDrag ? Draggable : undefined}
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
                      const updatedTestList = shuffledDragList.map(item => {
                        if (item.word.index === payload.index) {
                          setDropList(prevList => [...prevList, payload]);

                          return {
                            ...item,
                            word: { ...item.word, url: "" },
                            canDrag: false,
                          };
                        }
                        return item;
                      });
                      setShuffledDragList(updatedTestList);
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
                        <ImageBackgrounds source={dropImage} resizeMode="contain">
                          {dropList.map((item, index) => (
                            <Image
                              key={index}
                              source={{ uri: word.url }}
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
