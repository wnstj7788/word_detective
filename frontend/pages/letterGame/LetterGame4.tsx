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
import LetterCanvas from "./LetterCanvas";
type StagePageRouteProp = RouteProp<RootStackParamList, "LetterGame2">;
// @ts-ignore
import * as hangul from "hangul-js";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
import axios from "axios";
import Modal from "react-native-modal";
import GetCardModal from "../components/GetCardModal";
import { UserAPI } from "../../utils/api";
import useAppSelector from "../../store/useAppSelector";
import { useDispatch } from "react-redux";
import { login } from "../../store/user";
import Incorrect from "./Incorrect";

const LetterGame4 = () => {
  const [write, setWrite] = useState("");
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params;
  const list: string[] = hangul.disassemble(word.name);
  const click = () => {};
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useAppSelector(state => state.user.value);
  const dispatch = useDispatch();
  // 로티
  const [showIncorrect, setShowIncorrect] = useState(false); // 상태 추가
  const Incorrectfeature = () => {
    setShowIncorrect(true);
    setTimeout(() => {
      setShowIncorrect(false);
    }, 2000); // 1초 후에 setShowBoom(false)를 호출하여 1초 동안 보이고 사라지도록 함
  };
  // @ts-ignrore
  useEffect(() => {
    if (write) {
      if (word.name === write) {
        //이미 클리어한 스테이지 클리어 시 모달만 열고 api 호출 안함
        if (user.letter >= word.id) {
          setModalVisible(true);
          return;
        }
        //api연결
        UserAPI.stageClear({ ...user, letter: word.id })
          .then(res => {
            dispatch(login(res.data));
          })
          .then(() => {
            //모달 오픈
            setModalVisible(true);
          })
          .catch(e => {
            console.log("스테이지 클리어 api 관련 에러 발생: ", e);
          });
      } else {
        Incorrectfeature();
      }
    }
  }, [write]);

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

      <IncorrectContainer>{showIncorrect && <Incorrect />}</IncorrectContainer>
      <LetterCanvas
        list={list}
        pointer={0}
        alpha={false}
        // @ts-ignore
        word={word}
        setWrite={setWrite}
      ></LetterCanvas>
    </ContainerBg>
  );
};

export default LetterGame4;
const ContainerA = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 20%;
  height: 20%;
  z-index: 4;
  justify-content: center;
`;
const IncorrectContainer = styled.View`
  position: absolute;
  top: 10%;
  justify-content: center;
  right: 30%;
  z-index: 4;
`;
