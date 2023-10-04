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
import GameClearModal from "../components/GameClearModal";
import { ICard, IWord } from "../../types/types";
import { initialWord } from "../../common/initialType";
import { useEffect, useState } from "react";
import { createDndContext } from "react-native-easy-dnd"; //dragabble
import Modal from "react-native-modal";
import { shuffleArray } from "../../utils/utils";
import { WordAPI } from "../../utils/api";
import GetCardModal from "../components/GetCardModal";
import getBackgroundImage from "../components/BackGroundImageSelect";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "WordGame2">;
const { Provider, Droppable, Draggable } = createDndContext();

// 정답(종료) 여부를 포함한 단어의 타입
type IWordWithDone = {
  word: IWord; //단어 정보
  done: boolean; //정답(종료) 여부
};

const WordGame2 = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params; //목표 단어

  const [clickedWord, setClickedWord] = useState<IWord>(initialWord); //클릭한 단어 정보
  const [isModalVisible, setModalVisible] = useState(false); //clear modal관련
  const [shuffledDropList, setShuffledDropList] = useState<IWordWithDone[]>([]); //리스트를 섞기
  const [shuffledDragList, setShuffledDragList] = useState<IWord[]>([initialWord]); //리스트를 섞기
  const backgroundImage = getBackgroundImage(word.category);
  //--- api 연결 안했을 때 ---
  // useEffect(() => {
  //   const choiceList: IWord[] = [
  //     {
  //       id: 1,
  //       name: "사과",
  //       url: "",
  //     },
  //     {
  //       id: 1,
  //       name: "사과",
  //       url: "",
  //     },
  //     {
  //       id: 1,
  //       name: "사과",
  //       url: "",
  //     },
  //     {
  //       id: 2,
  //       name: "바나나",
  //       url: "",
  //     },
  //     {
  //       id: 3,
  //       name: "딸기",
  //       url: "",
  //     },
  //     {
  //       id: 4,
  //       name: "토마토",
  //       url: "",
  //     },
  //   ];
  //   const dropRandList = shuffleArray(choiceList);
  //   const dragRandList = shuffleArray(choiceList);
  //   let dropList: IWordWithDone[] = []; //드롭될 위치들
  //   dropRandList.map((word, index) => {
  //     word.index = index;
  //     dropList.push({
  //       word: word,
  //       done: false,
  //     });
  //   });
  //   dragRandList.map((word, index) => {
  //     word.index = index;
  //   });
  //   setShuffledDropList(dropList);
  //   setShuffledDragList(dragRandList);
  // }, []);

  useEffect(() => {
    let choiceList: IWord[] = [];
    //선지 8개 배열 choiceList에
    const promise = WordAPI.getRandom(word.name, 2, 4);
    promise
      .then(res => {
        choiceList = res.data;
      })
      .then(() => {
        const dropRandList = shuffleArray(choiceList);
        const dragRandList = shuffleArray(choiceList);
        let dropList: IWordWithDone[] = []; //드롭될 위치들
        dropRandList.map((word, index) => {
          word.index = index;
          dropList.push({
            word: word,
            done: false,
          });
        });
        dragRandList.map((word, index) => {
          word.index = index;
        });
        return { drop: dropList, drag: dragRandList };
      })
      .then(res => {
        setShuffledDropList(res.drop);
        setShuffledDragList(res.drag);
      });
  }, []);

  useEffect(() => {
    if (shuffledDragList.length === 0) {
      setModalVisible(true);
    }
  }, [shuffledDragList]);

  //미니카드 클릭했을 때 단어값 전달받기
  const getMiniCardInfo = (word: IWord) => {
    setClickedWord(word);
  };

  //shuffledDragList에서 사용한 미니 카드 제거하기
  const deleteUsedCard = (payload: any) => {
    const updatedDragList = shuffledDragList.filter(item => item !== payload);
    setShuffledDragList(updatedDragList);
  };

  //shuffledDropList에서 맞힌 카드 표시하기
  const checkDoneCard = (choice: IWordWithDone) => {
    const updatedDropList = shuffledDropList.map((item, index) => {
      if (index === choice.word.index) {
        return {
          ...item,
          done: true,
        };
      }
      return item; // 다른 항목은 그대로 유지
    });
    setShuffledDropList(updatedDropList);
  };

  if (isLoaded) {
    return (
      <Provider>
        <Container>
          <ContainerBg source={backgroundImage}>
            <Modal
              animationIn="slideInUp"
              animationOut="slideOutDown"
              backdropColor="rgba(0, 0, 0, 0.5)"
              isVisible={isModalVisible}
              onBackButtonPress={() => {
                setModalVisible(false);
              }} // onRequestClose 대신 onBackButtonPress 사용
              backdropTransitionOutTiming={0}
              statusBarTranslucent={true} // 이 옵션을 사용하여 상태 표시줄을 숨깁니다.
            >
              <GetCardModal nextScreen="WordGame3" word={word}></GetCardModal>
            </Modal>
            <ContentContainer>
              <DroppableContainer>
                <ACardLine>
                  {shuffledDropList.slice(0, 3).map(choice => {
                    return (
                      <ACardFirst key={choice.word.index}>
                        <Droppable
                          onEnter={() => {
                            // console.log("들어옴!!");
                          }}
                          onDrop={({ payload }) => {
                            if (choice.done) {
                              return;
                            }
                            if (choice.word.name === payload.name) {
                              // console.log("정답!!!", payload);
                              deleteUsedCard(payload); //리스트에서 빼기
                              checkDoneCard(choice); //wordMiniCard에 전달하기
                            }
                          }}
                        >
                          {({ active, viewProps }) => {
                            return (
                              <DroppableCard {...viewProps}>
                                <WordMiniCard word={choice.word} done={choice.done} />
                              </DroppableCard>
                            );
                          }}
                        </Droppable>
                      </ACardFirst>
                    );
                  })}
                </ACardLine>
                <ACardLine>
                  {shuffledDropList.slice(3, 6).map(choice => {
                    return (
                      <ACardSecond key={choice.word.index}>
                        <Droppable
                          onEnter={() => {
                            // console.log("들어옴!!");
                          }}
                          onDrop={({ payload }) => {
                            if (choice.done) {
                              return;
                            }
                            if (choice.word.name === payload.name) {
                              // console.log("정답!!!", payload);
                              deleteUsedCard(payload); //리스트에서 빼기
                              checkDoneCard(choice); //wordMiniCard에 전달하기
                            }
                          }}
                        >
                          {({ active, viewProps }) => {
                            return (
                              <DroppableCard {...viewProps}>
                                <WordMiniCard word={choice.word} done={choice.done} />
                              </DroppableCard>
                            );
                          }}
                        </Droppable>
                      </ACardSecond>
                    );
                  })}
                </ACardLine>
              </DroppableContainer>
              <DraggableContainer>
                {shuffledDragList.map((dragCard, index) => {
                  return (
                    <MinicardContainer key={dragCard.index}>
                      <MiniCard
                        word={dragCard}
                        isFront={true}
                        isTouchable={false}
                        onClick={getMiniCardInfo}
                        draggable={Draggable}
                      />
                    </MinicardContainer>
                  );
                })}
              </DraggableContainer>
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

//내용 컨테이너
const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

//우측 draggable 카드들 영역
const DraggableContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: aqua; */
`;

//좌측 droppable 영역
const DroppableContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
`;

//answer card의 한 줄
const ACardLine = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

//answer card 하나
const ACard = styled.View`
  width: 25%;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

//answer card 윗줄
const ACardFirst = styled(ACard)`
  margin-bottom: 10px;
`;

//answer card 아랫줄
const ACardSecond = styled(ACard)`
  margin-top: 10px;
`;

//draggable의 minicard 영역
const MinicardContainer = styled.View`
  position: absolute;
  top: -60;
  left: 0;
  /* z-index: 1;
  transform: rotate(3deg); */
`;

const DroppableCard = styled(Animated.View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
