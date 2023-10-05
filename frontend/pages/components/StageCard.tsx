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

  const cardStyle = {
    borderWidth: 7,
    borderColor: "white",
  };

  const getClearIcon = () => {
    if (props.stage.clear) return require("../../assets/etc/star1.png");
    else if (props.stage.canStart) return require("../../assets/etc/star2.png");
    else return require("../../assets/etc/lock.png");
  };

  if (isLoaded) {
    //gameType에 따라 스테이지로 연결
    return (
      <CardContainer
        style={cardStyle} // cardStyle을 스타일로 적용
        onPress={() => {
          // if (!props.stage.canStart) {
          //   alert("앞의 단어를 먼저 모으고 오자!");
          //   return null;
          // }
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
        <FullStar source={getClearIcon()} />
        <StageImgWrap>
          <StageImg source={{ uri: props.stage.word.url }} resizeMode={"contain"}></StageImg>
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
  max-height: 251px;
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
  z-index: 10;
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
