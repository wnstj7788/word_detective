import { View, Text, Image } from "react-native";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useCachedResources from "../../hooks/useCachedResources";
import { BtnContainer } from "../../styles/globalStyles";
import styled, { css } from "styled-components/native";
import { IWord } from "../../types/types";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const QuestionCard = (props: { word: IWord }) => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();

  if (isLoaded) {
    return (
      <CardContainer>
        <ImgContainer>
          <QmarkImage source={require("../../assets/etc/qmark.png")} resizeMode="stretch" />
        </ImgContainer>
        <WordText key={props.word.name}>{props.word.name}</WordText>
        <SoundBtn>
          <Image source={require("../../assets/button/audioBtn.png")} />
        </SoundBtn>
      </CardContainer>
    );
  } else {
    return null;
  }
};
export default QuestionCard;

const CardContainer = styled(BtnContainer)`
  width: 168px;
  max-height: 251px;
  background-color: white;
  border-radius: 0 30px;
  margin: 10px auto;
  ${Platform.select({
    ios: css`
      shadow-color: black;
      shadow-offset: {
	    width: 0,
	    height: 2,
      };
      shadow-opacity: 0.5;
      shadow-radius: 10;
    `,
    android: css`
      elevation: 5;
    `,
  })}
`;

const ImgContainer = styled.View`
  width: 150px;
  height: 150px;
  background-color: #f8f4e8;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const QmarkImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const WordText = styled.Text`
  font-family: "BMJUA";
  font-size: 40px;
  margin: 5px 0;
`;

const SoundBtn = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  border: 1px solid black;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
