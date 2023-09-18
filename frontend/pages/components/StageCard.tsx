import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import useCachedResources from "../../hooks/useCachedResources";
import { BtnContainer } from "../../styles/globalStyles";
import styled from "styled-components/native";
import { IStage } from "../../types/types";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const StageCard = (props: { stage: IStage }) => {
  console.dir(props.stage);
  const isLoaded = useCachedResources();
  const navigation = useNavigation<RootStackNavigationProp>();

  if (isLoaded) {
    return (
      <CardContainer onPress={() => navigation.navigate("PictureLobby")}>
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
