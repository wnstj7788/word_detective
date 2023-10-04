import { View, Text, Image, Animated } from "react-native";
import { useEffect, useInsertionEffect, useState, useRef } from "react";
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
import { NativeSyntheticEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { NativeScrollEvent } from "react-native/Libraries/Components/ScrollView/ScrollView";

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

  const [stageList, setStageList] = useState<IStage[]>([]);

  const [scrollPos, setScrollPos] = useState(0); //스크롤 위치(초기값은 0)
  //throttle:10 -> 10프레임 당 한 번 발생하는 이벤트
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = e.nativeEvent.contentOffset.x; //스크롤의 x축(가로) 위치
    setScrollPos(position);
  };

  const getBgUrl = () => {
    if (parseInt(scrollPos.toString()) < 2270) {
      return require("../../assets/background/stage/fruit.png");
    } else if (parseInt(scrollPos.toString()) < 4550) {
      return require("../../assets/background/stage/animal.png");
    } else {
      return require("../../assets/background/stage/thing.png");
    }
  };

  const getCharacterUrl = () => {
    if (parseInt(scrollPos.toString()) < 2270) {
      return require("../../assets/character/fruitCharacter.png");
    } else if (parseInt(scrollPos.toString()) < 4550) {
      return require("../../assets/character/fruitAnimalCharacter.png");
    } else {
      return require("../../assets/character/fruitAnimalThingCharacter.png");
    }
  };

  //유저 정보는 리덕스에 있어야 함, 유저 정보가 없다면 로그인 화면으로 이동
  if (user.userId === 0) {
    alert("유저정보 확인 불가, 로그인 화면으로 이동합니다.");
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
        <ContainerBg source={getBgUrl()} resizeMode="stretch">
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          <ContentContainer>
            <CharacterContainer scrollPos={parseInt(scrollPos.toString())}>
              <Image source={getCharacterUrl()} />
            </CharacterContainer>
            <StageListContainer
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
              onScroll={onScroll}
            >
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
const CharacterContainer = styled.View<{ scrollPos: number }>`
  flex: 1;
  justify-content: center;
  margin-left: ${props => (props.scrollPos < 2271 || props.scrollPos > 4557 ? `40px` : `0px`)};
  margin-right: ${props => (props.scrollPos < 2271 || props.scrollPos > 4557 ? `10px` : `40px`)};
  /* background-color: yellow; */
`;

//스테이지 영역
const StageListContainer = styled(Animated.ScrollView)`
  flex: 4;
`;
