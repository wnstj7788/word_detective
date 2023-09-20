import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import useCachedResources from "../../hooks/useCachedResources";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Container, ContainerBg, MenuBtn } from "../../styles/globalStyles";
import QuestionCard from "../components/QuestionCard";
import MiniCard from "../components/MiniCard";
import { ICard } from "../../types/types";
import { useState } from "react";
import GameClearModal from "../components/GameClearModal";
import Modal from "react-native-modal";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StagePageRouteProp = RouteProp<RootStackParamList, "PictureGame2">;

const PictureGame3 = () => {
  const [count, setCount] = useState(0);
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<StagePageRouteProp>();
  const { word } = route.params;
  const Word1Type: ICard = {
    pictureHidden: false, //그림 숨기기
    wordHidden: false, //글씨는 숨기지 않음
    wordHiddenIndx: 1, //글씨를 숨긴다면 몇번째 인덱스의 글씨를 숨기는지(0부터시작)
  };
  // 미니 카드
  const choiceList = ["사과", "오렌지", "사과", "오렌지", "사과", "오렌지"];
  const newCards = choiceList.map(item => {
    return {
      imgSrc: "",
      name: item,
    };
  });
  // 모달
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (isLoaded) {
    return (
      <Container>
        <Modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropColor="rgba(0, 0, 0, 0.5)"
          isVisible={isModalVisible}
          onBackButtonPress={closeModal} // onRequestClose 대신 onBackButtonPress 사용
          backdropTransitionOutTiming={0}
          statusBarTranslucent={true} // 이 옵션을 사용하여 상태 표시줄을 숨깁니다.
        >
          <GameClearModal nextScreen="PictureGame3" word={word} />
        </Modal>
        <ContainerBg source={require("../../assets/background/game/fruit.png")}>
          <ContentContainer>
            <ACardContainer>
              <ACardLine>
                {newCards.slice(0, 3).map((choice, index) => {
                  return (
                    <ACardFirst key={index}>
                      <MiniCard
                        word={choice}
                        isFront={true}
                        isTouchable={true}
                        // onClick={getMiniCardInfo}
                      />
                    </ACardFirst>
                  );
                })}
              </ACardLine>
              <ACardLine>
                {newCards.slice(3, 6).map((choice, index) => {
                  return (
                    <ACardSecond key={index}>
                      <MiniCard
                        word={choice}
                        isFront={true}
                        isTouchable={true}
                        // onClick={getMiniCardInfo}
                      />
                    </ACardSecond>
                  );
                })}
              </ACardLine>
            </ACardContainer>
            <QCardContainer>
              <QCardContainer>
                <MiniCard word={word} type={Word1Type} />
              </QCardContainer>
            </QCardContainer>
          </ContentContainer>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default PictureGame3;
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
