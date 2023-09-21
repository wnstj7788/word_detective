import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useCachedResources from "../../hooks/useCachedResources";
import { BtnContainer } from "../../styles/globalStyles";
import styled from "styled-components/native";
import { IStage } from "../../types/types";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const StageCard = (props: { stage: IStage; gameType: string }) => {
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();
  function getImage(name: string): any {
    switch (name) {
      case "사과":
        return require("../../assets/card/fruit/apple.png");
      case "오렌지":
        return require("../../assets/card/fruit/orange.png");
      case "수박":
        return require("../../assets/card/fruit/watermelon.png");
      case "토마토":
        return require("../../assets/card/fruit/tomato.png");
      case "체리":
        return require("../../assets/card/fruit/cherry.png");
      case "바나나":
        return require("../../assets/card/fruit/banana.png");
      case "딸기":
        return require("../../assets/card/fruit/strawberry.png");
      case "멜론":
        return require("../../assets/card/fruit/melon.png");
      case "복숭아":
        return require("../../assets/card/fruit/peach.png");
      case "포도":
        return require("../../assets/card/fruit/grapes.png");
    }
  }

  if (isLoaded) {
    //gameType에 따라 스테이지로 연결
    return (
      <CardContainer
        onPress={() => {
          if (props.gameType === "picture") {
            return navigation.navigate("PictureGame1", { word: props.stage.word });
          } else if (props.gameType === "word") {
            return navigation.navigate("WordGame1", { word: props.stage.word });
          } else if (props.gameType === "letter") {
            return navigation.navigate("LetterGame1", { word: props.stage.word });
          } else {
            return null;
          }
        }}
      >
        {props.stage.clear ? (
          <FullStar source={require("../../assets/etc/star1.png")} />
        ) : (
          <EmptyStar source={require("../../assets/etc/star2.png")} />
        )}
        <StageImgWrap>
          <StageImg source={getImage(props.stage.word.name)} resizeMode={"contain"}></StageImg>
        </StageImgWrap>
        <StageText key={props.stage.word.name}>{props.stage.word.name}</StageText>
      </CardContainer>
    );
  } else {
    return null;
  }
};
export default StageCard;

// 스테이지 카드 전체 Container
const CardContainer = styled(BtnContainer)`
  width: 168px;
  height: 251px;
  background-color: white;
  margin: 30px;
  border-radius: 20px;
  elevation: 5;
  shadow-radius: 20px;
`;

// 스테이지 별
const FullStar = styled.Image`
  position: absolute;
  top: -30px;
  right: -30px;
  z-index: 10px;
`;
const EmptyStar = styled.Image`
  position: absolute;
  top: -30px;
  right: -30px;
  z-index: 10;
`;

// 스테이지 카드
const StageImgWrap = styled.View`
  width: 140px;
  height: 140px;
  background-color: beige;
  border-radius: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const StageImg = styled.Image`
  width: 120px;
  height: 120px;
`;

const StageText = styled.Text`
  font-size: 40px;
  font-family: "BMJUA";
`;
