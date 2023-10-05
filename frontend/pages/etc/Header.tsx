import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { setCurrentMusicName, setIsMuted } from "../../store/music";
import useAppSelector from "../../store/useAppSelector";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Header = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isMuted = useAppSelector(state => state.music.isMuted);
  const dispatch = useDispatch();

  const toggleSound = () => {
    dispatch(setIsMuted(!isMuted));
  };

  const gotoMainPageHandler = () => {
    dispatch(setCurrentMusicName("mainMusic")); //디폴트 음악 경로 설정
    navigation.navigate("Main");
  };

  const gotoWordNoteHandler = () => {
    dispatch(setCurrentMusicName("mainMusic")); //디폴트 음악 경로 설정
    navigation.navigate("WordNoteMain");
  };

  return (
    <Container>
      <HeaderLeft>
        <HeaderBtn onPress={() => gotoMainPageHandler()}>
          <Image source={require("../../assets/button/header/headerHomeBtn.png")} />
        </HeaderBtn>
        <HeaderBtn onPress={() => gotoWordNoteHandler()}>
          <Image source={require("../../assets/button/header/headerInvtBtn.png")} />
        </HeaderBtn>
      </HeaderLeft>
      <HeaderSoundBtn onPress={() => toggleSound()}>
        <Image
          source={
            isMuted
              ? require("../../assets/button/header/headerSoundOffBtn.png")
              : require("../../assets/button/header/headerSoundOnBtn.png")
          }
        />
      </HeaderSoundBtn>
    </Container>
  );
};
export default Header;

//전체 컨테이너
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  padding-left: 95px;
  padding-right: 95px;
  background-color: transparent;
`;

//헤더 왼쪽
const HeaderLeft = styled.View`
  flex-direction: row;
`;

//각 메뉴 버튼
const HeaderBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin: 5px;
`;

//헤더 사운드 버튼
const HeaderSoundBtn = styled.TouchableOpacity``;
