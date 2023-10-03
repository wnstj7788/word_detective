import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  PanResponder,
  TouchableOpacity,
  Platform,
  Text,
  Image,
} from "react-native";
import styled from "styled-components/native";
import { ContainerBg } from "../../styles/globalStyles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import LetterCanvas3 from "./LetterCanvas3";
type StagePageRouteProp = RouteProp<RootStackParamList, "LetterGame2">;
// @ts-ignore
import * as hangul from "hangul-js";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Modal from "react-native-modal";
import GameClearModal from "../components/GameClearModal";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LetterGame3 = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();
  const [pointer, setPointer] = useState(0);
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params;
  const list: string[] = hangul.disassemble(word.name);
  const letters: string[][] = hangul.disassemble(word.name, true);
  const check: number[] = [
    letters[0].length,
    letters[1] ? letters[1].length : 0,
    letters[2] ? letters[2].length : 0,
  ];
  const length: number = list.length;
  const [write, setWrite] = useState("");
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const concat = (pointer: number) => {
    let ret: string = "";
    let a = pointer;
    let b = 0;
    while (a > 0) {
      if (letters[b].length <= a) {
        ret += hangul.assemble(letters[b]);
        a -= letters[b].length;
      } else {
        ret += hangul.assemble(letters[b].slice(0, a));
        a = 0;
      }

      b++;
    }
    console.log(ret);
    return ret;
  };

  return (
    <ContainerBg source={require("../../assets/background/game/fruit.png")}>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor="rgba(0, 0, 0, 0.5)"
        isVisible={isModalVisible}
        onBackButtonPress={closeModal} // onRequestClose 대신 onBackButtonPress 사용
        backdropTransitionOutTiming={0}
        statusBarTranslucent={true} // 이 옵션을 사용하여 상태 표시줄을 숨깁니다.
      >
        <GameClearModal nextScreen="LetterGame4" word={word}></GameClearModal>
      </Modal>
      <Container>
        <ContainerA>
          <Question>
            <ImageContainer1>
              <QuestionImage
                resizeMode="contain"
                source={require("../../assets/card/fruit/apple.png")}
              />
            </ImageContainer1>
            <ImageContainer2>
              <QuestionText>{word.name}</QuestionText>
            </ImageContainer2>
            <ImageContainer3>
              <TouchableOpacity
                onPress={() => {
                  if (pointer >= length - 1) {
                    openModal();
                    return;
                  }
                  setPointer(prevPointer => prevPointer + 1);
                }}
              >
                <Image source={require("../../assets/button/audioBtn.png")} />
              </TouchableOpacity>
            </ImageContainer3>
          </Question>
          <Progress>
            <Text style={{ fontSize: 60, fontFamily: "BMJUA", letterSpacing: 30 }}>
              {concat(pointer)}
            </Text>
          </Progress>
        </ContainerA>
        <ContainerB>
          <LetterCanvas3
            list={list}
            pointer={pointer}
            alpha={true}
            setWrite={setWrite}
            setPointer={setPointer}
          ></LetterCanvas3>
        </ContainerB>
      </Container>
    </ContainerBg>
  );
};
const ImageContainer3 = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const ImageContainer2 = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;
const ImageContainer1 = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;
const QuestionText = styled.Text`
  font-size: 50px;
  font-family: "BMJUA";
`;
const QuestionImage = styled.Image`
  width: 80%;
  height: 80%;
`;
const Progress = styled.View`
  flex: 3;
  flex-direction: row;
  margin: 5%;
  background-color: white;
  border: black;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  ${Platform.OS === "android" &&
  `
    elevation: 10;
  `}
`;
const Question = styled.View`
  flex: 2;
  flex-direction: row;
  margin: 3% 5%;
  background-color: white;
  border: black;
  border-radius: 20px;
  ${Platform.OS === "android" &&
  `
    elevation: 10;
  `}
`;
const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

const ContainerA = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ContainerB = styled.View`
  flex: 1;
  margin: 3%;
  background-image: image("../../assets/card/fruit/apple.png");
  border: 1px black;
  border-radius: 20px;
`;

export default LetterGame3;
