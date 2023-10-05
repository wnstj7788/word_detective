import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  TouchableHighlight,
  Platform,
  Vibration,
} from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation, RouteProp, useRoute, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import QuestionCard from "../components/QuestionCard";
import { ICard } from "../../types/types";
import GameClearModal from "../components/GameClearModal";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import hangul from "hangul-js";
import { shakeAnimation2 } from "../../animation/animation";
import GetCardModal from "../components/GetCardModal";
import { strokes } from "./LetterCanvas3";
import { getRandomInt } from "../../utils/utils";
import getBackgroundImage from "../components/BackGroundImageSelect";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "LetterGame2">;

const Word1Type: ICard = {
  pictureHidden: false,
  wordHidden: false,
  wordHiddenIndx: 1,
};
const LetterGame2 = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params;
  const [answer, setAnswer] = useState("");
  const [choiceList, setChoiceList] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const backgroundImage = getBackgroundImage(word.category);

  // const choiceList = ["ㅅ", "ㅜ", "ㄴ", "ㅐ", "ㅓ", "ㅂ", "ㄷ", "ㅠ"];
  //정답 단어에서 어디가 빈칸일지 랜덤으로 정하기
  useEffect(() => {
    //word가 변경되었는데 answer 세팅이 아직이라면 세팅해주기
    if (answer === "") {
      const letters: string[][] = hangul.disassemble(word.name, true); //단어를 ㅅ ㅏ ㄱ ㅗ ㅏ 로 쪼갬
      const answerLetter = letters[0][0]; //자모음 중 비어있는 값(정답) 무조건 첫 자음으로
      setAnswer(answerLetter);
    }
    //랜덤으로 7개, 정답 1개 뽑아 선지 만들기
  }, [word]);

  useEffect(() => {
    const letterList = Object.keys(strokes); //strokes에서 key배열 = ㄱㄴㄷㄹ..ㅏㅑㅓㅕ 배열
    setChoiceList(randomLetter(letterList)); //랜덤으로 뽑아서 넣기
  }, [answer]);

  //배열에서 랜덤하게 7개 뽑아서 세팅하기
  const randomLetter = (originArray: string[]): string[] => {
    let cnt = 0;
    let tmpArray: string[] = [];
    const answerIdx = getRandomInt(0, 8); // 정답이 위치할 인덱스
    console.log("정답;;; : ", answer);
    console.log("정답 위치: ", answerIdx);
    while (cnt < 8) {
      if (cnt === answerIdx) {
        tmpArray.push(answer);
        cnt = cnt + 1;
      } else {
        let choiceIndex = getRandomInt(0, originArray.length);
        let choice = originArray[choiceIndex];
        //choiceList에 없고 answer와도 다르면 넣어주기
        if (!choiceList.includes(choice) && choice != answer) {
          tmpArray.push(choice);
          cnt = cnt + 1;
        }
      }
      console.log(tmpArray);
    }
    return tmpArray;
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleCardClick = (choice: string, index: number) => {
    if (choice === answer) {
      openModal();
    } else {
      Vibration.vibrate(350);
      shakeAnimation2(index, animValues);
    }
  };
  const syllable = [...word.name];
  const animValues = choiceList.map(() => new Animated.Value(0));

  return (
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
        <GameClearModal nextScreen="LetterGame3" word={word}></GameClearModal>
      </Modal>
      <ContentContainer>
        <QCardContainer>
          <QuestionCard word={word} type={Word1Type} />
        </QCardContainer>
        <CardsContainer>
          <BCardContainer>
            {/* {syllable.map((syll, index) => {
              return (
                <BCard>
                  <StyledText>{syll}</StyledText>
                </BCard>
              );
            })} */}
            <BCard>
              <StyledText>{answer}</StyledText>
            </BCard>
          </BCardContainer>
          <ACardContainer>
            {choiceList.map((choice, index) => {
              return (
                <ACardWrapper onPress={() => handleCardClick(choice, index)} key={index}>
                  <ACard
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
                    <StyledText>{choice}</StyledText>
                  </ACard>
                </ACardWrapper>
              );
            })}
          </ACardContainer>
        </CardsContainer>
      </ContentContainer>
    </ContainerBg>
  );
};
const ACardWrapper = styled.TouchableHighlight`
  width: 17%;
  aspect-ratio: 1;
  margin: 2.9%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
const BCardContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 3%;
`;
const CardsContainer = styled.View`
  flex: 2;
  flex-direction: column;
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
  width: 100%;
`;

const ACard = Animated.createAnimatedComponent(styled.View`
  width: 100%;
  aspect-ratio: 1;
  background-color: white;
  margin: 2%;
  ${Platform.OS === "android" &&
  `
    elevation: 5;
  `}
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`);
const BCard = styled.View`
  margin-left: 2%;
`;
const StyledText = styled.Text`
  font-size: 70px;
  font-family: "BMJUA";
  text-align: center;
  justify-content: center;
`;
const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default LetterGame2;
