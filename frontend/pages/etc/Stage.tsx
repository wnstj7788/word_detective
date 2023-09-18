import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Container, ContainerBg } from "../../styles/globalStyles";
import Header from "./Header";
import StageCard from "../components/StageCard";
import { IStage } from "../../types/types";
import { initialStage } from "../initialType";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "Stage">;

//TODO: 배경이 스크롤되도록 변경
const Stage = () => {
  const isLoaded = useCachedResources();
  // const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  // 네비게이션 사이를 넘어가며 전달한 param
  //gameType = letter OR word OR picture(string)
  const { gameType } = route.params;

  //TODO: api 호출해야, 현재는 임시 데이터로 사용중
  const [stageList, setStageList] = useState<IStage[]>([initialStage]); //모임 데이터
  const wordList = [
    "사과",
    "오렌지",
    "수박",
    "토마토",
    "체리",
    "바나나",
    "딸기",
    "멜론",
    "복숭아",
    "포도",
  ];
  let testList: IStage[] = [];
  wordList.map(word => {
    let tempStage: IStage = initialStage;
    tempStage.word.name = word;
    testList.push({
      word: {
        name: word,
        imgSrc: "",
      },
      clear: false,
    });
  });

  useEffect(() => {
    setStageList(testList);
  }, []);

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg
          source={require("../../assets/background/stage/fruit.png")}
          resizeMode="stretch"
        >
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          <ContentContainer>
            <CharacterContainer>
              <Image source={require("../../assets/character/fruitCharacter.png")} />
            </CharacterContainer>
            <StageListContainer horizontal>
              {stageList.map(stage => {
                return <StageCard stage={stage} gameType={gameType} key={stage.word.name} />;
              })}
            </StageListContainer>
          </ContentContainer>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default Stage;

//헤더 컨테이너
const HeaderContainer = styled.View`
  flex: 1;
`;

//하단내용 컨테이너
const ContentContainer = styled.View`
  flex: 8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

//캐릭터 영역
const CharacterContainer = styled.View`
  flex: 1;
  padding-left: 50px;
`;

//스테이지 영역
const StageListContainer = styled.ScrollView`
  flex: 4;
`;
