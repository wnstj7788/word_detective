import React, { useRef, useEffect, useState } from 'react';
import { View, ImageBackground, PanResponder, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components/native";
import { ContainerBg } from "../../styles/globalStyles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import LetterCanvas from "./LetterCanvas";
type StagePageRouteProp = RouteProp<RootStackParamList, "LetterGame2">;
// @ts-ignore
import * as hangul from 'hangul-js';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
import axios from 'axios';
const LetterGame4 = () => {

  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const {word} = route.params;
  const list : string[]=hangul.disassemble(word.name);
  const click=()=>{

  }

  return (
    <ContainerBg source={require("../../assets/background/game/fruit.png")}>
      <Container>
        <ContainerA>
          <Question>
            <ImageContainer1>
              <QuestionImage resizeMode="contain" source={require("../../assets/card/fruit/apple.png")}/>
            </ImageContainer1>
            <ImageContainer2>
              <QuestionText>{word.name}</QuestionText>
            </ImageContainer2>
            <ImageContainer3>
              <TouchableOpacity onPress={click}>
                <QuestionSound source={require("../../assets/button/audioBtn.png")}/>
              </TouchableOpacity>
            </ImageContainer3>
          </Question>
        </ContainerA>
        <ContainerB>
          <LetterCanvas list={list} pointer={0} alpha={false}></LetterCanvas>
        </ContainerB>
      </Container>
    </ContainerBg>
  );
}
const ImageContainer3=styled.View`
  justify-content:center;
  align-items: center;
  flex:1;
`
const ImageContainer2=styled.View`
flex:2;
  align-items: center;
  justify-content: center;
`;
const ImageContainer1=styled.View`
  flex:2;
  justify-content: center;
  align-items: center;
`;
const QuestionSound=styled.Image`
  min-height: 10%;
  resizeMode : contain;
  align-items: center;
  justify-content: center;
`
const QuestionText=styled.Text`
  font-size: 50px;
  font-family: "BMJUA";
`
const QuestionImage=styled.Image`
  width: 80%;
  height: 80%;
  
`
const Progress=styled.View`
  flex: 3;
  flex-direction: row;
  margin:5%;
  background-color: white;
  border:black;
  border-radius: 20px;
  ${Platform.OS === 'android' && `
    elevation: 10;
  `}
`;
const Question=styled.View`
  flex: 2;
  flex-direction: row;
  margin:3% 5%;

  background-color: white;
  border:black;
  border-radius: 20px;
  ${Platform.OS === 'android' && `
    elevation: 10;
  `}
`;
const Container=styled.View`
  flex: 1;
  flex-direction: row;
`;

const ContainerA = styled.View`
  flex:1;
  flex-direction: column;
  
`
const ContainerB = styled.View`
  flex:1;
  margin:3%;
  background-image: image("../../assets/card/fruit/apple.png");
  border: 1px black;
  border-radius: 20px;
`

export default LetterGame4;
