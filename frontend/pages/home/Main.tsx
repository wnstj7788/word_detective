import { View, Text } from "react-native";
import styled from "styled-components/native";

const Main = ({ navigation }: any) => {
  return (
    <Container>
      <Text>홈 화면</Text>
      <MenuBtn onPress={() => navigation.navigate("PictureLobby")}>
        <Text>그림 맞추기</Text>
      </MenuBtn>
      <MenuBtn onPress={() => navigation.navigate("WordLobby")}>
        <Text>단어 맞추기</Text>
      </MenuBtn>
      <MenuBtn onPress={() => navigation.navigate("LetterLobby")}>
        <Text>단어 나누기</Text>
      </MenuBtn>
    </Container>
  );
};
export default Main;

//전체 컨테이너
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

//각 메뉴 버튼
const MenuBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: yellow;
  margin: 5px;
`;
