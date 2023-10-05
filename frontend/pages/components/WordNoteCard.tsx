import React, { useState } from "react";
import { Text, FlatList, Image, TouchableOpacity, View, Modal } from "react-native";
import { BtnContainer } from "../../styles/globalStyles";
import styled from "styled-components/native";
import { IStage, IWord } from "../../types/types";
import { current } from "@reduxjs/toolkit";
import useAppSelector from "../../store/useAppSelector";
// 모달
import WordCardDetailModal from "./WordCardDetailModal";
const WordNoteCard = (props: { categoryType: number; callbackprop(data: IWord): void }) => {
  // 모달 열기를 위한 상태와 선택된 아이템 상태 추가
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const words = useAppSelector(state => state.wordList.value);
  const user = useAppSelector(state => state.user.value);

  // const getIsClear = (item: IWord) => {
  //   console.log(user);
  //   console.log(
  //     user.picture === (0 || null) &&
  //       user.word === (0 || null) &&
  //       user.letter === (0 || null) &&
  //       user.cameraPicture === (0 || null) &&
  //       user.cameraWord === (0 || null) &&
  //       user.cameraLetter === (0 || null)
  //   );
  //   return !(
  //     user.picture === (0 || null) &&
  //     user.word === (0 || null) &&
  //     user.letter === (0 || null) &&
  //     user.cameraPicture === (0 || null) &&
  //     user.cameraWord === (0 || null) &&
  //     user.cameraLetter === (0 || null)
  //   );
  // };

  return (
    <FlatList
      horizontal={true}
      data={words[props.categoryType - 1]}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <CardContainer
          onPress={() => {
            console.log(props.callbackprop);
            props.callbackprop(item);
            setSelectedItem(item);
            setModalVisible(true);
          }}
          // $isClear={getIsClear(item)}
          $isClear={true}
        >
          <MainLogo source={require("../../assets/logo/mainLogo2.png")}></MainLogo>
          <CardInnerContainer>
            <CardImageWrap>
              <CardImage source={{ uri: item.url }} resizeMode="contain"></CardImage>
            </CardImageWrap>
            <CardText>{item.name}</CardText>
          </CardInnerContainer>
        </CardContainer>
      )}
      ItemSeparatorComponent={() => <Gap />}
    />
  );
};

export default WordNoteCard;

const CardContainer = styled(BtnContainer)<{ $isClear: boolean }>`
  flex: 1;
  aspect-ratio: 3/4;
  background-color: white;
  border: 5px solid black;
  border-radius: 20px 20px 0px 20px;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.$isClear ? 1 : 0.5)};
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
