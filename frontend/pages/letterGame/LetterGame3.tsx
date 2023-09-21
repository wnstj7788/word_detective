import React, { useRef, useEffect, useState } from 'react';
import { View, ImageBackground, PanResponder, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components/native";
import { ContainerBg } from "../../styles/globalStyles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
type StagePageRouteProp = RouteProp<RootStackParamList, "LetterGame2">;
// @ts-ignore
import Canvas from "react-native-canvas";
const LetterGame3 = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      // @ts-ignore
      const context = canvas.getContext('2d');
      // @ts-ignore
      canvas.width = dimensions.width;
      // @ts-ignore
      canvas.height = dimensions.height;
      setCtx(context);
    }
  }, [dimensions]);


  // Initialize pan responder for touch events on the canvas
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      // @ts-ignore
      ctx.beginPath();
      // @ts-ignore
      ctx.moveTo(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
    },
    onPanResponderMove: (evt) => {
      // @ts-ignore
      ctx.lineTo(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
      // @ts-ignore
      ctx.stroke();
    },
    onPanResponderEnd: () => {
      // @ts-ignore
      ctx.closePath();
    },
  });
  const route = useRoute<StagePageRouteProp>();
  const {word} = route.params;
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
        <ContainerB onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setDimensions({ width, height });
        }}
                    {...panResponder.panHandlers}>
          <Canvas ref={canvasRef}/>
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
