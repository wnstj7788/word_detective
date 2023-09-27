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
import styled from "styled-components/native";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { height, width } = Dimensions.get("window");
const customWidth = Dimensions.get("window").width;
// @ts-ignore
const Canvas = ({ word }) => {
  const [paths, setPaths] = useState([]);
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);
  const [capturedImageURI, setCapturedImageURI] = useState(null);
  const svgRef = useRef(null);
  const navigation = useNavigation<RootStackNavigationProp>();
  // @ts-ignore
  const handleTouchStart = useCallback(event => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const startPoint = `M${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    // @ts-ignore
    setPaths(prev => [...prev, startPoint]);
  }, []);

  // @ts-ignore
  const handleTouchMove = useCallback(event => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPoint = `${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    // @ts-ignore
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
    // @ts-ignore
    svgRef.current.capture().then(uri => {
      setCapturedImageURI(uri);
    });
  };

  return (
    <Container>
      <ViewShot ref={svgRef} options={{ format: "jpg", quality: 0.9 }}>
        <SVGContainer onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          <Svg height={height * 0.7} width={width}>
            <Textcontainer>
              <StyledText>{word.name}를 그려보세요</StyledText>
            </Textcontainer>
            <Path
              d={paths.join("")}
              stroke={isClearButtonClicked ? "transparent" : "black"}
              fill={"transparent"}
              strokeWidth={3}
              strokeLinejoin={"round"}
              strokeLinecap={"round"}
            />
          </Svg>
          <ClearButton onPress={handleClearButtonClick}>
            <ClearButtonText>Clear</ClearButtonText>
          </ClearButton>
        </SVGContainer>
      </ViewShot>
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
    </Container>
  );
};

export default Canvas;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SVGContainer = styled.View`
  height: ${height * 0.7}px;
  width: ${width * 0.65}px;
  border-color: black;
  background-color: #f8f4e8;
  border-width: 1px;
`;

const ClearButton = styled.TouchableOpacity`
  position: absolute;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: black;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;

const ClearButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const NextButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: black;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;

const StyledText = styled.Text`
  color: rgba(0, 0, 0, 0.2);
  font-size: 30px;
  font-weight: bold;
`;

const Textcontainer = styled.View`
  height: ${height * 0.7}px;
  width: ${width * 0.65}px;
  justify-content: center;

  opacity: 0.5;
  flex-direction: row;
`;
