import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
import { IWord } from "../../types/types";
interface WordCardDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  item: IWord;
}
//카드 배경
const cardDesign1 = require("../../assets/card/wordCard1.png");
//진화 카드아래 코드라네영  6랩 바나나 적용해주세용
const cardDesign2 = require("../../assets/card/cardAdvanced2.png");

const screenWidth = Dimensions.get("window").width;
const height = screenWidth * 0.4;
const width = (height / 5) * 3.8;
const height2 = screenWidth * 0.5;
const width2 = (height / 3) * 3.8;

const WordCardDetailModal: React.FC<WordCardDetailModalProps> = ({ isVisible, onClose, item }) => {
  return (
    <ModalContainer>
      <ModalLeft>
        <WordCardDesign source={cardDesign1} resizeMode="stretch">
          <WordImg source={{ uri: item.url }}></WordImg>
        </WordCardDesign>
      </ModalLeft>

      <ModalRight>
        <WordStampDesign source={require("../../assets/card/wordCard2.png")} resizeMode="stretch">
          <WordTitle>{item.name}</WordTitle>
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
  width: 14%;
  height: 14%;
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
  width: 60%;
  height: 40%;
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
`;
