import React, { useRef, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  InteractionManager,
  Alert, ImageBackground,
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
const fontSize = width * 0.20;
// @ts-ignore
const LetterCanvas = ({ list }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const [paths, setPaths] = useState([]);
  const route = useRoute<StagePageRouteProp>();
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);
  const [capturedImageURI, setCapturedImageURI] = useState(null);
  const svgRef = useRef(null);
  const navigation = useNavigation<RootStackNavigationProp>();
  const [pointer, setPointer] = useState(0);
  const alpha=false;
  const condition=()=>{
    if(alpha){
      setPointer(pointer+1);
    }else{

    }
  }
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
  const handleTouchMove = useCallback(event => {
    if (!isDrawing) return;  // Only draw if currently drawing

    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    if (locationX < width*0.265 || locationY < height*0.1 || locationX > width * 0.7 || locationY > height * 0.95) {
      return;
    }
    const newPoint = `${locationX.toFixed(0)},${locationY.toFixed(0)} `;

    // @ts-ignore
    setPaths(prev => [...prev, newPoint]);
  }, [isDrawing]);
  const handleTouchEnd = () => {
    setIsDrawing(false);  // Stop drawing
  };
  const handleClearButtonClick = () => {
    setPaths([]);
    setClearButtonClicked(true);
    InteractionManager.runAfterInteractions(() => {
      setClearButtonClicked(false);
    });
  };

  const captureSVG = () => {
    // @ts-ignore
    svgRef.current.capture().then(uri => {
      setCapturedImageURI(uri);
    });
  };

  // @ts-ignore
  return (
    <View style={styles.container}>
      <ViewShot ref={svgRef} options={{ format: "jpg", quality: 0.9 }}>
        <View
          style={styles.svgContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Svg height={height * 0.7} width={width}>
            <Text style={styles.guideline}

            >{list[pointer]}</Text>
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
export default LetterCanvas;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  guideline:{
    textAlign:"center",
    fontSize:fontSize,
    justifyContent:"center",
    color:"lightgray",
    opacity:0.5,
  },
  svgContainer: {
    height: height * 0.7,
    width: width * 0.65,
    alignItems:"center",
    justifyContent:"center",
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
