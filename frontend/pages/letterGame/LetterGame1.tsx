import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  TouchableHighlight,
  Vibration,
  Platform,
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
import React, { useState } from "react";
import { shakeAnimation1 } from "../../animation/animation";
import getBackgroundImage from "../components/BackGroundImageSelect";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "WordGame1">;

//통글씨인식 첫번째문제 : 그림 맞추기
const Word1Type: ICard = {
  pictureHidden: false, //그림 숨기기
  wordHidden: true, //글씨는 숨기지 않음
  wordHiddenIndx: 0, //글씨를 숨긴다면 몇번째 인덱스의 글씨를 숨기는지(0부터시작)
};
const number = Word1Type.wordHiddenIndx;
interface ShakeAnimations {
  [key: number]: Animated.Value;
}
const LetterGame1 = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params;
  const Word1Type: ICard = {
    pictureHidden: false,
    wordHidden: true,
    wordHiddenIndx: word.name.length - 1, // 맨 마지막 문자의 인덱스를 설정
  };
  const number = Word1Type.wordHiddenIndx;
  const backgroundImage = getBackgroundImage(word.category);
  //선지 8개의 배열
  //TODO: api 로 랜덤 뽑는 기능 받아와서 채우기
  const choiceList = [
    "과",
    "나",
    "리",
    "도",
    "론",
    "지",
    "아",
    "기",
    "토",
    "론",
    "이",
    "닭",
    "지",
    "래",
    "리",
    "자",
    "어",
    "다",
    "지",
    "끼",
    "자",
    "터",
    "상",
    "개",
    "경",
    "컵",
    "필",
    "위",
    "발",
    "솔",
  ];
  const [shakeAnimations, setShakeAnimations] = useState<ShakeAnimations>(
    choiceList.reduce<ShakeAnimations>((acc, _, index: number) => {
      acc[index] = new Animated.Value(0);
      return acc;
    }, {})
  );

  const handleCardClick = (choice: string, index: number) => {
    const characters = [...word.name];
    console.log(characters[number]);
    if (choice === characters[number]) {
      openModal();
    } else {
      shakeAnimation1(index, shakeAnimations);
      Vibration.vibrate(350);
    }
  };
  const currentCharacter = word.name[word.name.length - 1]; // 현재 문자
  const remainingChoices = choiceList.filter(choice => choice !== currentCharacter); // 현재 문자를 제외한 배열

  // 배열을 랜덤으로 섞는 함수
  // @ts-ignore
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  // @ts-ignore
  const getSevenRandomChoices = array => {
    return shuffle(array).slice(0, 7);
  };

  const sevenRandomChoices = getSevenRandomChoices(remainingChoices);
  const combinedChoices = [currentCharacter, ...sevenRandomChoices];
  const finalChoiceList = shuffle(combinedChoices);

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  console.log(currentCharacter);
  if (isLoaded) {
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
          <GameClearModal nextScreen="LetterGame2" word={word}></GameClearModal>
        </Modal>
        <ContentContainer>
          <QCardContainer>
            <QuestionCard word={word} type={Word1Type} />
          </QCardContainer>
          <ACardContainer>
            {finalChoiceList.map((choice: string, index: number) => {

              return (
                <ACardWrapper
                  style={{ borderRadius: 30 }}
                  activeOpacity={0.6}
                  underlayColor={"white"}
                  onPress={() => handleCardClick(choice, index)}
                >
                  <ACard
                    key={index}
                    style={{ transform: [{ translateX: shakeAnimations[index] }] }}
                  >
                    <StyledText>{choice}</StyledText>
                  </ACard>
                </ACardWrapper>
              );
            })}
          </ACardContainer>
        </ContentContainer>
      </ContainerBg>
    );
  } else {
    return null;
  }
};
export default LetterGame1;

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
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const ACardWrapper = styled.TouchableHighlight`
  width: 20%;
  aspect-ratio: 1;
  margin: 2.9%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
const ACard = styled(Animated.View)`
  width: 100%;
  aspect-ratio: 1;
  background-color: white;
  //margin: 2.9%;
  ${Platform.OS === "android" &&
  `
    elevation: 5;
  `}
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 70px;
  font-family: "BMJUA";
  text-align: center;
  justify-content: center;
`;
