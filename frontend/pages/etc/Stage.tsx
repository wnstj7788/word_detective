import { View, Text, Image } from "react-native";
import { useEffect, useInsertionEffect, useState } from "react";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Container, ContainerBg } from "../../styles/globalStyles";
import Header from "./Header";
import StageCard from "../components/StageCard";
import { IStage, IWord } from "../../types/types";
import { initialStage, initialWord } from "../../common/initialType";
import useAppSelector from "../../store/useAppSelector";
import { WordAPI } from "../../utils/api";
import { setData } from "../../store/word";
import { CATEGORY } from "../../common/const";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "Stage">;

//TODO: 배경이 스크롤되도록 변경
const Stage = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  // 네비게이션 사이를 넘어가며 전달한 param
  //gameType = letter OR word OR picture(string)
  const { gameType } = route.params;
  //redux에서 user와 stage리스트 가져오기
  const stage = useAppSelector(state => state.wordList.value);
  const user = useAppSelector(state => state.user.value);

  //TODO: api 호출해야, 현재는 임시 데이터로 사용중
  const [stageList, setStageList] = useState<IStage[]>([]);

  //유저 정보는 리덕스에 있어야 함, 유저 정보가 없다면 로그인 화면으로 이동
  if (user.userId === 0) {
    navigation.navigate("Login");
    return;
  }

  //user보고 gameType 게임의 클리어 스테이지 찾기
  const getClearStageNum = (): number => {
    if (gameType === "picture") return user.picture;
    else if (gameType === "word") return user.word;
    else if (gameType === "letter") return user.letter;
    return 0;
  };

  useEffect(() => {
    let tmpStageList: IStage[] = [];
    let tmp: IWord[] = stage.flat();
    tmp.map((word, index) => {
      tmpStageList.push({
        word: word,
        clear: index + 1 <= getClearStageNum(),
      });
    });
    setStageList(tmpStageList);
  }, [stage]);

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
            <StageListContainer horizontal showsHorizontalScrollIndicator={false}>
              {stageList.map(stage => {
                return <StageCard stage={stage} gameType={gameType} key={stage.word.id} />;
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
