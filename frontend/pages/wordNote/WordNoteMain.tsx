import { View, Text } from "react-native";
import styled from "styled-components/native";
import Header from "../etc/Header";
const WordNoteMain = ({ navigation }: any) => {
  return (
    <View>
      <HeaderContainer>
        <Header navigation={navigation} />
      </HeaderContainer>
      <Text>단어장 메인화면</Text>
    </View>
  );
};
export default WordNoteMain;

//헤더
const HeaderContainer = styled.View`
  flex: 1;
`;
