import { View, Text, Image } from "react-native";
import { Platform } from "react-native";
import useCachedResources from "../../hooks/useCachedResources";
import { BtnContainer } from "../../styles/globalStyles";
import styled, { css } from "styled-components/native";
import { IWord } from "../../types/types";

/**
 * 문제 중에 사용되는 미니 단어 카드
 * @param word 단어 정보
 * @param isFront 카드가 앞면인지. 그림이 앞면, 물음표가 뒷면
 */

interface OXCardProps {
  word: IWord;
  isFront: boolean;
  onPress: () => void;
}

const OXCard = (props: OXCardProps) => {
  const isLoaded = useCachedResources();

  if (isLoaded) {
    return (
      <CardContainer $isFront={props.isFront} onPress={props.onPress}>
        {props.isFront ? (
          <PictureImage source={require("../../assets/card/OXCard/O.png")} resizeMode="contain" />
        ) : (
          <PictureImage source={require("../../assets/card/OXCard/X.png")} resizeMode="contain" />
        )}
      </CardContainer>
    );
  } else {
    return null;
  }
};

export default OXCard;

//전체 카드 컨테이너
const CardContainer = styled(BtnContainer)<{ $isFront: boolean }>`
  height: 20%;
  background-color: white;
  aspect-ratio: 1;
  border-radius: 30px;
  ${Platform.select({
    ios: css`
      shadow-color: black;
      shadow-offset: {
	    width: 0,
	    height: 2,
      };
      shadow-opacity: 0.5;
      shadow-radius: 10;
    `,
    android: css`
      elevation: 5;
    `,
  })}
`;

//원래 카드의 이미지
const PictureImage = styled.Image`
  width: 100px;
  height: 100px;
`;
