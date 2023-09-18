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
          <Image
            source={require("../../assets/etc/star1.png")}
            style={{ position: "absolute", top: -30, right: -30, zIndex: 10 }}
          />
        ) : (
          <Image
            source={require("../../assets/etc/star2.png")}
            style={{ position: "absolute", top: -30, right: -30, zIndex: 10 }}
          />
        )}
        <View
          style={{
            width: 140,
            height: 140,
            backgroundColor: "beige",
            borderRadius: 20,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={getImage(props.stage.word.name)}
            style={{ width: 120, height: 120 }}
            resizeMode={"contain"}
          ></Image>
        </View>
        <Text key={props.stage.word.name} style={{ fontSize: 40, fontFamily: "BMJUA" }}>
          {props.stage.word.name}
        </Text>
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
  margin: 30px;

  border-radius: 20px;
  elevation: 5;
  shadow-radius: 20px;
`;
