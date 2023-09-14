import { View, Text } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";

const Login = ({ navigation }: any) => {
  const isLoaded = useCachedResources();
  if (isLoaded) {
    return (
      <View>
        <Text>로그인 페이지</Text>
      </View>
    );
  } else {
    return null;
  }
};
export default Login;
