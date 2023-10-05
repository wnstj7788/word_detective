import React, { useRef, useState, useCallback } from "react";
const secret = "dmtnb2x6U0dSUkl6cmt4c09MY0pGblZJYVFkenJySXA=";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  InteractionManager,
  Alert,
  ImageBackground,
} from "react-native";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Svg, Path } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import QuestionCard from "../components/QuestionCard";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { IWord } from "../../types/types";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { height, width } = Dimensions.get("window");

const Canvas = (props: { word: IWord; checkDoneFunc(value: boolean): void }) => {
  const characterCount = props.word.name.length;
  const characters = Array.from(props.word.name);

  const [paths, setPaths] = useState([]);
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);
  const [capturedImageURI, setCapturedImageURI] = useState(null);
  const svgRef = useRef(null);
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleTouchStart = useCallback(event => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const startPoint = `M${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    // @ts-ignore
    setPaths(prev => [...prev, startPoint]);
  }, []);

  const handleTouchMove = useCallback(event => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPoint = `${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    setPaths(prev => [...prev, newPoint]);
  }, []);

  const handleClearButtonClick = () => {
    setPaths([]);
    setClearButtonClicked(true);
    InteractionManager.runAfterInteractions(() => {
      setClearButtonClicked(false);
    });
  };

  const doneBtnClicked = () => {
    props.checkDoneFunc(true);
  };

  const captureSVG = () => {
    svgRef.current.capture().then(uri => {
      setCapturedImageURI(uri);
    });
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={svgRef} options={{ format: "jpg", quality: 0.9 }}>
        <View
          style={styles.svgContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <Svg height={height * 0.7} width={width}>
            <View style={styles.canvasContent}>
              {characters.map((char, index) => (
                <ImageBackground
                  source={
                    props.word.url ? { uri: props.word.url } : require("../../assets/etc/qmark.png")
                  } // 백그라운드 이미지 설정
                  key={index}
                  style={styles.charBackground}
                  resizeMode="contain"
                >
                  <Text style={styles.wordText}>{char}</Text>
                </ImageBackground>
              ))}
            </View>
            <Path
              d={paths.join("")}
              stroke={isClearButtonClicked ? "transparent" : "black"}
              fill={"transparent"}
              strokeWidth={8}
              strokeLinejoin={"round"}
              strokeLinecap={"round"}
            />
          </Svg>
          {/* 워드를 캔버스 내부에 위치시킵니다. */}
        </View>
      </ViewShot>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/etc/eraser_pink.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={doneBtnClicked}>
          <Image
            style={{ width: 40, height: 40, marginRight: 10 }}
            source={require("../../assets/etc/answer_check.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Canvas;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  svgContainer: {
    height: height * 0.7,
    width: width * 0.65,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
  },
  clearButton: {
    marginTop: 10,

    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  wordText: {
    fontSize: 150,
    fontWeight: "bold",
    textAlign: "center",
  },

  charBackground: {
    width: 150,
  },

  canvasContent: {
    height: height * 0.7,
    width: width * 0.65,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
    flexDirection: "row",
  },
  //   captureButton: {
  //     marginTop: 10,
  //     backgroundColor: "#007AFF",
  //     paddingVertical: 10,
  //     paddingHorizontal: 20,
  //     borderRadius: 5,
  //   },
  //   captureButtonText: {
  //     color: "white",
  //     fontSize: 16,
  //     fontWeight: "bold",
  //   },
});

const ClearButton = styled.TouchableOpacity`
  position: absolute;
  position: absolute;
  bottom: 50px;
  right: 50px;
  background-color: pink;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;
