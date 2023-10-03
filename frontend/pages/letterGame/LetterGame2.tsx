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
import { strokes } from "./LetterCanvas3";
import { getRandomInt } from "../../utils/utils";
import store from "../../store/store";

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
  // const choiceList = ["ㅅ", "ㅜ", "ㄴ", "ㅐ", "ㅓ", "ㅂ", "ㄷ", "ㅠ"];
  //정답 단어에서 어디가 빈칸일지 랜덤으로 정하기
  useEffect(() => {
    const letters: string[][] = hangul.disassemble(word.name, true); //단어를 ㅅ ㅏ ㄱ ㅗ ㅏ 로 쪼갬
    const answerIndex1 = getRandomInt(0, letters.length);
    const answerIndex2 = getRandomInt(0, letters[answerIndex1].length);
    const answerLetter = letters[answerIndex1][answerIndex2]; //자모음 중 비어있는 값(정답)
    setAnswer(answerLetter);
    //랜덤으로 7개, 정답 1개 뽑기
    const letterList = Object.keys(strokes); //strokes에서 key배열 = ㄱㄴㄷㄹ..ㅏㅑㅓㅕ 배열
    const choiceList: string[] = []; //랜덤으로 뽑아서 여기에 넣을 것
    setChoiceList(randomLetter(letterList));
  }, [word]);

  //배열에서 랜덤하게 7개 뽑아서 세팅하기
  const randomLetter = (originArray: string[]): string[] => {
    let cnt = 0;
    let tmpArray: string[] = [];
    while (cnt < 8) {
      let choiceIndex = getRandomInt(0, originArray.length);
      let choice = originArray[choiceIndex];
      //choiceList에 없고 answer와도 다르면 넣어주기
      if (!choiceList.includes(choice) && choice != answer) {
        tmpArray.push(choice);
        cnt = cnt + 1;
      }
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
    <ContainerBg source={require("../../assets/background/game/fruit.png")}>
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
                <ACardWrapper onPress={() => handleCardClick(choice, index)}>
                  <ACard
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
