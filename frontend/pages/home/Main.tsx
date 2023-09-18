import { View, Text,Image, ImageBackground, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import Header from "../etc/Header";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import React, { useEffect, useState } from "react";
import MainModal from "../components/MainModal";
import Modal from "react-native-modal"; // 모달 패키지

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Main = ({ route }: any) => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isModalVisible, setModalVisible] = useState(false);

  useFocusEffect(
      React.useCallback(() => {
        // 이 함수는 화면이 포커스를 받을 때 실행됩니다.
        // TutorialTwo에서 돌아왔을 때의 동작을 정의합니다.
        if (route.params?.cameFromTutorialTwo) {
          // TutorialTwo 화면에서 돌아왔을 때 실행할 코드

          setModalVisible(true);
          console.log("Returned from TutorialTwo");
        }
      }, [route.params?.cameFromTutorialTwo])
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg source={require("../../assets/background/main/mainBackground.png")}>
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          <BtnContainer>
            <MenuBtn onPress={() => navigation.navigate("PictureLobby",{})}>
              <BtnImg
                source={require("../../assets/button/home/HomePicMatch.png")}
                resizeMode="contain"
              />
              <BtnText>그림 맞추기</BtnText>
            </MenuBtn>
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
            <Modal
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropColor="rgba(255, 255, 255, 0.5)"
                isVisible={isModalVisible}
                onBackButtonPress={closeModal} // onRequestClose 대신 onBackButtonPress 사용
                backdropTransitionOutTiming={0}
                statusBarTranslucent={true} // 이 옵션을 사용하여 상태 표시줄을 숨깁니다.
            >
                  <MainModal ></MainModal>


            </Modal>

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

