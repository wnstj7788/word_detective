import { View, Text, Image } from "react-native";
import styled from "styled-components/native";

const Header = () => {
  return (
    <Container>
      <HeaderBtn></HeaderBtn>
      <Text>헤더</Text>
    </Container>
  );
};
export default Header;

//전체 컨테이너
const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: coral;
`;

//각 메뉴 버튼
const HeaderBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: yellow;
  margin: 5px;
`;
