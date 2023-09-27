import React, { useEffect, useState } from "react";
import { View, Text, Image, Platform } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";
import { Container } from "../../styles/globalStyles";
import styled, { css } from "styled-components/native";
import { ICard, IWord } from "../../types/types";
import { Audio } from "expo-av";

const QuestionCard = (props: { word: IWord; type: ICard }) => {
    const isLoaded = useCachedResources();

    const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

    // 각 단어에 대한 소리 파일을 매핑
    // const soundMappings: Record<string, any> = {
    //     사과: require("../../assets/wav/사과.wav"),
    //     오렌지: require("../../assets/wav/오렌지.wav"),
    //     가위: require("../../assets/wav/가위.wav"),
    //     강아지: require("../../assets/wav/강아지.wav"),
    //     고양이: require("../../assets/wav/고양이.wav"),
    //     그릇: require("../../assets/wav/그릇.wav"),
    //     달팽이: require("../../assets/wav/달팽이.wav"),
    //     딸기: require("../../assets/wav/딸기.wav"),
    //     마우스: require("../../assets/wav/마우스.wav"),
    //     만년필: require("../../assets/wav/만년필.wav"),
    //     멜론: require("../../assets/wav/멜론.wav"),
    //     바나나: require("../../assets/wav/바나나.wav"),
    //     복숭아: require("../../assets/wav/복숭아.wav"),
    //     사자: require("../../assets/wav/사자.wav"),
    //     수박: require("../../assets/wav/수박.wav"),
    //     연필: require("../../assets/wav/연필.wav"),
    //     원숭이: require("../../assets/wav/원숭이.wav"),
    //     의자: require("../../assets/wav/의자.wav"),
    //     지우개: require("../../assets/wav/지우개.wav"),
    //     체리: require("../../assets/wav/체리.wav"),
    //     코끼리: require("../../assets/wav/코끼리.wav"),
    //     키보드: require("../../assets/wav/키보드.wav"),
    //     토끼: require("../../assets/wav/토끼.wav"),
    //     판다: require("../../assets/wav/판다.wav"),
    //     토마토: require("../../assets/wav/토마토.wav"),
    //     포도: require("../../assets/wav/포도.wav"),
    // };
    const soundMappings: Record<string, any> = {};

    switch (props.word.name) {
        case "사과":
            soundMappings[props.word.name] = require("../../assets/wav/사과.wav");
            break;
        case "오렌지":
            soundMappings[props.word.name] = require("../../assets/wav/오렌지.wav");
            break;
        case "가위":
            soundMappings[props.word.name] = require("../../assets/wav/가위.wav");
            break;
        case "강아지":
            soundMappings[props.word.name] = require("../../assets/wav/강아지.wav");
            break;
        case "고양이":
            soundMappings[props.word.name] = require("../../assets/wav/고양이.wav");
            break;
        case "그릇":
            soundMappings[props.word.name] = require("../../assets/wav/그릇.wav");
            break;
        case "달팽이":
            soundMappings[props.word.name] = require("../../assets/wav/달팽이.wav");
            break;
        case "딸기":
            soundMappings[props.word.name] = require("../../assets/wav/딸기.wav");
            break;
        case "마우스":
            soundMappings[props.word.name] = require("../../assets/wav/마우스.wav");
            break;
        case "만년필":
            soundMappings[props.word.name] = require("../../assets/wav/만년필.wav");
            break;
        case "멜론":
            soundMappings[props.word.name] = require("../../assets/wav/멜론.wav");
            break;
        case "바나나":
            soundMappings[props.word.name] = require("../../assets/wav/바나나.wav");
            break;
        case "복숭아":
            soundMappings[props.word.name] = require("../../assets/wav/복숭아.wav");
            break;
        case "사자":
            soundMappings[props.word.name] = require("../../assets/wav/사자.wav");
            break;
        case "수박":
            soundMappings[props.word.name] = require("../../assets/wav/수박.wav");
            break;
        case "연필":
            soundMappings[props.word.name] = require("../../assets/wav/연필.wav");
            break;
        case "원숭이":
            soundMappings[props.word.name] = require("../../assets/wav/원숭이.wav");
            break;
        case "의자":
            soundMappings[props.word.name] = require("../../assets/wav/의자.wav");
            break;
        case "지우개":
            soundMappings[props.word.name] = require("../../assets/wav/지우개.wav");
            break;
        case "체리":
            soundMappings[props.word.name] = require("../../assets/wav/체리.wav");
            break;
        case "코끼리":
            soundMappings[props.word.name] = require("../../assets/wav/코끼리.wav");
            break;
        case "키보드":
            soundMappings[props.word.name] = require("../../assets/wav/키보드.wav");
            break;
        case "토끼":
            soundMappings[props.word.name] = require("../../assets/wav/토끼.wav");
            break;
        case "판다":
            soundMappings[props.word.name] = require("../../assets/wav/판다.wav");
            break;
        case "토마토":
            soundMappings[props.word.name] = require("../../assets/wav/토마토.wav");
            break;
        case "포도":
            soundMappings[props.word.name] = require("../../assets/wav/포도.wav");
            break;
        default:
            // 기본값 처리 (필요에 따라 추가)
            break;
    }

    // 단어를 글자단위로 쪼갠 리스트
    let wordToLetterList: string[] = props.word.name.split("");

    function getImage(name: string): any {
        switch (name) {
            case "사과":
                return require("../../assets/card/fruit/apple.png");
            case "오렌지":
                return require("../../assets/card/fruit/orange.png");
            case "수박":
                return require("../../assets/card/fruit/watermelon.png");
            case "토마토":
                return require("../../assets/card/fruit/tomato.png");
            case "체리":
                return require("../../assets/card/fruit/cherry.png");
            case "바나나":
                return require("../../assets/card/fruit/banana.png");
            case "딸기":
                return require("../../assets/card/fruit/strawberry.png");
            case "멜론":
                return require("../../assets/card/fruit/melon.png");
            case "복숭아":
                return require("../../assets/card/fruit/peach.png");
            case "포도":
                return require("../../assets/card/fruit/grapes.png");
        }
    }

    if (isLoaded) {
        return (
            <CardContainer>
                <ImgContainer>
                    {props.type.pictureHidden ? (
                        <QmarkImage
                            source={require("../../assets/etc/qmark.png")}
                            resizeMode="contain"
                        />
                    ) : (
                        <PictureImage source={getImage(props.word.name)} />
                    )}
                </ImgContainer>
                <View>
                    {props.type.wordHidden === false ? (
                        <WordText key={props.word.name}>{props.word.name}</WordText>
                    ) : (
                        <QTextContainer>
                            {wordToLetterList
                                .slice(0, props.type.wordHiddenIndx)
                                .map((letter, index) => {
                                    return <WordText key={index}>{letter}</WordText>;
                                })}
                            <WordHiddenContainer>
                                <WordHidden>
                                    {wordToLetterList[props.type.wordHiddenIndx]}
                                </WordHidden>
                            </WordHiddenContainer>
                            {wordToLetterList
                                .slice(props.type.wordHiddenIndx + 1, wordToLetterList.length)
                                .map((letter, index) => {
                                    return <WordText key={index}>{letter}</WordText>;
                                })}
                        </QTextContainer>
                    )}
                </View>
                <SoundBtn
                    onPress={async () => {
                        console.log("clicked");

                        if (props.word !== null && soundMappings[props.word.name]) {
                            const soundObject = new Audio.Sound();
                            try {
                                console.log("소리");

                                await soundObject.loadAsync(soundMappings[props.word.name]);
                                await soundObject.playAsync();
                            } catch (error) {
                                console.error("소리 재생 중 오류 발생:", error);
                            }
                        }
                    }}
                >
                    <Image
                        source={require("../../assets/button/audioBtn.png")}
                        resizeMode="stretch"
                    />
                </SoundBtn>
            </CardContainer>
        );
    } else {
        return null;
    }
};

export default QuestionCard;

// 전체 카드 컨테이너
const CardContainer = styled(Container)`
  width: 200px;
  max-height: 300px;
  background-color: white;
  border-radius: 0 30px;
  margin: 10px auto;
  ${Platform.select({
    ios: css`
      shadow-color: black;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.5;
      shadow-radius: 10px;
    `,
    android: css`
      elevation: 5;
    `,
})}
`;

// 이미지 영역
const ImgContainer = styled.View`
  width: 175px;
  height: 175px;
  background-color: #f8f4e8;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

// 물음표 이미지
const QmarkImage = styled.Image`
  width: 100px;
  height: 100px;
`;

// 원래 카드의 이미지
const PictureImage = styled.Image`
  width: 150px;
  height: 150px;
`;

// 글씨 영역
const QTextContainer = styled.View`
  flex-direction: row;
`;

// 카드의 이름 전체 텍스트
const WordText = styled.Text`
  font-family: "BMJUA";
  font-size: 48px;
  margin-top: 5px;
`;

// 카드 이름 중 빈칸인 부분-빈칸
const WordHiddenContainer = styled.View`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 6px 3px;
`;

// 카드 이름 중 빈칸인 부분-텍스트
const WordHidden = styled.Text`
  font-family: "BMJUA";
  font-size: 44px;
  color: lightgray;
`;

// 발음 듣기 버튼
const SoundBtn = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  border: 1px solid black;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
