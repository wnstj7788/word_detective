import { View, Text } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";
import { Container, ContainerBg } from "../../styles/globalStyles";

//TODO: 배경이 스크롤되도록 변경
const Stage = ({ navigation }: any) => {
  const isLoaded = useCachedResources();
  if (isLoaded) {
    return (
      <Container>
        <ContainerBg
          source={require("../../assets/background/stage/fruit.png")}
          resizeMode="stretch"
        >
          <Text>스테이지 페이지</Text>
        </ContainerBg>
      </Container>
    );
  } else {
    return null;
  }
};
export default Stage;
