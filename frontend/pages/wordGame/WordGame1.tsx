import {
  Animated,
  Vibration,
  View,
  Text,
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
import MiniCard from "../components/MiniCard";
import { ICard, IWord } from "../../types/types";
import { initialWord } from "../../common/initialType";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import GameClearModal from "../components/GameClearModal";
import { shuffleArray } from "../../utils/utils";
import { shakeAnimation2 } from "../../animation/animation";
import { WordAPI } from "../../utils/api";
import getBackgroundImage from "../components/BackGroundImageSelect";
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
  const { word } = route.params; //목표 단어

  const [clickedWord, setClickedWord] = useState<IWord>(initialWord); //클릭한 단어 정보
  const [isModalVisible, setModalVisible] = useState(false); //clear modal관련
  const [shuffledChoiceList, setShuffledChoiceList] = useState<IWord[]>([]); //섞은 리스트
  const backgroundImage = getBackgroundImage(word.category);
  useEffect(() => {
    let choiceList: IWord[] = [];
    //선지 8개 배열 choiceList에
    const promise = WordAPI.getRandom(word.name, 2, 6);
    promise
      .then(res => {
        choiceList = res.data;
      })
      .then(() => {
        let randList = shuffleArray(choiceList);
        randList.map((word, index) => {
          word.index = index;
        });
        return randList;
      })
      .then(res => {
        setShuffledChoiceList(res);
      });
  }, []);

  let animValues = shuffledChoiceList.map(() => new Animated.Value(0));
  useEffect(() => {
    animValues = shuffledChoiceList.map(() => new Animated.Value(0));
  }, [shuffledChoiceList]);

  //클릭하면 정답인지 확인
  useEffect(() => {
    // shuffleArray 및 animValues가 초기화된 후
    if (shuffledChoiceList.length > 0) {
      if (checkAnswer()) {
        setModalVisible(true);
      } else {
        //틀림
        shakeAnimation2(clickedWord.index ?? 0, animValues);
        Vibration.vibrate(350);
      }
    }
  }, [clickedWord]);

  //미니카드 클릭했을 때 단어값 전달받기
  const getMiniCardInfo = (word: IWord) => {
    setClickedWord(word);
  };

  //클릭한 카드가 목표 단어와 같은지 확인하는 함수
  const checkAnswer = () => (word.id === clickedWord.id ? true : false);

  if (isLoaded) {
    return (
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
            <GameClearModal nextScreen="WordGame2" word={word}></GameClearModal>
          </Modal>
          <ContentContainer>
            <QCardContainer>
              <QuestionCard word={word} type={Word1Type} />
            </QCardContainer>
            <ACardContainer>
              <ACardLine>
                {shuffledChoiceList.slice(0, 4).map((choice, index) => {
                  return (
                    <ACardFirst
                      key={index}
                      style={{
                        transform: [
                          {
                            rotate: animValues[index].interpolate({
                              inputRange: [-1, 1],
                              outputRange: ["-5deg", "5deg"],
                            }),
                          },
                        ],
                      }}
                    >
                      <MiniCard
                        word={choice}
                        isFront={true}
                        isTouchable={true}
                        onClick={getMiniCardInfo}
                      />
                    </ACardFirst>
                  );
                })}
              </ACardLine>
              <ACardLine>
                {shuffledChoiceList.slice(4, 8).map((choice, index) => {
                  return (
                    <ACardSecond
                      key={index}
                      style={{
                        transform: [
                          {
                            rotate: animValues[index + 4].interpolate({
                              inputRange: [-1, 1],
                              outputRange: ["-5deg", "5deg"],
                            }),
                          },
                        ],
                      }}
                    >
                      <MiniCard
                        word={choice}
                        isFront={true}
                        isTouchable={true}
                        onClick={getMiniCardInfo}
                      />
                    </ACardSecond>
                  );
                })}
              </ACardLine>
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

const ACardFirst = Animated.createAnimatedComponent(styled(ACard)`
  margin-bottom: 10px;
`);

const ACardSecond = Animated.createAnimatedComponent(styled(ACard)`
  margin-top: 10px;
`);
