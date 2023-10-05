import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../etc/Header";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import React, { useEffect, useState } from "react";
import MainModal from "../tutorial/MainModal";
import Modal from "react-native-modal";
import MiddleSet from "../components/MiddleSet"; // 모달 패키지
import { Audio } from "expo-av";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Main = ({ route }: any) => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTouchable, setIsTouchable] = useState(false);

  useEffect(() => {
    // 페이지가 렌더링될 때 소리를 자동으로 재생
    const playSound = async () => {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require("../../assets/wav/03_그림맞추기_먼저_해볼까.wav"));
        await soundObject.playAsync();
        // 사운드 재생이 끝나면 터치 가능하게 상태 변경
        soundObject.setOnPlaybackStatusUpdate(status => {
          if (status.didJustFinish) {
            setIsTouchable(true);
          }
        });
      } catch (error) {
        console.error("소리 재생 중 오류 발생:", error);
      }
    };

    // 컴포넌트가 마운트될 때 소리를 재생
    playSound();
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg source={require("../../assets/background/main/mainBackground.png")}>
          <Header />
          <MiddleSet>
            <MiddleSetRow>
              <BtnContainer>
                <MenuBtnDraw
                  cameFromTutorialTwo={route.params?.cameFromTutorialTwo}
                  onPress={() => {
                    if (isTouchable) {
                      navigation.navigate("TutorialFour", { cameFromTutorialThree: true });
                    }
                  }}
                  disabled={!isTouchable}
                >
                  <BtnImg
                    source={require("../../assets/button/home/HomePicMatch.png")}
                    resizeMode="contain"
                  />
                  <BtnText>그림 맞추기</BtnText>
                </MenuBtnDraw>
              </BtnContainer>
              <Box>
                <SpeechBubbleImg
                  source={require("../../assets/etc/tutoThree.png")}
                  resizeMode="contain"
                >
                  <TextTotutial>그림 맞추기 {"\n"}먼저 해볼까?</TextTotutial>
                </SpeechBubbleImg>
              </Box>
            </MiddleSetRow>
          </MiddleSet>
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

const MiddleSetRow = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

//헤더 컨테이너
const TestContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const MenuBtnDraw = styled.TouchableOpacity<{ cameFromTutorialTwo: boolean }>`
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: #f3ca85;
  border: ${props => (props.cameFromTutorialTwo ? "10px solid red" : "10px solid #fef8df")};
  border-radius: 20px;
  margin: 10px;
  z-index: 6;
`;

//버튼 컨테이너
const SpeechBubbleImg = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.View`
  flex: 8;
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
`;

const Box = styled.View`
  flex: 2;
`;

const TextTotutial = styled.Text`
  font-family: "BMJUA";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  color: #000000;
  top: -10%;
  right: 10%;
`;

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
