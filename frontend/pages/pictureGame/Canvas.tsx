import React, { useRef, useState, useCallback } from "react";
import { Dimensions, InteractionManager, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Svg, Path } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import styled from "styled-components/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type CanvasProps = {
  paths: string[];
  isClearButtonClicked: boolean;
};

const { height, width } = Dimensions.get("window");

const Canvas: React.FC = () => {
  const [paths, setPaths] = useState<string[]>([]);
  const [isClearButtonClicked, setClearButtonClicked] = useState<boolean>(false);
  const [capturedImageURI, setCapturedImageURI] = useState<string | null>(null);
  const svgRef = useRef<ViewShot>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isDrawing, setIsDrawing] = useState(false);

  const handleTouchStart = useCallback((event: any) => {
    setIsDrawing(true);
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const startPoint = `M${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    setPaths(prev => [...prev, startPoint]);
  }, []);

  const handleTouchMove = useCallback(
    (event: any) => {
      if (!isDrawing) return;
      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;
      // 그리기 영역을 벗어나면 선을 그리지 않음
      if (
        locationX < width * 0.18 ||
        locationY < height * 0.05 ||
        locationX > width * 0.9 ||
        locationY > height * 0.95
      ) {
        return;
      }

      const newPoint = `${locationX.toFixed(0)},${locationY.toFixed(0)} `;
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

  const captureSVG = () => {
    svgRef.current?.capture().then(uri => {
      setCapturedImageURI(uri);
    });
  };

  return (
    <Container>
      <ViewShotStyled ref={svgRef} options={{ format: "jpg", quality: 0.9 }}>
        <SvgContainer
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
        </SvgContainer>
      </ViewShotStyled>
      <ClearButton onPress={handleClearButtonClick}>
        <ClearButtonText>Clear</ClearButtonText>
      </ClearButton>
      {/* 미리보기 버튼 (확인용) */}
      {/* <CaptureButton onPress={captureSVG}>
        <CaptureButtonText>Capture SVG</CaptureButtonText>
      </CaptureButton>
      {capturedImageURI && (
        <ImageStyled source={{ uri: capturedImageURI }} />
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

const SvgContainer = styled.View`
  height: ${height * 0.7}px;
  width: ${width * 0.65}px;
  border-color: black;
  background-color: white;
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

const ClearButton = styled.TouchableOpacity`
  margin-top: 10px;
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

// const CaptureButton = styled.TouchableOpacity`
//   margin-top: 10px;
//   background-color: #007AFF;
//   padding-vertical: 10px;
//   padding-horizontal: 20px;
//   border-radius: 5px;
// `;

// const CaptureButtonText = styled.Text`
//   color: white;
//   font-size: 16px;
//   font-weight: bold;
// `;

const ViewShotStyled = styled(ViewShot)``;

const ImageStyled = styled.Image`
  width: 200px;
  height: 200px;
  margin-top: 20px;
`;
