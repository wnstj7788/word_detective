import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
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
  const {word} = route.params.word
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const choiceList = ["ㅅ", "ㅜ", "ㄴ", "ㅐ", "ㅓ", "ㅂ", "ㄷ", "ㅠ"];

  const closeModal = () =>{
    setModalVisible(false)
  }
  const handleCardClick = (choice: string) => {
    // Do something with the choice
    if(choice==="ㅅ"){
      openModal();
    }else{

    }
  };
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
        <GameClearModal nextScreen="LetterLobby" word={word.word}></GameClearModal>

      </Modal>
      <ContentContainer>
        <QCardContainer>
          <QuestionCard word={word} type={Word1Type} />
        </QCardContainer>
        <CardsContainer>
          <BCardContainer>


          </BCardContainer>
        <ACardContainer>
          {choiceList.map((choice, index) => {
            return (
              <TouchableOpacity onPress={() => handleCardClick(choice)}>
                <ACard key={index}>
                  <StyledText>{choice}</StyledText>
                </ACard>
              </TouchableOpacity>
            );
          })}
        </ACardContainer>
        </CardsContainer>
      </ContentContainer>
    </ContainerBg>
  )
}
const BCardContainer = styled.View`

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

const ACard = styled.View`
  width: 20%;
  aspect-ratio: 1;
  background-color: white;
  margin: 2.9%;
  elevation: 5;
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
const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default LetterGame2;
