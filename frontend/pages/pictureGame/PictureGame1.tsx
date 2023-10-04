import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../etc/Header";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import Canvas from "./Canvas";
import QuestionCard from "../components/QuestionCard";
import { ICard } from "../../types/types";
import getBackgroundImage from "../components/BackGroundImageSelect";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "PictureGame1">;

const PictureGame1 = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params;
  const Word1Type: ICard = {
    pictureHidden: false, //그림 숨기기
    wordHidden: false, //글씨는 숨기지 않음
    wordHiddenIndx: 1, //글씨를 숨긴다면 몇번째 인덱스의 글씨를 숨기는지(0부터시작)
  };
  // 배경
  const backgroundImage = getBackgroundImage(word.category);

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg source={backgroundImage}>
          <ContentContainer>
            <QCardContainer>
              <QuestionCard word={word} type={Word1Type} />
            </QCardContainer>
            <ACardContainer>
              <Canvas word={word} />
              {/* <Boom /> */}
            </ACardContainer>
          </ContentContainer>
          <TouchableOpacity onPress={() => navigation.navigate("PictureGame2", { word: word })}>
            <Text>next</Text>
          </TouchableOpacity>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default PictureGame1;

const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const QCardContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ACardContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;
