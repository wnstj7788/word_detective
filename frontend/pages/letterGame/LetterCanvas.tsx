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
import { Svg, Path } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import QuestionCard from "../components/QuestionCard";
import { RootStackParamList } from "../../App";
type StagePageRouteProp = RouteProp<RootStackParamList, "LetterCanvas">;
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { height, width } = Dimensions.get("window");
const fontSize = width * 0.2;
import axios from "axios/index";
import * as ImageManipulator from "expo-image-manipulator";
// @ts-ignore
const LetterCanvas = ({ list, alpha, pointer, setWrite }) => {
  const canvasRef = useRef(null);
  const getBase64Data = () => {
    const canvas = canvasRef.current;
    // @ts-ignore
    return canvas.toDataURL("image/jpeg"); // Use "image/png" for PNG format
  };
  const [isDrawing, setIsDrawing] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [paths, setPaths] = useState([]);
  const route = useRoute<StagePageRouteProp>();
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);
  const [capturedImageURI, setCapturedImageURI] = useState(null);
  const svgRef = useRef(null);
  const navigation = useNavigation<RootStackNavigationProp>();
  // @ts-ignore
  const handleTouchStart = useCallback(event => {
    setIsDrawing(true);
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const startPoint = `M${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    // @ts-ignore
    setPaths(prev => [...prev, startPoint]);
  }, []);

  // @ts-ignore
  const handleTouchMove = useCallback(
    event => {
      if (!isDrawing) return; // Only draw if currently drawing

      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;
      // if (locationX < width*0.03 || locationY < height*0.07 || locationX > width * 0.7 || locationY > height * 0.65) {
      //   return;
      // }
      const newPoint = `${locationX.toFixed(0)},${locationY.toFixed(0)} `;

      // @ts-ignore
      setPaths(prev => [...prev, newPoint]);
    },
    [isDrawing]
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
  const click = () => {
    setCapturedImageURI();
  };
  const sendData = async () => {
    try {
      const base64Image = await captureSVG();
      const headers = {
        "X-OCR-SECRET": secret,
        "Content-Type": "application/json",
      };

      const data = {
        version: "V2",
        requestId: "4f2c1236-4602-425c-9746-3e74a7c9f91e",
        timestamp: 0,
        lang: "ko",
        images: [
          {
            format: "jpg",
            name: "대전_1반_이준혁",
            data: capturedImageURI,
          },
        ],
        enableTableDetection: false,
      };

      const response = await axios.post(
        "https://x8wazqw014.apigw.ntruss.com/custom/v1/25237/1a57d725f064d05214708ee47c86e5053efc08951c72020eb8b2a910bbb972ca/general",
        data,
        { headers }
      );
      if (response.data.images[0].fields[0].inferText) {
        let fulltext = "";
        // @ts-ignore
        response.data.images[0].fields.map(item => {
          fulltext += item.inferText;
        });
        console.log(fulltext);
        setWrite(fulltext);
      } else {
        setWrite("다시 입력해주세요");
      }
    } catch (error) {
      // @ts-ignore
      console.error("Error response:", error.response.data);
    }
  };
  const captureSVG = () => {
    // @ts-ignore
    setBackgroundColor("white");
    svgRef.current.capture().then(uri => {
      setCapturedImageURI(uri);
      console.log(uri);

      setBackgroundColor("transparent");
    });


  };
  useEffect(() => {
    sendData();
  }, [capturedImageURI]);

  // @ts-ignore
  return (
    <View style={[styles.container]}>
      <ViewShot
        ref={svgRef}
        options={{ format: "jpg", quality: 0.2, result: "base64" }}
        style={{ backgroundColor: backgroundColor, width: "100%", borderRadius: 5 }}
      >
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
          </Svg>
        </View>
      </ViewShot>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
          <Text style={styles.clearButtonText}>지우기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={captureSVG}>
          <Text style={styles.captureButtonText}>정답</Text>
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
    backgroundColor: "#00C851",
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
