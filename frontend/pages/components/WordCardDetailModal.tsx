import React, { useEffect } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
import { IWord } from "../../types/types";
import { Audio } from "expo-av";

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

function getSoundFile(wordName: string): any {
  switch (wordName) {
    case "사과":
      return require("../../assets/wav/apple.wav");
    case "오렌지":
      return require("../../assets/wav/orange.wav");
    case "가위":
      return require("../../assets/wav/scissors.wav");
    case "강아지":
      return require("../../assets/wav/dog.wav");
    case "고양이":
      return require("../../assets/wav/cat.wav");
    case "그릇":
      return require("../../assets/wav/bowl.wav");
    case "달팽이":
      return require("../../assets/wav/snail.wav");
    case "딸기":
      return require("../../assets/wav/strawberry.wav");
    case "마우스":
      return require("../../assets/wav/mouse.wav");
    case "만년필":
      return require("../../assets/wav/fountain_pen.wav");
    case "멜론":
      return require("../../assets/wav/melon.wav");
    case "바나나":
      return require("../../assets/wav/banana.wav");
    case "복숭아":
      return require("../../assets/wav/peach.wav");
    case "사자":
      return require("../../assets/wav/lion.wav");
    case "수박":
      return require("../../assets/wav/watermelon.wav");
    case "연필":
      return require("../../assets/wav/pencil.wav");
    case "원숭이":
      return require("../../assets/wav/monkey.wav");
    case "의자":
      return require("../../assets/wav/chair.wav");
    case "지우개":
      return require("../../assets/wav/eraser.wav");
    case "체리":
      return require("../../assets/wav/cherry.wav");
    case "코끼리":
      return require("../../assets/wav/elephant.wav");
    case "키보드":
      return require("../../assets/wav/keyboard.wav");
    case "토끼":
      return require("../../assets/wav/rabbit.wav");
    case "판다":
      return require("../../assets/wav/panda.wav");
    case "토마토":
      return require("../../assets/wav/tomato.wav");
    case "포도":
      return require("../../assets/wav/grape.wav");
    case "컵":
      return require("../../assets/wav/cup.wav");
    case "새":
      return require("../../assets/wav/bird.wav");
    case "책상":
      return require("../../assets/wav/desk.wav");
    case "개구리":
      return require("../../assets/wav/frog.wav");
    case "안경":
      return require("../../assets/wav/glasses.wav");
    case "노트북":
      return require("../../assets/wav/laptop.wav");
    case "문어":
      return require("../../assets/wav/octopus.wav");
    case "신발":
      return require("../../assets/wav/shoes.wav");
    case "칫솔":
      return require("../../assets/wav/toothbrush.wav");
    case "거북":
      return require("../../assets/wav/turtle.wav");
    default:
      // 기본값 처리 (필요에 따라 추가)
      return null;
  }
}

const WordCardDetailModal: React.FC<WordCardDetailModalProps> = ({ isVisible, onClose, item }) => {
  useEffect(() => {
    // 페이지가 렌더링될 때 소리를 자동으로 재생
    const playSound = async () => {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(getSoundFile(item.name));
        await soundObject.playAsync();
      } catch (error) {
        console.error("소리 재생 중 오류 발생:", error);
      }
    };

    // 컴포넌트가 마운트될 때 소리를 재생
    playSound();
  }, [item]);
  return (
    <ModalContainer>
      <ModalLeft>
        <WordCardDesign
          source={item.name === "바나나" ? cardDesign2 : cardDesign1}
          resizeMode="stretch"
        >
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

              <Stamp>
                {item.name === "바나나" ? (
                  <StampImg
                    source={require("../../assets/button/stamp.png")}
                    resizeMode="contain"
                  ></StampImg>
                ) : null}
              </Stamp>
              <Stamp>
                {item.name === "바나나" ? (
                  <StampImg
                    source={require("../../assets/button/stamp.png")}
                    resizeMode="contain"
                  ></StampImg>
                ) : null}
              </Stamp>
            </StampRow>

            <StampRow>
              <Stamp>
                {item.name === "바나나" ? (
                  <StampImg
                    source={require("../../assets/button/stamp.png")}
                    resizeMode="contain"
                  ></StampImg>
                ) : null}
              </Stamp>
              <Stamp>
                {item.name === "바나나" ? (
                  <StampImg
                    source={require("../../assets/button/stamp.png")}
                    resizeMode="contain"
                  ></StampImg>
                ) : null}
              </Stamp>
              <Stamp>
                {item.name === "바나나" ? (
                  <StampImg
                    source={require("../../assets/button/stamp.png")}
                    resizeMode="contain"
                  ></StampImg>
                ) : null}
              </Stamp>
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
