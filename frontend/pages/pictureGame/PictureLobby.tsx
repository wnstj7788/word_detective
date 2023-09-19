import { View, Text, Image, ImageBackground } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../etc/Header";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import React, { useEffect, useState } from "react";
import MainModal from "../tutorial/MainModal";
import Modal from "react-native-modal";
import PictureModal from "../tutorial/PictureModal"; // 모달 패키지

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PictureLobby = ({ route }: any) => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isModalVisible, setModalVisible] = useState(false);


  useFocusEffect(
      React.useCallback(() => {
        // 이 함수는 화면이 포커스를 받을 때 실행됩니다.
        if (route.params?.cameFromMainModal) {
          setModalVisible(true);
          console.log("Returned from MainModal");
        }
      }, [route.params?.cameFromMainModal])
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
            <View style={{ position: "relative" }}>
              <Image source={require("../../assets/character/menuDog.png")}></Image>
              <BubbleText>그림 맞추기!</BubbleText>
            </View>

            <MenuBtn onPress={() => navigation.navigate("Main",{})}>
              <BtnImg
                source={require("../../assets/button/gameMode/detectiveModeBtn.png")}
                resizeMode="contain"
              />
              <BtnText>탐정 놀이</BtnText>
            </MenuBtn>
            <MenuBtn onPress={() => navigation.navigate("Stage", { gameType: "picture" })}>
              <BtnImg
                source={require("../../assets/button/gameMode/stageModeBtn.png")}
                resizeMode="contain"
              />
              <BtnText>스테이지</BtnText>
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
              <PictureModal ></PictureModal>


            </Modal>

          </BtnContainer>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default PictureLobby;

//전체 컨테이너의 배경 이미지
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
const BubbleText = styled.Text`
  position: absolute;
  top: 10%;
  left: 37%;
  font-family: "BMJUA";
  font-size: 20px;
`;
