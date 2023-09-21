import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import Header from "../etc/Header";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import React from "react";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Main = ({ route }: any) => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg source={require("../../assets/background/main/mainBackground.png")}>
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          <BtnContainer>
            <MenuBtnDraw
              cameFromTutorialTwo={route.params?.cameFromTutorialTwo}
              onPress={() => {
                console.log("ddddd");
                navigation.navigate("PictureLobby", {});
              }}
            >
              <BtnImg
                source={require("../../assets/button/home/HomePicMatch.png")}
                resizeMode="contain"
              />
              <BtnText>그림 맞추기</BtnText>
            </MenuBtnDraw>
            <MenuBtn onPress={() => navigation.navigate("WordLobby")}>
              <BtnImg
                source={require("../../assets/button/home/HomeWordMatch.png")}
                resizeMode="contain"
              />
              <BtnText>단어 맞추기</BtnText>
            </MenuBtn>
            <MenuBtn onPress={() => navigation.navigate("LetterLobby")}>
              <BtnImg
                source={require("../../assets/button/home/HomeWordDivideMatch.png")}
                resizeMode="contain"
              />
              <BtnText>단어 나누기1</BtnText>
            </MenuBtn>
          </BtnContainer>
          <TestContainer>
            <TouchableOpacity onPress={() => navigation.navigate("TutorialOne")}>
              <Text>튜토리얼 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("TutorialTwo")}>
              <Text>튜토리얼 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CameraCon")}>
              <Text>카메라 </Text>
            </TouchableOpacity>
          </TestContainer>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default Main;

//헤더 컨테이너
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

//헤더 컨테이너
const TestContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const MenuBtnDraw = styled(MenuBtn)<{ cameFromTutorialTwo: boolean }>`
  border: ${props => (props.cameFromTutorialTwo ? "10px solid red" : "10px solid #fef8df")};
`;
