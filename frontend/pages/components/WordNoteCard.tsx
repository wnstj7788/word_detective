import React, { useState } from "react";
import { Text, FlatList, Image, TouchableOpacity, View, Modal } from "react-native";
import { BtnContainer } from "../../styles/globalStyles";
import styled from "styled-components/native";
import { IStage } from "../../types/types";
import { current } from "@reduxjs/toolkit";

// 모달
import WordCardDetailModal from "./WordCardDetailModal";
const WordNoteCard = (props: { categoryType: number; callbackprop(data: string): void }) => {
  let currentWordList;

  const wordList = ["사과", "오렌지", "수박", "토마토", "체리", "바나나", "딸기", "멜론"];
  const wordList2 = ["판다", "고양이", "강아지", "코끼리", "토끼", "원숭이", "달팽이", "사자"];
  const wordList3 = ["연필", "가위", "지우개", "만년필", "그릇", "키보드", "마우스", "의자"];
  // console.log(num.num);
  switch (props.categoryType) {
    case 1:
      currentWordList = wordList;
      break;
    case 2:
      currentWordList = wordList2;
      break;
    case 3:
      currentWordList = wordList3;
      break;
    default:
      currentWordList = null;
      break;
  }

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

  // 모달 열기를 위한 상태와 선택된 아이템 상태 추가
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <FlatList
      horizontal={true}
      data={currentWordList}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <CardContainer
          onPress={() => {
            console.log(props.callbackprop);
            props.callbackprop(item);
            setSelectedItem(item);
            setModalVisible(true);
          }}
        >
          <MainLogo source={require("../../assets/logo/mainLogo2.png")}></MainLogo>
          <CardInnerContainer>
            <CardImageWrap>
              <CardImage source={getImage(item)} resizeMode="contain"></CardImage>
            </CardImageWrap>
            <CardText>{item}</CardText>
          </CardInnerContainer>
        </CardContainer>
      )}
      ItemSeparatorComponent={() => <Gap />}
    />
  );
};

export default WordNoteCard;

const CardContainer = styled(BtnContainer)`
  flex: 1;
  aspect-ratio: 3/4;
  background-color: white;
  border: 5px solid black;
  border-radius: 20px 20px 0px 20px;
  justify-content: center;
  align-items: center;
`;
const CardInnerContainer = styled.View`
  background-color: beige;
  width: 90%;
  height: 80%;
  border-radius: 20px;
  padding-top: 20px;
`;

const Gap = styled.View`
  width: 15px;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const CardText = styled.Text`
  flex: 1;
  font-size: 40px;
  font-family: "BMJUA";
  text-align: center;
`;

const MainLogo = styled.Image`
  width: 60%;
  height: 40%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;

const CardImageWrap = styled.View`
  flex: 2;
`;
