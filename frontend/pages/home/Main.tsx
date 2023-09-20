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
import Modal from "react-native-modal"; // 모달 패키지

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Main = ({route}: any) => {
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
                        <Header/>
                    </HeaderContainer>
                    <BtnContainer>
                        {/*<MenuBtnDraw   style={*/}
                        {/*  route.params?.cameFromTutorialTwo*/}
                        {/*      ? { zIndex: 4, borderColor: 'red' }*/}
                        {/*      : { borderColor : '#fef8df' } // Change this to your desired style*/}
                        {/*} onPress={() => navigation.navigate("PictureLobby", {})}>*/}
                        <MenuBtnDraw
                            cameFromTutorialTwo={route.params?.cameFromTutorialTwo}
                            onPress={() => {
                                console.log("ddddd");
                                navigation.navigate("PictureLobby", {});
                            }}
                        >
                            <BtnImg
                                source={require("../../assets/button/home/HomePicMatch.png")}
                                resizeMode="contain"
                            />
                            <BtnText>그림 맞추기</BtnText>
                        </MenuBtnDraw>
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

                    {route.params?.cameFromTutorialTwo && (
                        <MainModal
                            visible={isModalVisible}
                            closeModal={closeModal}

                        />
                    )}
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


// const MenuBtnDraw = styled.TouchableOpacity`
//   justify-content: center;
//   align-items: center;
//   width: 200px;
//   height: 200px;
//   background-color: #f3ca85;
//   border: 10px solid #fef8df;
//   border-radius: 20px;
//   margin: 10px;
// `;

const MenuBtnDraw = styled.TouchableOpacity<{cameFromTutorialTwo:boolean}>`
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
