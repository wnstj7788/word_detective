import React, { useRef, useEffect, useState } from 'react';
import { View, ImageBackground, PanResponder, TouchableOpacity, Platform, Text, Image} from "react-native";
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
import Modal from "react-native-modal";
import GetCardModal from "../components/GetCardModal";
const LetterGame4 = () => {
  const [write, setWrite] = useState("");
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const {word} = route.params;
  const list : string[]=hangul.disassemble(word.name);
  const click=()=>{

  }
  const [isModalVisible, setModalVisible] = useState(false);
  // @ts-ignrore
  useEffect(()=>{
    if(word.name===write){
      setModalVisible(true);

    }
  }, [write])

  return (
    <ContainerBg source={require("../../assets/background/game/fruit.png")}>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor="rgba(0, 0, 0, 0.5)"
        isVisible={isModalVisible}
        onBackButtonPress={() => {
          setModalVisible(false);
        }} // onRequestClose 대신 onBackButtonPress 사용
        backdropTransitionOutTiming={0}
        statusBarTranslucent={true} // 이 옵션을 사용하여 상태 표시줄을 숨깁니다.
      >
        <GetCardModal nextScreen="Main" word={word}></GetCardModal>
      </Modal>
      <ContainerA>
        <Text style={{fontSize:20, fontFamily:"BMJUA", textAlign:"center"}}>{word.name}</Text>
        <Text style={{textAlign:"center", fontFamily:"BMJUA"}}>적은 글자 : {write}</Text>

      </ContainerA>
      <LetterCanvas list={list}
                        pointer={0}
                        alpha={false}
                        // @ts-ignore
                        setWrite={setWrite}></LetterCanvas>
    </ContainerBg>
  );
}

const ContainerA = styled.View`
 position: absolute;
  top: 0;
  left: 0;
  width: 20%;
  height: 20%;
  z-index: 4;
  justify-content: center;
`

export default LetterGame4;
