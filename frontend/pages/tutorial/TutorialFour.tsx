import {View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet} from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import Header from "../etc/Header";
import {Container, ContainerBg, MenuBtn} from "../../styles/globalStyles";
import React, {useEffect, useState} from "react";
import MainModal from "../tutorial/MainModal";
import Modal from "react-native-modal";
import MiddleSet from "../components/MiddleSet";
import {Audio} from "expo-av"; // 모달 패키지

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Main = ({route}: any) => {
    const isLoaded = useCachedResources();
    const navigation = useNavigation<RootStackNavigationProp>();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isTouchable, setIsTouchable] = useState(false);

    useEffect(() => {
        // 페이지가 렌더링될 때 소리를 자동으로 재생
        const playSound = async () => {
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(
                    require("../../assets/mav/04_스테이지를_눌러보자.wav")
                );
                await soundObject.playAsync();
                // 사운드 재생이 끝나면 터치 가능하게 상태 변경
                soundObject.setOnPlaybackStatusUpdate((status) => {
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
                    <Header/>
                    <MiddleSet>
                        <MiddleSetRow>
                            <Box>
                                <SpeechBubbleImg
                                    source={require("../../assets/etc/tutorialFour.png")}
                                    resizeMode="contain">
                                    <TextTotutial>
                                        스테이지를 {"\n"} 눌러보자
                                    </TextTotutial>
                                </SpeechBubbleImg>

                            </Box>
                            <BtnContainer>
                                <MenuBtnDraw
                                    cameFromTutorialTwo={route.params?.cameFromTutorialThree}
                                    onPress={() => {
                                        if (isTouchable) {
                                            navigation.navigate("TutorialFive", {cameFromTutorialFour: true});
                                        }
                                    }}
                                    disabled={!isTouchable}
                                >
                                    <BtnImg
                                        source={require("../../assets/button/gameMode/stageModeBtn.png")}
                                        resizeMode="contain"
                                    />
                                    <BtnText>스테이지</BtnText>
                                </MenuBtnDraw>
                            </BtnContainer>
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
            </Container>)
            ;
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
  border: ${(props) => (props.cameFromTutorialTwo ? '10px solid red' : '10px solid #fef8df')};
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
  justify-content: flex-start;
  align-items: flex-start;
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
  top: -8%;
  left: 15%;
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


const MiddleSetRow = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;