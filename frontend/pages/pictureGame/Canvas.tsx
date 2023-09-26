import React, { useRef, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  InteractionManager,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Svg, Path } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import QuestionCard from "../components/QuestionCard";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { height, width } = Dimensions.get("window");

const Canvas = () => {
  const [paths, setPaths] = useState([]);
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);
  const [capturedImageURI, setCapturedImageURI] = useState(null);
  const svgRef = useRef(null);
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleTouchStart = useCallback(event => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const startPoint = `M${locationX.toFixed(0)},${locationY.toFixed(0)} `;
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
            <Path
              d={paths.join("")}
              stroke={isClearButtonClicked ? "transparent" : "black"}
              fill={"transparent"}
              strokeWidth={3}
              strokeLinejoin={"round"}
              strokeLinecap={"round"}
            />
            <Text>사과를 그려보세요</Text>
          </Svg>
        </View>
      </ViewShot>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>

      {/* 미리보기 버튼 (확인용) */}
      {/* <TouchableOpacity style={styles.captureButton} onPress={captureSVG}>
        <Text style={styles.captureButtonText}>Capture SVG</Text>
      </TouchableOpacity>
      {capturedImageURI && (
        <Image
          source={{ uri: capturedImageURI }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )} */}
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
