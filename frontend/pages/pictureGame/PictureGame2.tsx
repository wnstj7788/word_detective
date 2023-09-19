import { View, Text, Image, ImageBackground } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../etc/Header";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import Canvas from "./Canvas";
import QuestionCard from "../components/QuestionCard";
import MiniCard from "../components/MiniCard";
import { ICard } from "../../types/types";
import OXCard from "../components/OXCard";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "PictureGame2">;

const PictureGame2 = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params;
  console.log(word);
  const Word1Type: ICard = {
    pictureHidden: false, //그림 숨기기
    wordHidden: false, //글씨는 숨기지 않음
    wordHiddenIndx: 1, //글씨를 숨긴다면 몇번째 인덱스의 글씨를 숨기는지(0부터시작)
  };

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg source={require("../../assets/background/game/fruit.png")}>
          <ContentContainer>
            <QCardContainer>
              <QCardContainer>
                <QuestionCard word={word} type={Word1Type} />
              </QCardContainer>
            </QCardContainer>
            <ACardContainer>
              <MiniCard word={word} isFront={true} />
              <OXCard word={word} isFront={true} />
              <OXCard word={word} isFront={false} />
            </ACardContainer>
          </ContentContainer>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default PictureGame2;

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
