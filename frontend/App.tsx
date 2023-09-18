import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./pages/etc/Header";
import Login from "./pages/etc/Login";
import Main from "./pages/home/Main";
import PictureLobby from "./pages/pictureGame/PictureLobby";
import PictureGame1 from "./pages/wordGame/WordGame1";

import WordLobby from "./pages/wordGame/WordLobby";
import WordGame1 from "./pages/wordGame/WordGame1";

import LetterLobby from "./pages/letterGame/LetterLobby";
import LetterGame1 from "./pages/wordGame/WordGame1";

import WordNoteMain from "./pages/wordNote/WordNoteMain";
import Stage from "./pages/etc/Stage";
import TutorialOne from "./pages/tutorial/TutorialOne";
import TutorialTwo from "./pages/tutorial/TutorialTwo";
import { IWord } from "./types/types";

//네비게이션 관련 타입. 넘겨줄 인자가 없으면 undefined, 있으면 객체로 써주기
export type RootStackParamList = {
  Home: undefined;
  Main: undefined;
  Login: undefined;
  Stage: {
    gameType: string;
  };
  PictureLobby: undefined;
  PictureGame1: {
    word: IWord;
  };
  WordLobby: undefined;
  WordGame1: {
    word: IWord;
  };
  LetterLobby: undefined;
  LetterGame1: {
    word: IWord;
  };
  WordNoteMain: undefined;
  TutorialOne: undefined;
  TutorialTwo: undefined;
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Stage" component={Stage} />
        <Stack.Screen name="PictureLobby" component={PictureLobby} />
        <Stack.Screen name="PictureGame1" component={PictureGame1} />
        <Stack.Screen name="WordLobby" component={WordLobby} />
        <Stack.Screen name="WordGame1" component={WordGame1} />
        <Stack.Screen name="LetterLobby" component={LetterLobby} />
        <Stack.Screen name="LetterGame1" component={LetterGame1} />
        <Stack.Screen name="WordNoteMain" component={WordNoteMain} />
        <Stack.Screen name="TutorialOne" component={TutorialOne} />
        <Stack.Screen name="TutorialTwo" component={TutorialTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
