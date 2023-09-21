import { View, Text, Image, ImageBackground, TouchableOpacity, Animated, TouchableHighlight, Platform } from "react-native";
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
import hangul from "hangul-js";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>
type StagePageRouteProp = RouteProp<RootStackParamList, "LetterGame2">;
const Word1Type: ICard={
  pictureHidden : false,
  wordHidden: false,
  wordHiddenIndx:1,
}
const LetterGame2 = () =>{

  const isLoaded=useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const {word} = route.params
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const choiceList = ["ㅅ", "ㅜ", "ㄴ", "ㅐ", "ㅓ", "ㅂ", "ㄷ", "ㅠ"];
  const shakeAnimation = (index: number) => {
    const rotate = animValues[index];
    Animated.sequence([
      Animated.timing(rotate, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const closeModal = () =>{
    setModalVisible(false)
  }
  const handleCardClick = (choice: string, index: number) => {
    if (choice === "ㅅ") {
      openModal();
    } else {
      shakeAnimation(index);
    }
  };
  console.log(word)
  const syllable=[...word.name];
  const animValues = choiceList.map(() => new Animated.Value(0));

  return(
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
        <GameClearModal nextScreen="LetterLobby" word={word}></GameClearModal>

      </Modal>
      <ContentContainer>
        <QCardContainer>
          <QuestionCard word={word} type={Word1Type} />
        </QCardContainer>
        <CardsContainer>
          <BCardContainer>
            {syllable.map((syll, index)=>{
              return(
                <BCard>
                  <StyledText>{syll}</StyledText>
                </BCard>
              )
            })}

          </BCardContainer>
        <ACardContainer>
          {choiceList.map((choice, index) => {
            return (
              <ACardWrapper onPress={() => handleCardClick(choice, index)}>
                <ACard key={index} style={{
                  transform: [
                    {
                      rotate: animValues[index].interpolate({
                        inputRange: [-1, 1],
                        outputRange: ["-5deg", "5deg"],
                      }),
                    },
                  ],
                }}>
                  <StyledText>{choice}</StyledText>
                </ACard>
              </ACardWrapper>
            );
          })}
        </ACardContainer>
        </CardsContainer>
      </ContentContainer>
    </ContainerBg>
  )
}
const ACardWrapper = styled.TouchableHighlight`
  width: 20%;
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
  flex : 2;
  flex-direction : column;
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

const ACard = Animated.createAnimatedComponent(styled.View`
  
  width: 100%;
  aspect-ratio: 1;
  background-color: white;
  margin: 2.9%;
  ${Platform.OS === 'android' && `
    elevation: 5;
  `}
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`);
const BCard=styled.View`
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
