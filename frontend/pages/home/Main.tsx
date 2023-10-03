import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import Header from "../etc/Header";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import React, { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av"; // Expo Audio 라이브러리 추가
import { useDispatch } from "react-redux";
import useAppSelector from "../../store/useAppSelector";
import GlobalMusicPlayer from "../../utils/globalMusicPlayer"; // GlobalMusicPlayer 컴포넌트 임포트 추가
import { setCurrentMusicName, setIsPlaying } from "../../store/music";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Main = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch = useDispatch();
  const currentMusicName = useAppSelector(state => state.music.currentMusicName);
  const isMusicPlaying = useAppSelector(state => state.music.isPlaying);

  useEffect(() => {
    dispatch(setCurrentMusicName("mainMusic")); //디폴트 음악 경로 설정
  }, []);

  useEffect(() => {
    console.log("Main::", currentMusicName);
  }, [currentMusicName]);

  const playSound = async (soundFile: string) => {
    const { sound } = await Audio.Sound.createAsync(getSoundFiles(soundFile));
    await sound.playAsync();
  };

  const handleNavigateToOtherScreenPictureLobby = () => {
    dispatch(setCurrentMusicName("pictureBgMusic"));
    navigation.navigate("PictureLobby");
  };

  const handleNavigateToOtherScreenWordLobby = () => {
    dispatch(setCurrentMusicName("wordBgMusic"));
    navigation.navigate("WordLobby");
  };

  const handleNavigateToOtherScreenLetterLobby = () => {
    dispatch(setCurrentMusicName("letterBgMusic"));
    navigation.navigate("LetterLobby");
  };

  const getSoundFiles = (name: string): any => {
    switch (name) {
      case "pictureMatch":
        return require("../../assets/wav/06_그림맞추기.wav");
      case "wordMatch":
        return require("../../assets/wav/34_단어맞추기.wav");
      case "wordLetter":
        return require("../../assets/wav/35_단어나누기.wav");
    }
    // 다른 소리 파일들을 필요에 따라 추가
  };

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg source={require("../../assets/background/main/mainBackground.png")}>
          <GlobalMusicPlayer />
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          <BtnContainer>
            <MenuBtn
              onPress={async () => {
                playSound("pictureMatch");
                handleNavigateToOtherScreenPictureLobby();
              }}
            >
              <BtnImg
                source={require("../../assets/button/home/HomePicMatch.png")}
                resizeMode="contain"
              />
              <BtnText>그림 맞추기</BtnText>
            </MenuBtn>
            <MenuBtn
              onPress={async () => {
                playSound("wordMatch");
                handleNavigateToOtherScreenWordLobby();
                // navigation.navigate("WordLobby");
              }}
            >
              <BtnImg
                source={require("../../assets/button/home/HomeWordMatch.png")}
                resizeMode="contain"
              />
              <BtnText>단어 맞추기</BtnText>
            </MenuBtn>
            <MenuBtn
              onPress={async () => {
                playSound("wordLetter");
                handleNavigateToOtherScreenLetterLobby();
              }}
            >
              <BtnImg
                source={require("../../assets/button/home/HomeWordDivideMatch.png")}
                resizeMode="contain"
              />
              <BtnText>단어 나누기</BtnText>
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
