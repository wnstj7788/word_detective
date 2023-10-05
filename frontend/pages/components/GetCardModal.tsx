import { Animated } from "react-native";
import { View, Text, Button, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Dimensions } from "react-native";
import { ICard } from "../../types/types";
import React, { useState, useEffect, useRef } from "react";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const screenWidth = Dimensions.get("window").width;
const height = screenWidth * 0.4;
const width = (height / 5) * 3.8;
const height2 = screenWidth * 0.5;
const width2 = (height / 3) * 3.8;
//카드 배경
const cardDesign1 = require("../../assets/card/wordCard1.png");
const cardDesign2 = require("../../assets/card/cardAdvanced2.png");
import StampO from "../pictureGame/stamp";
const GetCardModal = ({ word, onClose, nextScreen }: any) => {
  const click = () => {
    if (nextScreen) {
      navigation.navigate(nextScreen, { word });
    }
  };
  console.log(word);
  const navigation = useNavigation<RootStackNavigationProp>();

  // 도장 애니메이션
  const scaleValue = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    // 크기를 커졌다가 줄이는 애니메이션 설정
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <ModalContainer>
      <ModalLeft>
        <WordCardDesign source={cardDesign2} resizeMode="stretch">
          <WordImg source={{ uri: word.url }}></WordImg>
        </WordCardDesign>
      </ModalLeft>

      <ModalRight>
        <ModalCloseBtn onPress={click}>
          <ModalCloseBtnImg
            source={require("../../assets/button/resultNext.png")}
          ></ModalCloseBtnImg>
        </ModalCloseBtn>

        <WordStampDesign source={require("../../assets/card/wordCard2.png")} resizeMode="stretch">
          <WordTitle>{word.name} 획득 !</WordTitle>

          <StampWrap>
            <StampRow>
              <Stamp>
                {/* <StampImg
                  source={require("../../assets/button/stamp.png")}
                  resizeMode="contain"
                ></StampImg> */}
                <Animated.Image
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: [{ scale: scaleValue }],
                  }}
                  source={require("../../assets/button/stamp.png")}
                  resizeMode="contain"
                />
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

export default GetCardModal;
const ModalContainer = styled.View`
  flex-direction: row;
`;

// Modal Container 왼쪽 영역 ( 카드 이미지 )
const ModalLeft = styled.View`
  flex: 1;
  padding: 20px 0px 20px 20px;
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
  z-index: 234;
  transform: rotate(10deg);
`;

// Modal Container 오른쪽 영역 ( 도장 )
const ModalRight = styled.View`
  border-radius: 0px;
  flex: 1;
  margin-right: 100px;
`;
const WordStampDesign = styled.ImageBackground`
  width: ${width2}px;
  height: ${height2}px;
  justify-content: center;
  align-items: center;
  right: 29px;
`;
const ModalCloseBtn = styled.TouchableOpacity`
  flex: 1;
  width: 20%;
  height: 14%;
  position: absolute;
  bottom: 50px;
  right: -100px;
  z-index: 123;
`;

const ModalCloseBtnImg = styled.Image`
  width: 100%;
  height: 100%;
`;

const WordTitle = styled.Text`
  font-size: 40px;
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
const StampContainer = styled.View`
  position: absolute;
  z-index: 123;
`;
