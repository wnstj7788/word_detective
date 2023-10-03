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
import { Svg, Path, Circle, G, NumberProp } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import QuestionCard from "../components/QuestionCard";
import { RootStackParamList } from "../../App";

type StagePageRouteProp = RouteProp<RootStackParamList, "LetterCanvas">;
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { height, width } = Dimensions.get("window");
const fontSize = width * 0.2;
// @ts-ignore
const LetterCanvas = ({ list, alpha, pointer, setWrite, setPointer }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [paths, setPaths] = useState([]);
  const route = useRoute<StagePageRouteProp>();
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);
  const svgRef = useRef(null);
  const navigation = useNavigation<RootStackNavigationProp>();
  const [erase, setErased]= useState(false);
  // 여기부터 인덱스
  const strokes = {
    ㄱ: [
      { start: { x: width*0.185, y: height*0.445 }, end: { x: width*0.29, y: height*0.445 }, id: 1 },
      { start: { x: width*0.29, y: height*0.445 }, end: { x: width*0.29, y: height*0.6 }, id: 2 },
    ],
    ㄴ: [
      { start: { x: width*0.19, y: height*0.445 }, end: { x: width*0.19, y: height*0.6}, id: 1 },
      { start: { x: width*0.19, y: height*0.6}, end: { x: width*0.29, y: height*0.6 }, id: 2 },
    ],
    ㄷ: [
      { start: { x: width*0.19, y: height*0.445 }, end: { x: width*0.29, y: height*0.445}, id: 1 },
      { start: { x: width*0.19, y: height*0.445 }, end: { x: width*0.19, y: height*0.6}, id: 2 },
      { start: { x: width*0.19, y: height*0.6 }, end: { x: width*0.29, y: height*0.6}, id: 3 },
    ],
    ㄹ: [
      { start: { x: width*0.19, y: height*0.445 }, end: { x: width*0.29, y: height*0.445}, id: 1 },
      { start: { x: width*0.29, y: height*0.445 }, end: { x: width*0.29, y: height*0.52 }, id: 2 },
      { start: { x: width*0.19, y: height*0.52 }, end: { x: width*0.29, y: height*0.52 }, id: 3 },
      { start: { x: width*0.19, y: height*0.52 }, end: { x: width*0.19, y: height*0.595 }, id: 4 },
      { start: { x: width*0.19, y: height*0.595  }, end: { x: width*0.29, y: height*0.595 }, id: 5 },
    ],
    ㅁ: [
      { start: { x: width*0.19, y: height*0.445 }, end: { x: width*0.19, y: height*0.6}, id: 1 },
      { start: { x: width*0.19, y: height*0.445 }, end: { x: width*0.29, y: height*0.445 }, id: 2 },
      { start: { x: width*0.29, y: height*0.445 }, end: { x: width*0.29, y: height*0.6 }, id: 3 },
      { start: { x: width*0.19, y: height*0.6}, end: { x: width*0.29, y: height*0.6 }, id: 4 },
    ],
    ㅂ: [
      { start: { x: width*0.19, y: height*0.445 }, end: { x: width*0.19, y: height*0.6}, id: 1 },
      { start: { x: width*0.29, y: height*0.445 }, end: { x: width*0.29, y: height*0.6 }, id: 2 },
      { start: { x: width*0.19, y: height*0.5 }, end: { x: width*0.29, y: height*0.5 }, id: 3 },
      { start: { x: width*0.19, y: height*0.6}, end: { x: width*0.29, y: height*0.6 }, id: 4 },
    ],
    ㅅ: [
      { start: { x: width*0.24, y: height*0.44 }, end: { x: width*0.19, y: height*0.6 }, id: 1 },
      { start: { x: width*0.24, y: height*0.44 }, end: { x: width*0.29, y: height*0.6 }, id: 2 },
    ],
    ㅇ: [
      { start: { x: width*0.24, y: height*0.435 }, end: { x: width*0.185, y: height*0.52 }, id: 1 },
      { start: { x: width*0.185, y: height*0.52 }, end: { x: width*0.24, y: height*0.605 }, id: 2 },
      { start: { x: width*0.24, y: height*0.605 }, end: { x: width*0.295, y: height*0.52 }, id: 3 },
      { start: { x: width*0.295, y: height*0.52 }, end: { x: width*0.24, y: height*0.435 }, id: 4 },
    ],
    ㅈ: [
      { start: { x: width*0.185, y: height*0.445 }, end: { x: width*0.29, y: height*0.445}, id: 1 },
      { start: { x: width*0.24, y: height*0.44 }, end: { x: width*0.19, y: height*0.6 }, id: 2 },
      { start: { x: width*0.24, y: height*0.44 }, end: { x: width*0.29, y: height*0.6 }, id: 3 },
    ],
    ㅊ: [
      { start: { x: 50, y: 50 }, end: { x: 100, y: 100 }, id: 1 },
      { start: { x: 100, y: 50 }, end: { x: 50, y: 100 }, id: 2 },
      { start: { x: 75, y: 75 }, end: { x: 75, y: 150 }, id: 3 },
    ],
    ㅋ: [
      { start: { x: width*0.19, y: height*0.445 }, end: { x: width*0.29, y: height*0.445}, id: 1 },
      { start: { x: width*0.19, y: height*0.53 }, end: { x: width*0.29, y: height*0.53}, id: 2 },
      { start: { x: width*0.29, y: height*0.445 }, end: { x: width*0.29, y: height*0.6 }, id: 3 },
    ],
    ㅌ: [
      {  start: { x: width*0.19, y: height*0.445 }, end: { x: width*0.29, y: height*0.445 }, id: 1  },
      { start: { x: width*0.19, y: height*0.52 }, end: { x: width*0.29, y: height*0.52 }, id: 2 },
      { start: { x: width*0.19, y: height*0.445 }, end: { x: width*0.19, y: height*0.6}, id: 3 },
      { start: { x: width*0.19, y: height*0.6 }, end: { x: width*0.29, y: height*0.6 }, id: 4 },
    ],
    ㅍ: [
      {   start: { x: width*0.18, y: height*0.445 }, end: { x: width*0.297, y: height*0.445 }, id: 1  },
      { start: { x: width*0.21, y: height*0.445 }, end: { x: width*0.21, y: height*0.6}, id: 2 },
      { start: { x: width*0.27, y: height*0.445 }, end: { x: width*0.27, y: height*0.6}, id: 3 },
      { start: { x: width*0.19, y: height*0.6 }, end: { x: width*0.29, y: height*0.6 }, id: 4 },
    ],
    ㅎ: [
      {   start: { x: width*0.205, y: height*0.43 }, end: { x: width*0.27, y: height*0.43 }, id: 1  },
      { start: { x: width*0.18, y: height*0.48 }, end: { x: width*0.3, y: height*0.48}, id: 2 },
      { start: { x: width*0.24, y: height*0.53 }, end: { x: width*0.19, y: height*0.57}, id: 3 },
      { start: { x: width*0.19, y: height*0.57}, end: { x: width*0.24, y: height*0.62 }, id: 4 },
      { start: { x: width*0.24, y: height*0.62}, end: { x: width*0.29, y: height*0.57 }, id: 5 },
      { start: { x: width*0.29, y: height*0.57 }, end: { x: width*0.24, y: height*0.53 }, id: 6 },
    ],

    ㅏ: [
      { start: { x: width*0.223, y: height*0.4 }, end: { x: width*0.223, y: height*0.65 }, id: 1 },
      { start: { x: width*0.223, y: height*0.52 }, end: { x: width*0.28, y: height*0.52 }, id: 2 },
    ],
    ㅐ: [
      { start: { x: 75, y: 50 }, end: { x: 75, y: 150 }, id: 1 },
      { start: { x: 75, y: 100 }, end: { x: 125, y: 100 }, id: 2 },
      { start: { x: 125, y: 75 }, end: { x: 150, y: 125 }, id: 3 },
    ],
    ㅑ: [
      { start: { x: width*0.223, y: height*0.4 }, end: { x: width*0.223, y: height*0.65 }, id: 1 },
      { start: { x: width*0.223, y: height*0.47 }, end: { x: width*0.274, y: height*0.47 }, id: 2 },
      { start: { x: width*0.223, y: height*0.57 }, end: { x: width*0.274, y: height*0.57 }, id: 3 },
    ],
    ㅒ: [
      { start: { x: 50, y: 50 }, end: { x: 50, y: 150 }, id: 1 },
      { start: { x: 100, y: 50 }, end: { x: 100, y: 150 }, id: 2 },
      { start: { x: 75, y: 100 }, end: { x: 125, y: 100 }, id: 3 },
      { start: { x: 125, y: 75 }, end: { x: 150, y: 125 }, id: 4 },
    ],
    ㅓ: [
      { start: { x: width*0.257, y: height*0.4 }, end: { x: width*0.257, y: height*0.65 }, id: 1 },
      { start: { x: width*0.2, y: height*0.52 }, end: { x: width*0.257, y: height*0.52 }, id: 2 },
    ],
    ㅔ: [
      { start: { x: 75, y: 50 }, end: { x: 75, y: 150 }, id: 1 },
      { start: { x: 25, y: 100 }, end: { x: 75, y: 100 }, id: 2 },
      { start: { x: 25, y: 75 }, end: { x: 50, y: 125 }, id: 3 },
    ],
    ㅕ: [
      { start: { x: width*0.257, y: height*0.4 }, end: { x: width*0.257, y: height*0.65 }, id: 1 },
      { start: { x: width*0.208, y: height*0.47 }, end: { x: width*0.254, y: height*0.47 }, id: 2 },
      { start: { x: width*0.208, y: height*0.57 }, end: { x: width*0.254, y: height*0.57 }, id: 3 },
    ],
    ㅖ: [
      { start: { x: 50, y: 50 }, end: { x: 50, y: 150 }, id: 1 },
      { start: { x: 100, y: 50 }, end: { x: 100, y: 150 }, id: 2 },
      { start: { x: 25, y: 100 }, end: { x: 75, y: 100 }, id: 3 },
      { start: { x: 25, y: 75 }, end: { x: 50, y: 125 }, id: 4 },
    ],
    ㅗ: [
      { start: { x: width*0.24, y: height*0.43 }, end: { x: width*0.24, y: height*0.6 }, id: 1 },
      { start: { x: width*0.17, y: height*0.6 }, end: { x: width*0.31, y: height*0.6 }, id: 2 },
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
      { start: { x: width*0.21, y: height*0.445 }, end: { x: width*0.21, y: height*0.6}, id: 1 },
      { start: { x: width*0.27, y: height*0.445 }, end: { x: width*0.27, y: height*0.6}, id: 2 },
      { start: { x: width*0.17, y: height*0.6 }, end: { x: width*0.31, y: height*0.6 }, id: 3 },
    ],
    ㅜ: [
      { start: { x: width*0.17, y: height*0.445 }, end: { x: width*0.31, y: height*0.445}, id: 1 },
      { start: { x: width*0.24, y: height*0.445 }, end: { x: width*0.24, y: height*0.6 }, id: 2 },
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
      { start: { x: width*0.17, y: height*0.445 }, end: { x: width*0.31, y: height*0.445}, id: 1 },
      { start: { x: width*0.21, y: height*0.445 }, end: { x: width*0.21, y: height*0.6}, id: 2 },
      { start: { x: width*0.27, y: height*0.445 }, end: { x: width*0.27, y: height*0.6}, id: 3 },
    ],
    ㅡ: [{ start: { x: width*0.17, y: height*0.52 }, end: { x: width*0.31, y: height*0.52}, id: 1 }],
    ㅢ: [
      { start: { x: 50, y: 125 }, end: { x: 150, y: 125 }, id: 1 },
      { start: { x: 100, y: 100 }, end: { x: 100, y: 150 }, id: 2 },
    ],
    ㅣ: [{ start: { x: width*0.24, y: height*0.4 }, end: { x: width*0.24, y: height*0.65 }, id: 1 }],
  };

  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const currentJamo = list[pointer];
  // @ts-ignore
  const currentWordStrokes = strokes[currentJamo] || [];

  // @ts-ignore
  useEffect(() => {
    if (erase) {
      setPaths([]);      // Clear all paths
      setErased(false);  // Reset the erase state
      setClearButtonClicked(false);
    }
  }, [erase]);
  const handleTouchStart = useCallback(
    (event: { nativeEvent: { locationX: any; locationY: any; }; }) => {
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
        // @ts-ignore
        setPaths(prev => [...prev, startPoint]);
      } else {
        setIsDrawing(false);
      }
    },
    [currentStrokeIndex],
  );

  // @ts-ignore
  const handleTouchMove = useCallback(
    (event: { nativeEvent: { locationX: any; locationY: any; }; }) => {
      if (!isDrawing) return; // 추가된 부분

      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;

      const currentStrokeEnd = currentWordStrokes[currentStrokeIndex]?.end;
      const newPoint = `L${locationX.toFixed(0)},${locationY.toFixed(0)} `;
      // @ts-ignore
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
          setPointer((prevPointer: number) => prevPointer + 1);
          handleClearButtonClick();
          setCurrentStrokeIndex(0);
        }
      }
    },
    [currentStrokeIndex, isDrawing],
  );

  const handleTouchEnd = () => {
    setIsDrawing(false); // Stop drawing
  };
  const handleClearButtonClick = () => {
    setPaths([]);
    setClearButtonClicked(true);
    setClearButtonClicked(false);
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
              (stroke: {
                id: React.Key | null | undefined;
                start: { x: NumberProp | undefined; y: NumberProp | undefined; };
                end: { x: NumberProp | undefined; y: NumberProp | undefined; };
              }, index: number) =>
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
    position:"absolute",
    left:"15%",
    top:height*0.25,
    textAlign: "center",
    fontSize: fontSize,

    color: "lightgray",
    opacity: 0.3,
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
