import React, { useRef, useState, useCallback, useEffect } from "react";
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
import { Svg, Path, Circle, G } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import QuestionCard from "../components/QuestionCard";
import { RootStackParamList } from "../../App";
type StagePageRouteProp = RouteProp<RootStackParamList, "LetterCanvas">;
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { height, width } = Dimensions.get("window");
const fontSize = width * 0.2;
import * as ImageManipulator from "expo-image-manipulator";

// 여기부터 인덱스
export const strokes = {
  ㄱ: [
    { start: { x: 50, y: 50 }, end: { x: 150, y: 50 }, id: 1 },
    { start: { x: 150, y: 50 }, end: { x: 150, y: 150 }, id: 2 },
  ],
  ㄴ: [
    { start: { x: 50, y: 50 }, end: { x: 50, y: 150 }, id: 1 },
    { start: { x: 50, y: 150 }, end: { x: 150, y: 150 }, id: 2 },
  ],
  ㄷ: [
    { start: { x: 50, y: 50 }, end: { x: 150, y: 50 }, id: 1 },
    { start: { x: 150, y: 50 }, end: { x: 150, y: 150 }, id: 2 },
    { start: { x: 50, y: 150 }, end: { x: 150, y: 150 }, id: 3 },
  ],
  ㄹ: [
    { start: { x: 50, y: 50 }, end: { x: 100, y: 50 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 50, y: 100 }, id: 2 },
    { start: { x: 50, y: 100 }, end: { x: 100, y: 100 }, id: 3 },
  ],
  ㅁ: [
    { start: { x: 50, y: 50 }, end: { x: 100, y: 50 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 100, y: 100 }, id: 2 },
    { start: { x: 100, y: 100 }, end: { x: 50, y: 100 }, id: 3 },
    { start: { x: 50, y: 100 }, end: { x: 50, y: 50 }, id: 4 },
  ],
  ㅂ: [
    { start: { x: 50, y: 50 }, end: { x: 100, y: 50 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 100, y: 100 }, id: 2 },
    { start: { x: 100, y: 100 }, end: { x: 50, y: 100 }, id: 3 },
    { start: { x: 50, y: 100 }, end: { x: 50, y: 50 }, id: 4 },
    { start: { x: 75, y: 50 }, end: { x: 75, y: 100 }, id: 5 },
  ],
  ㅅ: [
    { start: { x: 50, y: 50 }, end: { x: 100, y: 100 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 50, y: 100 }, id: 2 },
  ],
  ㅇ: [
    { start: { x: 50, y: 50 }, end: { x: 100, y: 50 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 100, y: 100 }, id: 2 },
    { start: { x: 100, y: 100 }, end: { x: 50, y: 100 }, id: 3 },
    { start: { x: 50, y: 100 }, end: { x: 50, y: 50 }, id: 4 },
  ],
  ㅈ: [
    { start: { x: 50, y: 50 }, end: { x: 100, y: 100 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 50, y: 100 }, id: 2 },
    { start: { x: 75, y: 75 }, end: { x: 75, y: 150 }, id: 3 },
  ],
  ㅊ: [
    { start: { x: 50, y: 50 }, end: { x: 100, y: 100 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 50, y: 100 }, id: 2 },
    { start: { x: 75, y: 75 }, end: { x: 75, y: 150 }, id: 3 },
  ],
  ㅋ: [
    { start: { x: 50, y: 50 }, end: { x: 50, y: 150 }, id: 1 },
    { start: { x: 50, y: 100 }, end: { x: 75, y: 50 }, id: 2 },
    { start: { x: 50, y: 100 }, end: { x: 75, y: 150 }, id: 3 },
  ],
  ㅌ: [
    { start: { x: 50, y: 50 }, end: { x: 100, y: 50 }, id: 1 },
    { start: { x: 75, y: 50 }, end: { x: 75, y: 150 }, id: 2 },
  ],
  ㅍ: [
    { start: { x: 50, y: 75 }, end: { x: 100, y: 50 }, id: 1 },
    { start: { x: 50, y: 75 }, end: { x: 100, y: 100 }, id: 2 },
  ],
  ㅎ: [
    { start: { x: 50, y: 50 }, end: { x: 75, y: 75 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 75, y: 75 }, id: 2 },
    { start: { x: 75, y: 75 }, end: { x: 75, y: 150 }, id: 3 },
  ],

  ㅏ: [
    { start: { x: 75, y: 50 }, end: { x: 75, y: 150 }, id: 1 },
    { start: { x: 75, y: 100 }, end: { x: 125, y: 100 }, id: 2 },
  ],
  ㅐ: [
    { start: { x: 75, y: 50 }, end: { x: 75, y: 150 }, id: 1 },
    { start: { x: 75, y: 100 }, end: { x: 125, y: 100 }, id: 2 },
    { start: { x: 125, y: 75 }, end: { x: 150, y: 125 }, id: 3 },
  ],
  ㅑ: [
    { start: { x: 50, y: 50 }, end: { x: 50, y: 150 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 100, y: 150 }, id: 2 },
    { start: { x: 75, y: 100 }, end: { x: 125, y: 100 }, id: 3 },
  ],
  ㅒ: [
    { start: { x: 50, y: 50 }, end: { x: 50, y: 150 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 100, y: 150 }, id: 2 },
    { start: { x: 75, y: 100 }, end: { x: 125, y: 100 }, id: 3 },
    { start: { x: 125, y: 75 }, end: { x: 150, y: 125 }, id: 4 },
  ],
  ㅓ: [
    { start: { x: 75, y: 50 }, end: { x: 75, y: 150 }, id: 1 },
    { start: { x: 25, y: 100 }, end: { x: 75, y: 100 }, id: 2 },
  ],
  ㅔ: [
    { start: { x: 75, y: 50 }, end: { x: 75, y: 150 }, id: 1 },
    { start: { x: 25, y: 100 }, end: { x: 75, y: 100 }, id: 2 },
    { start: { x: 25, y: 75 }, end: { x: 50, y: 125 }, id: 3 },
  ],
  ㅕ: [
    { start: { x: 50, y: 50 }, end: { x: 50, y: 150 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 100, y: 150 }, id: 2 },
    { start: { x: 25, y: 100 }, end: { x: 75, y: 100 }, id: 3 },
  ],
  ㅖ: [
    { start: { x: 50, y: 50 }, end: { x: 50, y: 150 }, id: 1 },
    { start: { x: 100, y: 50 }, end: { x: 100, y: 150 }, id: 2 },
    { start: { x: 25, y: 100 }, end: { x: 75, y: 100 }, id: 3 },
    { start: { x: 25, y: 75 }, end: { x: 50, y: 125 }, id: 4 },
  ],
  ㅗ: [
    { start: { x: 75, y: 50 }, end: { x: 75, y: 100 }, id: 1 },
    { start: { x: 75, y: 75 }, end: { x: 125, y: 75 }, id: 2 },
  ],
  ㅘ: [
    { start: { x: 75, y: 50 }, end: { x: 75, y: 100 }, id: 1 },
    { start: { x: 75, y: 75 }, end: { x: 125, y: 75 }, id: 2 },
    { start: { x: 75, y: 100 }, end: { x: 125, y: 100 }, id: 3 },
  ],
  ㅙ: [
    { start: { x: 75, y: 50 }, end: { x: 75, y: 100 }, id: 1 },
    { start: { x: 75, y: 75 }, end: { x: 125, y: 75 }, id: 2 },
    { start: { x: 75, y: 100 }, end: { x: 125, y: 100 }, id: 3 },
    { start: { x: 125, y: 75 }, end: { x: 150, y: 125 }, id: 4 },
  ],
  ㅛ: [
    { start: { x: 50, y: 75 }, end: { x: 50, y: 125 }, id: 1 },
    { start: { x: 100, y: 75 }, end: { x: 100, y: 125 }, id: 2 },
    { start: { x: 75, y: 50 }, end: { x: 125, y: 50 }, id: 3 },
  ],
  ㅜ: [
    { start: { x: 75, y: 100 }, end: { x: 75, y: 150 }, id: 1 },
    { start: { x: 75, y: 125 }, end: { x: 125, y: 125 }, id: 2 },
  ],
  ㅝ: [
    { start: { x: 75, y: 100 }, end: { x: 75, y: 150 }, id: 1 },
    { start: { x: 75, y: 125 }, end: { x: 125, y: 125 }, id: 2 },
    { start: { x: 25, y: 125 }, end: { x: 75, y: 125 }, id: 3 },
  ],
  ㅞ: [
    { start: { x: 75, y: 100 }, end: { x: 75, y: 150 }, id: 1 },
    { start: { x: 75, y: 125 }, end: { x: 125, y: 125 }, id: 2 },
    { start: { x: 25, y: 125 }, end: { x: 75, y: 125 }, id: 3 },
    { start: { x: 25, y: 115 }, end: { x: 50, y: 135 }, id: 4 },
  ],
  ㅠ: [
    { start: { x: 50, y: 125 }, end: { x: 50, y: 175 }, id: 1 },
    { start: { x: 100, y: 125 }, end: { x: 100, y: 175 }, id: 2 },
    { start: { x: 75, y: 100 }, end: { x: 125, y: 100 }, id: 3 },
  ],
  ㅡ: [{ start: { x: 50, y: 125 }, end: { x: 150, y: 125 }, id: 1 }],
  ㅢ: [
    { start: { x: 50, y: 125 }, end: { x: 150, y: 125 }, id: 1 },
    { start: { x: 100, y: 100 }, end: { x: 100, y: 150 }, id: 2 },
  ],
};

// @ts-ignore
const LetterCanvas = ({ list, alpha, pointer, setWrite, setPointer }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [paths, setPaths] = useState([]);
  const route = useRoute<StagePageRouteProp>();
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);
  const svgRef = useRef(null);
  const navigation = useNavigation<RootStackNavigationProp>();

  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const currentJamo = list[pointer];
  const currentWordStrokes = strokes[currentJamo] || [];

  // @ts-ignore
  const handleTouchStart = useCallback(
    event => {
      setIsDrawing(true);
      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;

      const currentStrokeStart = currentWordStrokes[currentStrokeIndex]?.start;
      if (
        currentStrokeStart &&
        Math.abs(currentStrokeStart.x - locationX) < 15 &&
        Math.abs(currentStrokeStart.y - locationY) < 15
      ) {
        const startPoint = `M${locationX.toFixed(0)},${locationY.toFixed(0)} `;
        setPaths(prev => [...prev, startPoint]);
      } else {
        setIsDrawing(false);
      }
    },
    [currentStrokeIndex]
  );

  // @ts-ignore
  const handleTouchMove = useCallback(
    event => {
      if (!isDrawing) return; // 추가된 부분

      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;

      const currentStrokeEnd = currentWordStrokes[currentStrokeIndex]?.end;
      const newPoint = `L${locationX.toFixed(0)},${locationY.toFixed(0)} `;
      setPaths(prev => [...prev, newPoint]);

      if (
        currentStrokeEnd &&
        Math.abs(currentStrokeEnd.x - locationX) < 15 &&
        Math.abs(currentStrokeEnd.y - locationY) < 15
      ) {
        setCurrentStrokeIndex(prev => prev + 1);
        console.log(currentStrokeIndex);
        console.log(currentWordStrokes.length);

        if (currentStrokeIndex === currentWordStrokes.length - 1) {
          setPointer(prevPointer => prevPointer + 1);
          setCurrentStrokeIndex(0);
        }
      }
    },
    [currentStrokeIndex, isDrawing]
  );

  const handleTouchEnd = () => {
    setIsDrawing(false); // Stop drawing
  };
  const handleClearButtonClick = () => {
    setPaths([]);
    setClearButtonClicked(true);
    InteractionManager.runAfterInteractions(() => {
      setClearButtonClicked(false);
    });
  };

  // @ts-ignore
  return (
    <View style={[styles.container]}>
      <ViewShot style={{ backgroundColor: backgroundColor, width: "100%", borderRadius: 5 }}>
        <View
          style={styles.svgContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <View
            style={styles.svgOverlay}
            onStartShouldSetResponder={() => true}
            onResponderStart={handleTouchEnd}
          />
          <Svg style={{ zIndex: 2 }} height={height} width={width}>
            <Text style={styles.guideline}>{alpha ? list[pointer] : ""}</Text>
            <Path
              d={paths.join("")}
              stroke={isClearButtonClicked ? "transparent" : "black"}
              fill={"transparent"}
              strokeWidth={3}
              strokeLinejoin={"round"}
              strokeLinecap={"round"}
            />
            {currentWordStrokes.map(
              (stroke, index) =>
                index === currentStrokeIndex && (
                  <React.Fragment key={stroke.id}>
                    <Circle cx={stroke.start.x} cy={stroke.start.y} r={10} fill="yellow" />
                    <Circle cx={stroke.end.x} cy={stroke.end.y} r={10} fill="yellow" />
                  </React.Fragment>
                )
            )}
          </Svg>
        </View>
      </ViewShot>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
          <Text style={styles.clearButtonText}>지우기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LetterCanvas;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    // borderRadius: 20,
  },
  svgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  guideline: {
    textAlign: "auto",
    fontSize: fontSize,
    justifyContent: "center",
    color: "lightgray",
    opacity: 0.5,
  },
  svgContainer: {
    position: "relative",
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: "black",
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
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButton: {
    marginTop: 10,
    backgroundColor: "#00C851", // or any color of your choice
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  captureButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  captureButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
