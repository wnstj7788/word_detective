import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "./Header";
import { MenuBtn } from "../../styles/globalStyles";
import { Container, ContainerBg } from "../../styles/globalStyles";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserAPI } from "../../utils/api";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [userId, setUserId] = useState(0); //유저아이디
  const [userPicture, setUserPicture] = useState(0); //그림 맞추기 클리어 정도
  const [userWord, setUserWord] = useState(0); //단어 맞추기 클리어 정도
  const [userLetter, setUserLetter] = useState(0); //단어 나누기 클리어 정도
  let isNewUser = false; //새로운 유저인가?

  //로컬 스토리지에서 가져오기
  const getData = () => AsyncStorage.getItem("wd-user-id");
  //로컬 스토리지에 userId 저장하기
  const storeData = (value: number) => AsyncStorage.setItem("wd-user-id", value.toString());

  //로컬 스토리지에서 유저 아이디 확인하는 함수
  const getUserId = () => {
    //로컬 스토리지에 userId가 있는지 확인
    getData().then(res => {
      // console.log(res);
      // setUserId(res); //userId세팅
    });
    //없으면: api 호출해서 UUID 받아오기
    if (userId === 0) {
      isNewUser = true;
      // console.log("id없음");
      const promise = UserAPI.getById();
      promise.then(res => {
        // console.log(res.data.id);
        setUserId(res.data.id); //api 호출 결과로 UUID 받아와서 세팅
      });
    }
    console.log(userId);
    // -> 다시 api 호출해서 유저 정보 가져오기
  };

  //userId가 세팅 된 후 스테이지 클리어 정보 가져오기
  useEffect(() => {
    if (userId === 0) return;
    //uuid를 로컬 스토리지에 저장
    //일단 항상 저장하도록 해놨는데, 이미 있는 경우에는 할 필요 없는듯
    storeData(userId);
    //저장한 uuid로 다시 api 호출해서 유저 정보 가져오기
    const promise = UserAPI.getById(userId);
    promise.then(res => {
      console.log(res.data);
      setUserPicture(res.data.picture);
      setUserWord(res.data.word);
      setUserLetter(res.data.letter);
    });
  }, [userId]);

  //TODO: 유저 아이디와 클리어 정보를 리덕스에 저장

  //모든 처리 후 튜토리얼 또는 메인 화면으로 이동
  // navigation.navigate("TutorialOne")

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg source={require("../../assets/background/main/mainBackground.png")}>
          <TouchableWithoutFeedback onPress={() => getUserId()}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 20 }}>
                <LoginGroupImg
                  source={require("../../assets/etc/loginGroup.png")}
                  resizeMode="contain"
                />
                <MainLogo source={require("../../assets/etc/mianLogo.png")} resizeMode="contain" />
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
export default Login;

const TouchableWithoutFeedback = styled.TouchableOpacity`
  flex: 1;
`;

const LoginGroupImg = styled.Image`
  position: absolute;
  width: 800px;
  height: 360px;
  left: 0px;
  top: 0px;
`;

const MainLogo = styled.Image`
  position: absolute;
  width: 291px;
  height: 204px;
  left: 247px;
  top: 105px;
`;
