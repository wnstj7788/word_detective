import {View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet} from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {useNavigation} from "@react-navigation/native";
import Header from "../etc/Header";
import {Container, ContainerBg, MenuBtn} from "../../styles/globalStyles";
import React, {useEffect, useRef} from "react";
import {Audio} from "expo-av"; // Expo Audio 라이브러리 추가
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentMusic, setCurrentMusic} from "../../store/music";
import GlobalMusicPlayer from "../../utils/globalMusicPlayer"; // GlobalMusicPlayer 컴포넌트 임포트 추가

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Main = ({route}: any) => {
    const isLoaded = useCachedResources();
    const navigation = useNavigation<RootStackNavigationProp>();
    const dispatch = useDispatch();
    const currentMusic = useSelector(selectCurrentMusic);

    const isMusicPlaying = useRef(false); // 음악이 재생 중인지 여부를 저장하는 ref


    useEffect(() => {
        // 디폴트 음악을 설정하고 재생
        playDefaultMusic();
    }, []);

    useEffect(() => {
        if (currentMusic) {
            // 컴포넌트가 언마운트될 때 음악을 정리하는 함수를 반환
            return () => {
                stopAndUnloadMusic();
            };
        }
    }, [currentMusic]);

    const playDefaultMusic = async () => {
        const defaultMusic = new Audio.Sound();

        try {
            await defaultMusic.loadAsync(
                require("../../assets/backgroundMusic/mainMusic.mp3")
            );
            await defaultMusic.setVolumeAsync(0.2); // 볼륨 조절 (0.5는 50% 볼륨을 나타냅니다)
            await defaultMusic.playAsync();
        } catch (error) {
            console.error("디폴트 음악 재생 중 오류 발생:", error);
        }
    };

    // 음악을 중지하고 언로드하는 함수
    const stopAndUnloadMusic = async () => {
        if (currentMusic) {
            try {
                console.log("노래 멈추기 및 언로드");
                await currentMusic.stopAsync();
                currentMusic.setOnPlaybackStatusUpdate(null); // 이벤트 처리기 제거
                await currentMusic.unloadAsync();
                console.log("음악 언로드 완료");
            } catch (error) {
                console.error("음악 정리 중 오류 발생:", error);
            } finally {
                isMusicPlaying.current = false;
                console.log("현재 음악 상태 " + isMusicPlaying.current);
            }
        }
    };


    const stopAndUnloadCurrentMusic = async () => {
        if (currentMusic) {
            try {
                await currentMusic.stopAsync();
                currentMusic.setOnPlaybackStatusUpdate(null);
                await currentMusic.unloadAsync();
                console.log("음악 언로드 완료");
            } catch (error) {
                console.error("음악 정리 중 오류 발생:", error);
            } finally {
                isMusicPlaying.current = false;
                console.log("현재 음악 상태 " + isMusicPlaying.current);
            }
        }
    };

    const handleNavigateToOtherScreenPictureLobby = async () => {
        await stopAndUnloadCurrentMusic();
        if (!isMusicPlaying.current) {
            dispatch(setCurrentMusic(require("../../assets/backgroundMusic/pictureGameBgMusic.mp3")));
            isMusicPlaying.current = true;
        }
        navigation.navigate("PictureLobby"); // 수정: PictureLobby로 이동
    };

    const handleNavigateToOtherScreenLetterLobby = async () => {
        await stopAndUnloadCurrentMusic();
        if (!isMusicPlaying.current) {
            dispatch(setCurrentMusic(require("../../assets/backgroundMusic/letterGameBgMusic.mp3")));
            isMusicPlaying.current = true;
        }
        navigation.navigate("LetterLobby"); // 수정: LetterLobby로 이동
    };

    const handleNavigateToOtherScreenWordLobby = async () => {
        await stopAndUnloadCurrentMusic(); // 이전 음악 정리
        navigation.navigate("WordLobby");
    };

    const soundFiles = {
        pictureMatch: require("../../assets/wav/06_그림맞추기.wav"),
        wordMatch: require("../../assets/wav/34_단어맞추기.wav"),
        wordLetter: require("../../assets/wav/35_단어나누기.wav")
        // 다른 소리 파일들을 필요에 따라 추가
    };


    const playSound = async (soundFile: string) => {
        const {sound} = await Audio.Sound.createAsync(soundFile);
        await sound.playAsync();
    };


    if (isLoaded) {
        return (
            <Container>
                <ContainerBg source={require("../../assets/background/main/mainBackground.png")}>
                    <GlobalMusicPlayer/>
                    <HeaderContainer>
                        <Header/>
                    </HeaderContainer>
                    <BtnContainer>
                        <MenuBtnDraw
                            cameFromTutorialTwo={route.params?.cameFromTutorialTwo}
                            onPress={async () => {
                                console.log("ddddd");
                                playSound(soundFiles.pictureMatch);
                                handleNavigateToOtherScreenPictureLobby();
                            }}
                        >
                            <BtnImg
                                source={require("../../assets/button/home/HomePicMatch.png")}
                                resizeMode="contain"
                            />
                            <BtnText>그림 맞추기</BtnText>
                        </MenuBtnDraw>
                        <MenuBtn onPress={async () => {
                            console.log("ddddd");
                            playSound(soundFiles.wordMatch);
                            handleNavigateToOtherScreenWordLobby();
                            // navigation.navigate("WordLobby");
                        }}>
                            <BtnImg
                                source={require("../../assets/button/home/HomeWordMatch.png")}
                                resizeMode="contain"
                            />
                            <BtnText>단어 맞추기</BtnText>
                        </MenuBtn>
                        <MenuBtn onPress={async () => {
                            playSound(soundFiles.wordLetter);
                            handleNavigateToOtherScreenLetterLobby();
                        }}>
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
                        <TouchableOpacity onPress={() => navigation.navigate("WordGame3", {
                            word: {
                                name: "바나나", imgSrc: "",
                            }
                        })}>
                            <Text> 워드게임 3 </Text>
                        </TouchableOpacity>
                    </TestContainer>
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

const MenuBtnDraw = styled(MenuBtn)<{ cameFromTutorialTwo: boolean }>`
  border: ${props => (props.cameFromTutorialTwo ? "10px solid red" : "10px solid #fef8df")};
`;
