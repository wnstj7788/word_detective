import { View, Text, Image } from "react-native";
import { useState } from "react";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { Container, ContainerBg } from "../../styles/globalStyles";
import Header from "./Header";
import { IStage } from "../../types/types";
import { initialStage } from "../initialType";

//TODO: 배경이 스크롤되도록 변경
const Stage = ({ navigation }: any) => {
  const isLoaded = useCachedResources();

  //TODO: api 호출해야
  const testWordList = [];
  const [wordList, setWordList] = useState<IStage>(initialStage); //모임 데이터

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg
          source={require("../../assets/background/stage/fruit.png")}
          resizeMode="stretch"
        >
          <HeaderContainer>
            <Header navigation={navigation} />
          </HeaderContainer>
          <ContentContainer>
            <CharacterContainer>
              <Image source={require("../../assets/character/fruitCharacter.png")} />
            </CharacterContainer>
            <StageListContainer>
              <Text>스테이지 영역</Text>
            </StageListContainer>
          </ContentContainer>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default Stage;

//헤더 컨테이너
const HeaderContainer = styled.View`
  flex: 1;
`;

//하단내용 컨테이너
const ContentContainer = styled.View`
  flex: 8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

//캐릭터 영역
const CharacterContainer = styled.View`
  flex: 1;
  background-color: #f1a2ff;
  padding-left: 50px;
`;

//스테이지 영역
const StageListContainer = styled.ScrollView`
  flex: 3;
  background-color: #50ff7f;
`;
