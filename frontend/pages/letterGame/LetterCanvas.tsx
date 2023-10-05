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
  ActivityIndicator,
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
// @ts-ignore
const LetterCanvas = ({ list, alpha, pointer, setWrite, word }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const handleTouchMove = useCallback(
    // @ts-ignore
    event => {
      if (!isDrawing) return; // Only draw if currently drawing

      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;
      if (
        locationX < width * 0.2 ||
        locationY < height * 0.07 ||
        locationX > width * 0.8 ||
        locationY > height * 0.7
      ) {
        return;
      }
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
    // @ts-ignore
    setCapturedImageURI();
  };
  const LoadingScreen = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ fontFamily: "BMJUA" }}>검사중...</Text>
      </View>
    );
  };
  const sendData = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  const captureSVG = () => {
    // @ts-ignore
    setBackgroundColor("white");
    // @ts-ignore
    svgRef.current.capture().then(uri => {
      setCapturedImageURI(uri);

      setBackgroundColor("transparent");
    });
  };
  useEffect(() => {
    sendData();
  }, [capturedImageURI]);

  // @ts-ignore
  return (
    <View style={[styles.container]}>
      {isLoading && <LoadingScreen />}
      <Text style={{ fontSize: 50, fontFamily: "BMJUA" }}>{word.name}를 써보자!</Text>
      <ViewShot
        ref={svgRef}
        options={{ format: "jpg", quality: 0.5, result: "base64" }}
        style={{
          backgroundColor: backgroundColor,
          width: "100%",
          borderRadius: 5,
          flex: 3,
          borderColor: "blue",
        }}
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
              strokeWidth={10}
              strokeLinejoin={"round"}
              strokeLinecap={"round"}
            />
          </Svg>
        </View>
      </ViewShot>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/etc/eraser_pink.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={captureSVG}>
          <Image
            style={{ width: 40, height: 40, marginRight: 10 }}
            source={require("../../assets/etc/answer_check.png")}
          />
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
    backgroundColor: "white",
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
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  clearButton: {
    marginTop: 10,

    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButton: {
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
