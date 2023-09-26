import React, {useState, useEffect} from "react";
import {View, Text, Image, ImageBackground} from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../App";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import Header from "../etc/Header";
import {Container, ContainerBg, MenuBtn} from "../../styles/globalStyles";
import MiddleSet from "../components/MiddleSet";
import {Audio} from "expo-av";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Main = () => {
    const isLoaded = useCachedResources();
    const navigation = useNavigation<RootStackNavigationProp>();
    const [isTouchable, setIsTouchable] = useState(false);

    useEffect(() => {
        // 페이지가 렌더링될 때 소리를 자동으로 재생
        const playSound = async () => {
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(
                    require("../../assets/mav/01_안녕_나는_단어탐정이야_내가_모아놓은_단어카드를_잃어버렸는데_도와줘.wav")
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

    if (isLoaded) {
        return (
            <Container>
                <ContainerBg source={require("../../assets/background/main/tutorialBackground.png")}>
                    {/* <HeaderContainer>
            <Header />
          </HeaderContainer> */}
                    <TouchableWithoutFeedback
                        onPress={() => {
                            if (isTouchable) {
                                navigation.navigate("TutorialTwo");
                            }
                        }}
                        disabled={!isTouchable}
                    >
                        <MiddleSet>
                            <ContentBox>
                                <SpeechBubbleImg
                                    source={require("../../assets/etc/tutoOne.png")}
                                    resizeMode="contain"
                                >
                                    <TextTotutial>
                                        안녕! 나는 단어탐정이야 ! {"\n"}
                                        내가 모아놓은 단어카드를 {"\n"} 잃어버렸는데 도와줘 !{" "}
                                    </TextTotutial>
                                </SpeechBubbleImg>
                            </ContentBox>
                        </MiddleSet>
                    </TouchableWithoutFeedback>
                </ContainerBg>
            </Container>
        );
    } else {
        return null;
    }
};

export default Main;

// 나머지 스타일과 컴포넌트 정의는 동일하게 유지합니다.

//전체 컨테이너의 배경 이미지
const HeaderContainer = styled.View`
  flex: 1;
`;

const TouchableWithoutFeedback = styled.TouchableOpacity`
  flex: 1;

`;
//버튼 컨테이너
const SpeechBubbleImg = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-width: 100%;
`;

const TextTotutial = styled.Text`
  font-family: "BMJUA";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  color: #000000;
  top: -5%;
  right: 15%;
`;


const ContentBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

`;