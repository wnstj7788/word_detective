import { View, Text } from "react-native";
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
        <Text key={props.stage.word.name}>{props.stage.word.name}</Text>
      </CardContainer>
    );
  } else {
    return null;
  }
};
export default StageCard;

const CardContainer = styled(BtnContainer)`
  width: 168px;
  height: 251px;
  background-color: white;
  margin-right: 30px;
`;
