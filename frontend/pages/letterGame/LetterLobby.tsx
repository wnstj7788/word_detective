import { View, Text, Image, ImageBackground } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../etc/Header";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import Modal from "react-native-modal";
import { useState } from "react";
import { ResizeMode } from "expo-av";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LetterLobby = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();

  if (isLoaded) {
    return (
      <ContainerBg source={require("../../assets/background/letterBackground.jpg")}>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <BtnContainer>
          <CatWrapper>
            <CatImg source={require("../../assets/character/cookCat.png")}></CatImg>
          </CatWrapper>

          <MenuBtn onPress={() => navigation.navigate("CameraCon", { origin: 'LetterLobby' })}>
            <BtnImg
              source={require("../../assets/button/gameMode/detectiveModeBtn.png")}
              resizeMode="contain"
            />
            <BtnText>탐정 놀이</BtnText>
          </MenuBtn>
          <MenuBtn onPress={() => navigation.navigate("Stage", { gameType: "letter" })}>
            <BtnImg
              source={require("../../assets/button/gameMode/stageModeBtn.png")}
              resizeMode="contain"
            />
            <BtnText>스테이지</BtnText>
          </MenuBtn>
        </BtnContainer>
      </ContainerBg>
    );
  } else {
    return null;
  }
};
export default LetterLobby;
const HeaderContainer = styled.View`
  flex: 1;
`;

//버튼 컨테이너
const BtnContainer = styled.View`
  flex: 8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

//버튼 안의 이미지(사이즈 제한)
const BtnImg = styled.Image`
  max-width: 120px;
  max-height: 120px;
  margin-bottom: 5px;
`;

//버튼의 글씨
const BtnText = styled.Text`
  font-family: "BMJUA";
  font-size: 32px;
  color: #945023;
`;

const CatWrapper = styled.View``;

const CatImg = styled.Image``;
