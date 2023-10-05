import React, { useEffect, useState } from "react";
import { View, Text, Image, Platform } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";
import { Container } from "../../styles/globalStyles";
import styled, { css } from "styled-components/native";
import { ICard, IWord } from "../../types/types";
import { Audio } from "expo-av";
import { Asset } from "expo-asset";

const QuestionCard = (props: { word: IWord; type: ICard }) => {
  const isLoaded = useCachedResources();

  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

  const soundMappings: Record<string, any> = {};

  function getSoundFile(wordName: string): any {
    switch (wordName) {
      case "사과":
        return require("../../assets/wav/apple.wav");
      case "오렌지":
        return require("../../assets/wav/orange.wav");
      case "가위":
        return require("../../assets/wav/scissors.wav");
      case "강아지":
        return require("../../assets/wav/dog.wav");
      case "고양이":
        return require("../../assets/wav/cat.wav");
      case "그릇":
        return require("../../assets/wav/bowl.wav");
      case "달팽이":
        return require("../../assets/wav/snail.wav");
      case "딸기":
        return require("../../assets/wav/strawberry.wav");
      case "마우스":
        return require("../../assets/wav/mouse.wav");
      case "만년필":
        return require("../../assets/wav/fountain_pen.wav");
      case "멜론":
        return require("../../assets/wav/melon.wav");
      case "바나나":
        return require("../../assets/wav/banana.wav");
      case "복숭아":
        return require("../../assets/wav/peach.wav");
      case "사자":
        return require("../../assets/wav/lion.wav");
      case "수박":
        return require("../../assets/wav/watermelon.wav");
      case "연필":
        return require("../../assets/wav/pencil.wav");
      case "원숭이":
        return require("../../assets/wav/monkey.wav");
      case "의자":
        return require("../../assets/wav/chair.wav");
      case "지우개":
        return require("../../assets/wav/eraser.wav");
      case "체리":
        return require("../../assets/wav/cherry.wav");
      case "코끼리":
        return require("../../assets/wav/elephant.wav");
      case "키보드":
        return require("../../assets/wav/keyboard.wav");
      case "토끼":
        return require("../../assets/wav/rabbit.wav");
      case "판다":
        return require("../../assets/wav/panda.wav");
      case "토마토":
        return require("../../assets/wav/tomato.wav");
      case "포도":
        return require("../../assets/wav/grape.wav");
      case "컵":
        return require("../../assets/wav/cup.wav");
      case "새":
        return require("../../assets/wav/bird.wav");
      case "책상":
        return require("../../assets/wav/desk.wav");
      case "개구리":
        return require("../../assets/wav/frog.wav");
      case "안경":
        return require("../../assets/wav/glasses.wav");
      case "노트북":
        return require("../../assets/wav/laptop.wav");
      case "문어":
        return require("../../assets/wav/octopus.wav");
      case "신발":
        return require("../../assets/wav/shoes.wav");
      case "칫솔":
        return require("../../assets/wav/toothbrush.wav");
      case "거북":
        return require("../../assets/wav/turtle.wav");
      default:
        // 기본값 처리 (필요에 따라 추가)
        return null;
    }
  }

  // 단어를 글자단위로 쪼갠 리스트
  let wordToLetterList: string[] = props.word.name.split("");

  if (isLoaded) {
    return (
      <CardContainer>
        <ImgContainer>
          {props.type.pictureHidden ? (
            <QmarkImage source={require("../../assets/etc/qmark.png")} resizeMode="contain" />
          ) : (
            <PictureImage source={{ uri: props.word.url }} />
          )}
        </ImgContainer>
        <View>
          {props.type.wordHidden === false ? (
            <WordText key={props.word.name}>{props.word.name}</WordText>
          ) : (
            <QTextContainer>
              {wordToLetterList.slice(0, props.type.wordHiddenIndx).map((letter, index) => {
                return <WordText key={index}>{letter}</WordText>;
              })}
              <WordHiddenContainer>
                <WordHidden>{wordToLetterList[props.type.wordHiddenIndx]}</WordHidden>
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

            if (props.word !== null) {
              const soundFile = getSoundFile(props.word.name);

              if (soundFile) {
                const soundObject = new Audio.Sound();
                try {
                  console.log("소리");
                  await soundObject.loadAsync(Asset.fromModule(soundFile));
                  await soundObject.playAsync();
                } catch (error) {
                  console.error("소리 재생 중 오류 발생:", error);
                }
              }
            }
          }}
        >
          <Image source={require("../../assets/button/audioBtn.png")} resizeMode="stretch" />
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
