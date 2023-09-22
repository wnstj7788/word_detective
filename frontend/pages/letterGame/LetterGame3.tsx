import React, { useRef, useEffect, useState } from 'react';
import { View, ImageBackground, PanResponder, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components/native";
import { ContainerBg } from "../../styles/globalStyles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
// import { Sketch } from 'expo-pixi';
type StagePageRouteProp = RouteProp<RootStackParamList, "LetterGame2">;

// @ts-ignore
// const { width, height } = Dimensions.get('window');
const LetterGame3 = () => {

  const route = useRoute<StagePageRouteProp>();
  const {word} = route.params;
  // const onReady = async ({gl, sketch }) => {
  //   // You can do something when the sketch is ready
  //   console.log('Sketch is ready!');
  // };
  //
  // const onChangeAsync = async ({gl, sketch }) => {
  //   // This gets triggered whenever the user draws
  //   // You can save the drawing if needed
  //   const { uri } = await sketch.takeSnapshotAsync();
  //   console.log(uri);
  // };
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
            <TouchableOpacity >
            <QuestionSound source={require("../../assets/button/audioBtn.png")}/>
            </TouchableOpacity>
            </ImageContainer3>
          </Question>
          <Progress>

          </Progress>
        </ContainerA>
        <ContainerB>
          {/*<Sketch*/}
          {/*  style={{ flex: 1 }}*/}
          {/*  strokeWidth={10}  // The width of the brush stroke*/}
          {/*  strokeColor="blue"  // The color of the brush stroke*/}
          {/*  onChangeAsync={onChangeAsync}*/}
          {/*  onReady={onReady}*/}
          {/*/>*/}
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
  background-color: white;
  border: black;
  border-radius: 20px;
  ${Platform.OS === 'android' && `
    elevation: 10;
  `}
  overflow: hidden;
`

export default LetterGame3;
