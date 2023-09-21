import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import Header from "../etc/Header";
import styled from "styled-components/native";
import { IWord } from "../../types/types";
import useCachedResources from "../../hooks/useCachedResources";
import { Container, ContainerBg } from "../../styles/globalStyles";
import Modal from "react-native-modal";
//카드 관련 import
import WordCardDetailModal from "../components/WordCardDetailModal";
import WordNoteCard from "../components/WordNoteCard";

// 라우터 관련 import
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import GameClearModal from "../components/GameClearModal";

// 이미지 소스 미리 선언
const wordNoteBgImage = require("../../assets/background/wordNoteBg.png");
const appleImage = require("../../assets/etc/apple.png");
const pandaImage = require("../../assets/etc/panda.png");
const pencilImage = require("../../assets/etc/pencil.png");

const WordNoteMain = () => {
  const handleCallback = (data: string) => {
    console.log("넘어옴");
    if (data) {
      setChildItem(data);
      openModal();
    }
  };

  const [childItem, setChildItem] = useState("");
  const [changeCategorySignal, setChangeCategorySignal] = useState<number>(1);
  const [isModalVisible, setModalVisible] = useState(false);
  // change 함수의 파라미터 num의 타입을 number로 선언
  const changeCategory = (categoryType: number) => {
    setChangeCategorySignal(categoryType);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <Container>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={isModalVisible}
        backdropColor="rgba(0, 0, 0, 0.5)"
        onBackButtonPress={closeModal} // onRequestClose 대신 onBackButtonPress 사용
        backdropTransitionOutTiming={0}
        statusBarTranslucent={true} // 이 옵션을 사용하여 상태 표시줄을 숨깁니다.
      >
        <WordCardDetailModal
          onClose={closeModal}
          isVisible={isModalVisible}
          item={childItem}
        ></WordCardDetailModal>
      </Modal>
      <ContainerBg source={wordNoteBgImage}>
        <HeaderContainer>
          <Header />
        </HeaderContainer>

        <WordNoteContainer>
          <WordNoteList categoryType={changeCategorySignal}>
            <WordNoteCard callbackprop={handleCallback} categoryType={changeCategorySignal} />
          </WordNoteList>

          <WordNoteCategory>
            <WordCategoryBtn onPress={() => changeCategory(1)}>
              <CategoryBtnImg source={appleImage} resizeMode="contain" />
            </WordCategoryBtn>

            <WordCategoryBtn2 onPress={() => changeCategory(2)}>
              <CategoryBtnImg source={pandaImage} resizeMode="contain" />
            </WordCategoryBtn2>

            <WordCategoryBtn3 onPress={() => changeCategory(3)}>
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
const WordNoteList = styled.View<{ categoryType: number }>`
  flex: 8;
  background-color: ${props =>
    props.categoryType === 1
      ? "#fcceba" // 카테고리 1일 때 배경색
      : props.categoryType === 2
      ? "#93c996" // 카테고리 2일 때 배경색
      : "#c3e5ef"};
  border: 8px solid black;
  border-right-width: 0px;
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
  border: 8px solid black;
  border-left-width: 0px;
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
