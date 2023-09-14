import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
import React, { useState } from "react";

const Header = ({ navigation }: any) => {
  const [isSoundOn, setSoundOn] = useState(true);
  const toggleSound = () => {
    setSoundOn(!isSoundOn);
  };

  return (
    <Container>
      <HeaderLeft>
        <HeaderBtn onPress={() => navigation.navigate("Main")}>
          <Image source={require("../../assets/button/header/headerHomeBtn.png")} />
        </HeaderBtn>
        <HeaderBtn onPress={() => navigation.navigate("WordNoteMain")}>
          <Image source={require("../../assets/button/header/headerInvtBtn.png")} />
        </HeaderBtn>
      </HeaderLeft>
      <HeaderSoundBtn onPress={toggleSound}>
        <Image
          source={
            isSoundOn
              ? require("../../assets/button/header/headerSoundOnBtn.png")
              : require("../../assets/button/header/headerSoundOffBtn.png")
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
