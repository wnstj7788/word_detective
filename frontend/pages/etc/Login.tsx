import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Container, ContainerBg } from "../../styles/globalStyles";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserAPI, WordAPI } from "../../utils/api";
import { initialUser } from "../../common/initialType";
import { useDispatch } from "react-redux";
import { login } from "../../store/user";
import useAppSelector from "../../store/useAppSelector";
import { setCurrentMusicName } from "../../store/music";
import { CATEGORY } from "../../common/const";
import { pushData } from "../../store/word";
import GlobalMusicPlayer from "../../utils/globalMusicPlayer";
import { IWord } from "../../types/types";
import SparkleAnim from "./SparkleAnim";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [loadingText, setLoadingText] = useState(""); //로딩 안내 문구
  const [user, setUser] = useState(initialUser); //유저 객체
  const [isNewUser, setIsNewUser] = useState(false); //신규 유저인가?

  //redux
  const dispatch = useDispatch();
  const userInRedux = useAppSelector(state => state.user.value);
  const stage = useAppSelector(state => state.wordList.value);

  //로컬 스토리지에서 가져오기
  const getData = () => AsyncStorage.getItem("wd-user-id");
  //로컬 스토리지에 userId 저장하기
  const storeData = (value: number) => AsyncStorage.setItem("wd-user-id", value.toString());

  // 로티
  const [shine, setShine] = useState(false); // 상태 추가
  const openShine = () => {
    setShine(true);
    setTimeout(() => {
      setShine(false);
    }, 100000); // 1초 후에 setShowBoom(false)를 호출하여 1초 동안 보이고 사라지도록 함
  };

  // 도장 애니메이션
  const scaleValue = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    dispatch(setCurrentMusicName("mainMusic")); //디폴트 음악 경로 설정
    // console.log(scaleValue);
    // // 크기를 커졌다가 줄이는 애니메이션 설정
    // Animated.sequence([
    //   Animated.timing(scaleValue, {
    //     toValue: 1.5,
    //     duration: 500,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(scaleValue, {
    //     toValue: 1,
    //     duration: 500,
    //     useNativeDriver: true,
    //   }),
    // ]).start();
    // console.log("....", scaleValue);
    openShine();
  }, []);

  //로컬 스토리지에서 유저 아이디 확인하는 함수
  const getUserId = () => {
    console.log("uuuuu::", user);
    //이 타이밍에 user에 id 값이 있음 -> 바로 메인 페이지로 이동
    if (user.id > 0) {
      //스테이지 클리어 정보가 없는가?
      if (user.picture === -1 || user.word === -1 || user.letter === -1) {
        if (isNewUser) storeData(user.id); //userId를 로컬 스토리지에 저장

        //저장한 userId로 다시 api 호출해서 유저 정보 가져오기
        const promise = UserAPI.getById(user.id);
        promise
          .then(res => {
            setUser({
              ...user,
              picture: res.data.picture,
              word: res.data.word,
              letter: res.data.letter,
              cameraPicture: res.data.cameraPicture,
              cameraWord: res.data.cameraWord,
              cameraLetter: res.data.cameraLetter,
            });
            setLoadingText("유저 정보 조회중");
          })
          .catch(e => {
            console.log("유저 기록 및 정보 조회 중 이하의 에러 발생 : ", e);
            //TODO: errorCode가 USER_NOT_FOUND면 userID가 잘못된 것 -> 에러처리 필요
          });
      }
      //스테이지 목록 정보가 없는가?
      else if (stage.length === 0) loadStage();
      else navigateNextPage();
    }
    //로컬 스토리지에 userId가 있는지 확인
    getData()
      .then(res => {
        console.log("local storage::", res);
        if (res !== null && parseInt(res) !== 0) {
          console.log("로컬에 저장된 유저 아이디: ", res);
          setUser({
            ...user,
            id: parseInt(res),
          });
        } else {
          //없으면 api 호출해서 userId 받아오기
          // isNewUser = true;
          setIsNewUser(true);
          console.log("신규유저로 가입 중");
          setLoadingText("신규유저로 가입 중");
          const promise = UserAPI.getById();
          promise
            .then(res => {
              console.log(res.data.id);
              setUser({
                ...user,
                id: parseInt(res.data.id),
              });
            })
            .catch(e => {
              console.log("신규유저 id 생성 중 이하의 에러 발생 : ", e);
            });
        }
      })
      .then(() => {
        console.log("userId 할당 완료, userId : ", user.id);
        setLoadingText("userId 할당 완료");
      });

    // -> 다시 api 호출해서 유저 정보 가져오기(아래 useEffect로)
  };

  //userId가 세팅 된 후 스테이지 클리어 정보 가져오기
  useEffect(() => {
    if (user.id === 0) return;
    if (isNewUser) storeData(user.id); //userId를 로컬 스토리지에 저장

    //저장한 userId로 다시 api 호출해서 유저 정보 가져오기
    const promise = UserAPI.getById(user.id);
    promise
      .then(res => {
        setUser({
          ...user,
          picture: res.data.picture,
          word: res.data.word,
          letter: res.data.letter,
          cameraPicture: res.data.cameraPicture,
          cameraWord: res.data.cameraWord,
          cameraLetter: res.data.cameraLetter,
        });
        setLoadingText("유저 정보 조회중");
      })
      .catch(e => {
        console.log("유저 기록 및 정보 조회 중 이하의 에러 발생 : ", e);
        //TODO: errorCode가 USER_NOT_FOUND면 userID가 잘못된 것 -> 에러처리 필요
      });
  }, [user.id]);

  //유저 아이디와 클리어 정보를 리덕스에 저장
  useEffect(() => {
    if (user.picture === -1 || user.word === -1 || user.letter === -1) return;
    console.log("유저 정보 확인 완료");
    setLoadingText("유저 정보 확인 완료");
    dispatch(login(user));
    console.log("redux에 저장 완료");
    setLoadingText("유저 정보 저장 완료");
    loadStage();
  }, [user.picture, user.word, user.letter]);

  //스테이지 목록 리덕스에 저장
  const loadStage = () => {
    console.log("스테이지 목록 redux에 저장");
    setLoadingText("스테이지 정보 로드중");
    if (stage.length === 0) {
      //프로미스 병렬처리
      const promises = CATEGORY.map((_, index) => {
        return WordAPI.getByCategory(index + 1).then(res => {
          const originArr = res.data; //단어 배열
          let newArr: IWord[] = []; //카테고리 추가한 배열
          originArr.map((word: IWord) => {
            let tmpWord: IWord = { ...word, category: index + 1 };
            newArr.push(tmpWord);
          });
          return { data: newArr };
        });
      });
      Promise.all(promises)
        .then(results => {
          results.forEach(result => {
            const { data } = result;
            dispatch(pushData(data));
          });
        })
        .catch(e => console.log("스테이지 목록 저장 중 에러 발생: ", e));
    }

    navigateNextPage();
  };

  const navigateNextPage = () => {
    console.log("스테이지 목록 저장 완료, 다음 페이지로 이동");
    setLoadingText("페이지 이동 중");
    //모든 처리 후 튜토리얼 또는 메인 화면으로 이동
    if (isNewUser) navigation.navigate("TutorialOne");
    else navigation.navigate("Main");
  };

  if (isLoaded) {
    return (
      <Container>
        <GlobalMusicPlayer />
        <ContainerBg source={require("../../assets/background/main/mainBackground.png")}>
          <AnimContainer1>{shine && <SparkleAnim />}</AnimContainer1>
          <AnimContainer2>{shine && <SparkleAnim />}</AnimContainer2>
          <TouchableWithoutFeedback onPress={() => getUserId()}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }} />
              <Animated.View style={{ flex: 20, transform: [{ scale: scaleValue }] }}>
                <LoginGroupImg
                  source={require("../../assets/etc/loginGroup.png")}
                  resizeMode="contain"
                />
                <MainLogo source={require("../../assets/etc/mianLogo.png")} resizeMode="contain" />
              </Animated.View>
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

const AnimContainer1 = styled.View`
  position: absolute;
  left: 40%;
  top: -5%;
`;

const AnimContainer2 = styled.View`
  position: absolute;
  left: 7%;
  top: -30%;
`;
