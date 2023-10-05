import {
  View,
  Text,
  Image,
  ImageBackground,
  Platform,
  Dimensions,
  Animated,
  Vibration,
} from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../etc/Header";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import Canvas from "./Canvas";
import QuestionCard from "../components/QuestionCard";
import MiniCard from "../components/MiniCard";
import { ICard } from "../../types/types";
import OXCard from "../components/OXCard";
import { useState, useEffect } from "react";
import GameClearModal from "../components/GameClearModal";
import Modal from "react-native-modal";
import { WordAPI } from "../../utils/api";
import { shuffleArray } from "../../utils/utils";
import constructWithOptions from "styled-components/native/dist/constructors/constructWithOptions";
import { initialWord } from "../../common/initialType";
import getBackgroundImage from "../components/BackGroundImageSelect";
import { shakeAnimation2 } from "../../animation/animation";
import { IWord } from "../../types/types";
import Boom from "./boom";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "PictureGame2">;
const { width, height } = Dimensions.get("window");
const squareSize = width * 0.18;
const miniCardSize = width * 0.18;
const PictureGame2 = () => {
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

  // 배경
  const backgroundImage = getBackgroundImage(word.category);

  const [shuffledChoiceList, setShuffledChoiceList] = useState<IWord[]>([initialWord]); //섞은 리스트
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
  useEffect(() => {
    console.log(shuffledChoiceList);
  });
  // 모달
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  // 로티
  const [showBoom, setShowBoom] = useState(false); // 상태 추가
  const openBoom = () => {
    setShowBoom(true);
    setTimeout(() => {
      setShowBoom(false);
    }, 1000); // 1초 후에 setShowBoom(false)를 호출하여 1초 동안 보이고 사라지도록 함
  };
  // 애니메이션
  let animValues = shuffledChoiceList.map(() => new Animated.Value(0));
  useEffect(() => {
    animValues = shuffledChoiceList.map(() => new Animated.Value(0));
  }, [shuffledChoiceList]);

  const oAnswerCheck = () => {
    if (word.name === shuffledChoiceList[count].name) {
      if (count !== 7) {
        setCount(prevCount => {
          return prevCount + 1;
        });
        openBoom(); // 맞았을 때 Boom 보이기
      } else {
        openModal();
      }
    } else {
      shakeAnimation2(count, animValues);
      Vibration.vibrate(350);
    }
  };

  const xAnswerCheck = () => {
    if (word.name != shuffledChoiceList[count].name) {
      if (count !== 7) {
        setCount(prevCount => {
          return prevCount + 1;
        });
        openBoom(); // 맞았을 때 Boom 보이기
      } else {
        openModal();
      }
    } else {
      shakeAnimation2(count, animValues);
      Vibration.vibrate(350);
    }
  };

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg source={backgroundImage}>
          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropColor="rgba(0, 0, 0, 0.5)"
            isVisible={isModalVisible}
            onBackButtonPress={closeModal} // onRequestClose 대신 onBackButtonPress 사용
            backdropTransitionOutTiming={0}
            statusBarTranslucent={true} // 이 옵션을 사용하여 상태 표시줄을 숨깁니다.
          >
            <GameClearModal nextScreen="PictureGame3" word={word}></GameClearModal>
          </Modal>
          <ContentContainer>
            <BoomContainer>{showBoom && <Boom />}</BoomContainer>
            <QCardContainer>
              <QCardContainer>
                <QuestionCard word={word} type={Word1Type} />
              </QCardContainer>
            </QCardContainer>
            <ACardContainer>
              <MiniCardContainer>
                <BackGroundSquare />
                <MiniCard
                  word={shuffledChoiceList[count]}
                  isFront={true}
                  isTouchable={false}
                  onClick={() => {
                    console.log();
                  }}
                />
              </MiniCardContainer>
              <OXCardContainer>
                <OXOneCard>
                  <OXCard word={word} isFront={true} onPress={() => oAnswerCheck()} />
                </OXOneCard>
                <OXOneCard>
                  <OXCard word={word} isFront={false} onPress={() => xAnswerCheck()} />
                </OXOneCard>
              </OXCardContainer>
            </ACardContainer>
          </ContentContainer>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default PictureGame2;

const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const BoomContainer = styled.View`
  position: absolute;
  top: -50%;
  left: 20%;
`;
const QCardContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const OXOneCard = styled.View`
  margin: 10%;
`;
const ACardContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;
const OXCardContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const MiniCardContainer = styled.View`
  margin-top: 5%;
  position: relative;
`;
const BackGroundSquare = styled.View`
  position: absolute;
  width: 27%;
  aspect-ratio: 1;
  border-radius: 20px;
  background-color: white;
  transform: rotate(-10deg);
  z-index: -1;
  ${Platform.OS === "android" &&
  `
    elevation: 5;
  `}
`;
