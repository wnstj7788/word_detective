import { View, Text } from "react-native";
import Header from "../etc/Header";
const LetterLobby = ({ navigation }: any) => {
  return (
    <View>
      <Header navigation={navigation} />
      <Text>단어 쪼개기의 로비화면</Text>
    </View>
  );
};
export default LetterLobby;
