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
        <WordCardDesign source={require("../../assets/card/wordCard1.png")} resizeMode="stretch">
          <WordImg source={getImage(item)}></WordImg>
        </WordCardDesign>
      </ModalLeft>

      <ModalRight>
        <WordStampDesign source={require("../../assets/card/wordCard2.png")}>
          <WordTitle>{item}</WordTitle>
          <ModalCloseBtn onPress={onClose}>
            <ModalCloseBtnImg source={require("../../assets/etc/closeImg.png")}></ModalCloseBtnImg>
          </ModalCloseBtn>
        </WordStampDesign>
      </ModalRight>
    </ModalContainer>
  );
};

export default WordCardDetailModal;

// Modal Container
const ModalContainer = styled.View`
  flex-direction: row;
`;

// Modal Container 왼쪽 영역 ( 카드 이미지 )
const ModalLeft = styled.View`
  border-radius: 10px;
  padding: 20px;
  height: 300px;
  border-radius: 0px;
  flex: 3;
  border: 5px solid black;
`;

const WordCardDesign = styled.ImageBackground`
  width: 270px;
  height: 350px;
  position: absolute;
  top: -20px;
  left: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const WordImg = styled.Image`
  width: 65%;
  height: 50%;
  z-index: 3;
  transform: rotate(10deg);
`;

// Modal Container 오른쪽 영역 ( 도장 )
const ModalRight = styled.View`
  border-radius: 0px;
  flex: 3;
  border-radius: 10px;
  padding: 20px;
  border-radius: 0px;
  border: 5px solid black;
`;
const WordStampDesign = styled.ImageBackground`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;
const ModalCloseBtn = styled.TouchableOpacity`
  width: 20%;
  height: 20%;
  border: 1px solid black;
  justify-content: flex-end;
`;

const ModalCloseBtnImg = styled.Image`
  width: 100%;
  height: 100%;
`;

const WordTitle = styled.Text`
  border: 1px solid blue;
  font-size: 60px;
  font-family: "BMJUA";
  text-align: center;
  text-shadow-color: white; /* 텍스트 테두리 색상 */
  text-shadow-offset: 2px 2px; /* 텍스트 테두리 오프셋 (x, y) */
  text-shadow-radius: 2px; /* 텍스트 테두리 반지름 */
`;
