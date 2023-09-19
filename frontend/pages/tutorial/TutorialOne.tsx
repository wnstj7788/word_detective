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
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("TutorialTwo")}>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <View style={{flex: 1 }}/>
                            <View style={{flex: 11}}>
                                <ContentBox>
                                    <SpeechBubbleImg
                                    source={require("../../assets/etc/tutoOne.png")}
                                    resizeMode="contain"/>
                                    <TextTotutial>
                                        안녕! 나는 단어탐정이야 ! 내가 모아놓은 단어카드를 잃어버렸는데 도와줘 !{" "}
                                    </TextTotutial>
                                </ContentBox>

                            </View>
                            <View style={{flex: 1}}/>
                        </View>
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
const SpeechBubbleImg = styled.Image`
  position: absolute;
    
`;


const TextTotutial = styled.Text`
  position: absolute;
  width: 321px;
  height: 160px;
  left: 139px;
  font-family: "BMJUA";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 31px;
  text-align: center;
  color: #000000;
`;


const ContentBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
\
`;