import React from "react";
import {View, Text, Button, ImageBackground} from "react-native";
import styled from "styled-components/native";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import MiddleSet from "../components/MiddleSet";
import {MenuBtn} from "../../styles/globalStyles";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyModal = ({onClose}: any) => {
    const navigation = useNavigation<RootStackNavigationProp>();
    return (

        <MiddleSet>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}/>
            <ContentBox style={{flex: 8}}>
                <BtnContainer>
                    <MenuBtnModal onPress={() => navigation.navigate("PictureLobby", {})}>
                        <BtnImg
                            source={require("../../assets/button/home/HomePicMatch.png")}
                            resizeMode="contain"
                        />
                        <BtnText>그림 맞추기</BtnText>
                    </MenuBtnModal>
                </BtnContainer>
                <Box>
                    <SpeechBubbleImg
                        source={require("../../assets/etc/tutoThree.png")}
                        resizeMode="contain">
                        <TextTotutial>
                            그림 먼저 맞춰볼까?
                        </TextTotutial>
                    </SpeechBubbleImg>

                </Box>

            </ContentBox>

        </MiddleSet>


    );
};

export default MyModal;


const TouchableWithoutFeedback = styled.TouchableOpacity`
  flex: 1;
`;

//버튼 컨테이너
const SpeechBubbleImg = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.View`
  flex-direction: row;
  flex : 8;
  justify-content: center;
  align-items: center;


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
  top: -5%;
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

const MenuBtnModal = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: #f3ca85;
  border: 10px solid red;
  border-radius: 20px;

`;

const BtnContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;


`;