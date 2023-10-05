import { View, Text, Image, ImageBackground, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import QuestionCard from "../components/QuestionCard";
import WordMiniCard from "../components/WordMiniCard";
import { ICard, IWord } from "../../types/types";
import { initialWord } from "../../common/initialType";
import { useEffect, useState } from "react";
import WordCanvas from "./WordCanvas";
import GetCardModal from "../components/GetCardModal";
import Modal from "react-native-modal";
import getBackgroundImage from "../components/BackGroundImageSelect";
import { UserAPI } from "../../utils/api";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "WordGame2">;
import useAppSelector from "../../store/useAppSelector";
import { useDispatch } from "react-redux";
import { login } from "../../store/user";

const WordGame2 = () => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params; //목표 단어
  const Word3Type: ICard = {
    pictureHidden: false, //그림 숨기기
    wordHidden: false, //글씨는 숨기지 않음
    wordHiddenIndx: 0, //글씨를 숨긴다면 몇번째 인덱스의 글씨를 숨기는지(0부터시작)
  };
  const [write, setWrite] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [clickedWord, setClickedWord] = useState<IWord>(initialWord); //클릭한 단어 정보
  const backgroundImage = getBackgroundImage(word.category);
  const user = useAppSelector(state => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(clickedWord);
  }, [clickedWord]);

  //미니카드 클릭했을 때 단어값 전달받기
  const getMiniCardInfo = (word: IWord) => {
    setClickedWord(word);
  };

  //캔버스에서 완료 버튼 클릭 시
  const checkDone = (value: boolean) => {
    //api 호출
    UserAPI.stageClear({ ...user, word: word.id })
      .then(res => {
        console.log("-----", res.data);
        dispatch(login(res.data));
      })
      .then(() => {
        //api 완료 시 모달 오픈
        setIsModalVisible(value);
      })
      .catch(e => {
        console.log(e);
      });
  };
  //클릭한 카드가 목표 단어와 같은지 확인하는 함수
  const checkAnswer = () => (word.name === clickedWord.name ? true : false);

  if (isLoaded) {
    return (
      <Container>
        <ContainerBg source={backgroundImage}>
          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropColor="rgba(0, 0, 0, 0.5)"
            isVisible={isModalVisible}
            onBackButtonPress={() => {
              setIsModalVisible(false);
            }} // onRequestClose 대신 onBackButtonPress 사용
            backdropTransitionOutTiming={0}
            statusBarTranslucent={true} // 이 옵션을 사용하여 상태 표시줄을 숨깁니다.
          >
            <GetCardModal nextScreen="WordLobby" word={word}></GetCardModal>
          </Modal>
          <ContentContainer>
            <QCardContainer>
              <QuestionCard word={word} type={Word3Type} />
            </QCardContainer>
            <ACardContainer>
              <WordCanvas word={word} checkDoneFunc={checkDone} />
            </ACardContainer>
          </ContentContainer>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default WordGame2;

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
  /* background-color: aqua; */
`;

const ACardContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
`;

const ACardLine = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const ACard = styled.View`
  width: 25%;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const ACardFirst = styled(ACard)`
  margin-bottom: 10px;
`;

const ACardSecond = styled(ACard)`
  margin-top: 10px;
`;
