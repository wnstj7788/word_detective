import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import Header from "../etc/Header";
import styled from "styled-components/native";
import WordNoteCard from "../components/WordNoteCard";
import { IWord } from "../../types/types";
import useCachedResources from "../../hooks/useCachedResources";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Container, ContainerBg } from "../../styles/globalStyles";

// 이미지 소스 미리 선언
const wordNoteBgImage = require("../../assets/background/wordNoteBg.png");
const appleImage = require("../../assets/etc/apple.png");
const pandaImage = require("../../assets/etc/panda.png");
const pencilImage = require("../../assets/etc/pencil.png");

const WordNoteMain = () => {
  return (
    <Container>
      <ContainerBg source={wordNoteBgImage}>
        <HeaderContainer>
          <Header />
        </HeaderContainer>

        <WordNoteContainer>
          <WordNoteList>
            <WordNoteCard />
          </WordNoteList>

          <WordNoteCategory>
            <WordCategoryBtn>
              <CategoryBtnImg source={appleImage} resizeMode="contain" />
            </WordCategoryBtn>
            <WordCategoryBtn2>
              <CategoryBtnImg source={pandaImage} resizeMode="contain" />
            </WordCategoryBtn2>
            <WordCategoryBtn3>
              <CategoryBtnImg source={pencilImage} resizeMode="contain" />
            </WordCategoryBtn3>
          </WordNoteCategory>
        </WordNoteContainer>
      </ContainerBg>
    </Container>
  );
};
export default WordNoteMain;

// 헤더
const HeaderContainer = styled.View`
  flex: 1;
`;

// 단어장 컨테이너
const WordNoteContainer = styled.View`
  flex: 4;
  padding: 23px;
  flex-direction: row;
`;

// 단어카드 목록
const WordNoteList = styled.View`
  flex: 8;
  background-color: rgb(233, 203, 181);
  border-radius: 50px 0px 0px 50px;
  padding: 15px 15px 15px 20px;
  flex-direction: row;
`;

// 단어장 카테고리
const WordNoteCategory = styled.View`
  flex: 1;
  background-color: rgb(244, 236, 216);
  border-radius: 0px 10px 10px 0px;
  justify-content: center;
`;

// 단어장 카테고리 버튼 ( 과일, 동물, 사물 )
const WordCategoryBtn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  background-color: #fcceba;
  border-radius: 0px 15px 0px 0px;
`;

const WordCategoryBtn2 = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  background-color: #93c996;
`;

const WordCategoryBtn3 = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  background-color: #c3e5ef;
  border-radius: 0px;
  border-radius: 0px 0px 15px 0px;
`;

// 단어장 카테고리 버튼 이미지
const CategoryBtnImg = styled.Image`
  width: 100%;
`;
