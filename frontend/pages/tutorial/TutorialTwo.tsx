import { View, Text, Image, ImageBackground } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import Header from "../etc/Header";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";

const Main = ({ navigation }: any) => {
  const isLoaded = useCachedResources();

  if (isLoaded) {
    return (
      <Container>

        <ContainerBg source={require("../../assets/background/main/tutorialBackground.png")}>
          {/* <HeaderContainer>
                        <Header navigation={navigation} />
                    </HeaderContainer> */}
          <TouchableWithoutFeedback>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 11 }}>
              <SpeechBubbleImg
                source={require("../../assets/etc/tutorialBallon.png")}
                resizeMode="contain"
              />
              <TextTotutial>
                일단 먼저 {"\n"}
                <AppleText>사과</AppleText> 카드 를 찾아보자!{" "}
              </TextTotutial>

              <GirlImg
                source={require("../../assets/character/standingCharacter2.png")}
                resizeMode="contain"
              />

              <ArrowBtnImg
                source={require("../../assets/etc/arrowTuto.png")}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }} />
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

const TouchableWithoutFeedback  = styled.TouchableOpacity` 
  flex: 1;
`;

//버튼 컨테이너
const SpeechBubbleImg = styled.Image`
  position: absolute;
  width: 437px;
  height: 278px;
  left: 87px;
  top: 41px;
`;

//버튼 안의 이미지(사이즈 제한)
const GirlImg = styled.Image`
  position: absolute;
  width: 184.02px;
  height: 360px;
  left: 524px;
  top: 0px;
`;

const ArrowBtnImg = styled.Image`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 285px;
  top: 209px;
`;

const TextTotutial = styled.Text`
  position: absolute;
  width: 321px;
  height: 160px;
  left: 139px;
  top: 108px;
  font-family: "BMJUA";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 31px;
  text-align: center;
  color: #000000;
`;

const AppleText = styled.Text`
  color: red; /* 빨간색으로 변경 */
`;
