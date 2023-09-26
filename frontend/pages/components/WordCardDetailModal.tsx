import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
interface WordCardDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  item: string;
}
// 화면의 가로 길이를 가져옵니다.
const screenWidth = Dimensions.get("window").width;
// 화면의 가로 길이를 기반으로 원하는 비율로 width와 height를 계산합니다.
const height = screenWidth * 0.4; // 화면 가로 길이의 70%
const width = (height / 5) * 3.8; // 3:4 비율로 계산

const height2 = screenWidth * 0.5;
const width2 = (height / 3) * 3.8;

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
        <WordStampDesign source={require("../../assets/card/wordCard2.png")} resizeMode="stretch">
          <WordTitle>{item}</WordTitle>
          <ModalCloseBtn onPress={onClose}>
            <ModalCloseBtnImg source={require("../../assets/etc/closeImg.png")}></ModalCloseBtnImg>
          </ModalCloseBtn>
          <StampWrap>
            <StampRow>
              <Stamp>
                <StampImg
                  source={require("../../assets/button/stamp.png")}
                  resizeMode="contain"
                ></StampImg>
              </Stamp>

              <Stamp></Stamp>
              <Stamp></Stamp>
            </StampRow>

            <StampRow>
              <Stamp></Stamp>
              <Stamp></Stamp>
              <Stamp></Stamp>
            </StampRow>
          </StampWrap>
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
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const WordCardDesign = styled.ImageBackground`
  width: ${width}px;
  height: ${height}px;
  position: absolute;
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
  flex: 1;
`;
const WordStampDesign = styled.ImageBackground`
  width: ${width2}px;
  height: ${height2}px;
  justify-content: center;
  align-items: center;
  right: 29px;
`;
const ModalCloseBtn = styled.TouchableOpacity`
<<<<<<< Updated upstream
  width: 14%;
  height: 14%;
=======
  width: 10%;
  height: 10%;
>>>>>>> Stashed changes
  position: absolute;
  top: 80px;
  right: 70px;
`;

const ModalCloseBtnImg = styled.Image`
  width: 100%;
  height: 100%;
`;

const WordTitle = styled.Text`
  font-size: 60px;
  color: #fcceba;
  font-family: "BMJUA";
  text-align: center;
  text-shadow-color: black;
  text-shadow-offset: 2px 2px;
  text-shadow-radius: 2px;
`;

const StampWrap = styled.View`
<<<<<<< Updated upstream
  width: 60%;
  height: 40%;
=======
  width: 40%;
  height: 30%;
>>>>>>> Stashed changes
  top: 20px;
`;

const StampRow = styled.View`
  flex: 1;
  flex-direction: row;
`;
const Stamp = styled.TouchableOpacity`
  flex: 1;
  border: 4px dashed brown;
  margin: 10px;
  background-color: transparent;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const StampImg = styled.Image`
  width: 100%;
  height: 100%;

  border: 0.5px solid black;

`;
