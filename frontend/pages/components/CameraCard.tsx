import React, {useEffect, useState} from "react";
import {View, Text, Image, Platform, TouchableOpacity } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";
import {Container} from "../../styles/globalStyles";
import styled, {css} from "styled-components/native";
import {ICard, IWord} from "../../types/types";
import {Audio} from "expo-av";
import {Asset} from 'expo-asset';

const CameraCard = (props: {
    word: {
        name: string;
        imgUrl: string
    };
    type: ICard;
    origin:string;
    navigation:any;  // 이 부분을 추가하였습니다.
}) => {    const isLoaded = useCachedResources();

    console.log(props); // props 값 전체를 콘솔에 출력

    useEffect(() => {
        console.log('Component updated');
        console.log(props.word.imgUrl);
    }, [props]);

    const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);


    const soundMappings: Record<string, any> = {};

    // 단어를 글자단위로 쪼갠 리스트
    let wordToLetterList: string[] = props.word.name.split("");

    // function getImage(url: string): any {
    //     console.log("현재 이미지 : " +  url);
    //     return { uri: url };
    //     // return {uri : "https://detective-bucket.s3.ap-northeast-2.amazonaws.com/animal/bird.png"}
    // }

    /**
     * 아니요, URL에 추가되는 타임스탬프는 쿼리 파라미터로 추가되기 때문에 서버에서 실제 이미지 리소스를 찾는 데 영향을 주지 않습니다.
     *
     * URL은 보통 다음과 같이 구성됩니다:
     *
     * protocol://hostname/path?query
     * 여기서 query 부분은 클라이언트가 서버로 보내는 추가 정보를 담고 있습니다. 대부분의 웹 서버와 애플리케이션은 이 query 부분을 무시하거나 특정 동작을 수행하기 위해 사용합니다.
     *
     * 따라서, https://example.com/image.png?timestamp=1234567890 이런 형태의 URL에서 웹 서버는 /image.png 리소스를 찾고, timestamp=1234567890 부분은 무시하거나 특정 동작(캐싱 방지 등)을 위해 사용합니다.
     * @param url
     */
    function getImage(url: string): any {
        // 현재 시간을 파라미터로 추가
        const uniqueUrl = `${url}?timestamp=${new Date().getTime()}`;
        console.log("현재 이미지 : " + uniqueUrl);
        return {uri: uniqueUrl};
    }

    const handlePress = () => {
        console.log(props.origin);
        const wordData: IWord = {
            id: 9999,
            name: props.word.name,
            url: props.word.imgUrl
        };

        if(props.origin === "PictureLobby"){
            props.navigation.navigate('PictureGame1', { word: wordData });
        } else if(props.origin === "LetterLobby") {
            props.navigation.navigate('LetterGame1', { word: wordData });
        } else if(props.origin === "WordLobby") {
            props.navigation.navigate('WordGame1', { word: wordData });
        }
    }

    if (isLoaded) {
        return (
            <TouchableOpacity onPress={handlePress}>
                <CardContainer>
                    <ImgContainer>
                        {props.type.pictureHidden ? (
                            <QmarkImage
                                source={require("../../assets/etc/qmark.png")}
                                resizeMode="contain"
                            />
                        ) : (
                            <PictureImage source={getImage(props.word.imgUrl)} resizeMode="contain"/>
                        )}
                    </ImgContainer>
                    <View>
                        {props.type.wordHidden === false || props.type.wordHiddenIndx === 0 ? ( // 첫 글자가 숨겨져 있지 않은 경우
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

                </CardContainer>
            </TouchableOpacity>
        );
    } else {
        return null;
    }

};

export default CameraCard;

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
