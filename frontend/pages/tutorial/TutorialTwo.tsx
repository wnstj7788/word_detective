import {View, Text, Image, ImageBackground} from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../App";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import Header from "../etc/Header";
import {Container, ContainerBg, MenuBtn} from "../../styles/globalStyles";
import MiddleSet from "../components/MiddleSet";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Main = () => {
    const isLoaded = useCachedResources();
    const navigation = useNavigation<RootStackNavigationProp>();

    if (isLoaded) {
        return (
            <Container>
                <ContainerBg source={require("../../assets/background/main/tutorialBackground.png")}>
                    {/* <HeaderContainer>
                        <Header />
                    </HeaderContainer> */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('TutorialThree', {cameFromTutorialTwo: true})}>
                        <MiddleSet>
                            <ContentBox>
                                <SpeechBubbleImg
                                    source={require("../../assets/etc/tutoOne.png")}
                                    resizeMode="contain">
                                    <TextTotutial>
                                        일단 먼저 {"\n"}
                                        <AppleText>사과</AppleText> 카드 를 찾아보자!{" "}
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
``;
export default Main;

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


const AppleText = styled.Text`
  color: red; /* 빨간색으로 변경 */
`;
const ContentBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

`;