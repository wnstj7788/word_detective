import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
interface WordCardDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  item: string;
}

const WordCardDetailModal: React.FC<WordCardDetailModalProps> = ({ isVisible, onClose, item }) => {
  function getImage(name: string) {
    switch (name) {
      case "사과":
        return require("../../assets/card/fruit/apple.png");
      case "오렌지":
        return require("../../assets/card/fruit/orange.png");
      case "수박":
        return require("../../assets/card/fruit/watermelon.png");
      case "토마토":
        return require("../../assets/card/fruit/tomato.png");
      case "체리":
        return require("../../assets/card/fruit/cherry.png");
      case "바나나":
        return require("../../assets/card/fruit/banana.png");
      case "딸기":
        return require("../../assets/card/fruit/strawberry.png");
      case "고양이":
        return require("../../assets/card/animal/cat.png");
    }
  }

  return (
    <ModalContainer>
      <ModalLeft>
        {/* <WordTitle>{item}</WordTitle> */}
        <WordCardCard source={require("../../assets/card/wordCard1.png")} resizeMode="stretch">
          <WordImg source={getImage(item)}></WordImg>
        </WordCardCard>
        {/* <TouchableOpacity onPress={onClose}>
          <ModalCloseText>닫기</ModalCloseText>
        </TouchableOpacity> */}
      </ModalLeft>
      <ModalRight></ModalRight>
    </ModalContainer>
  );
};

export default WordCardDetailModal;

const ModalContainer = styled.View`
  flex-direction: row;
`;

const ModalLeft = styled.View`
  border-radius: 10px;
  padding: 20px;
  height: 300px;
  border-radius: 0px;
  flex: 3;
`;

const WordCardCard = styled.ImageBackground`
  width: 270px;
  height: 350px;
  position: absolute;
  top: -20px;
  left: 30px;
`;
const WordImg = styled.Image`
  width: 65%;
  height: 50%;
  top: 70px;
  left: 50px;
  z-index: 3;
  transform: rotate(10deg);
`;

const ModalRight = styled.View`
  background-color: coral;
  height: 300px;
  border-radius: 0px;
  flex: 2;
`;

const WordTitle = styled.Text`
  font-size: 120px;
  font-family: "BMJUA";
`;

const ModalCloseText = styled.Text``;
