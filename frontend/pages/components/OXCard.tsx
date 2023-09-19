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
const OXCard = (props: { word: IWord; isFront: boolean }) => {
  const isLoaded = useCachedResources();

  //test용
  //   function getImage(name: string): any {
  //     switch (name) {
  //       case "사과":
  //         return require("../../assets/card/OXCard/O.png");
  //       case "오렌지":
  //         return require("../../assets/card/OXCard/X.png");
  //     }
  //   }

  //TODO: 이미지 소스는 임시로 getImage 사용, 추후 변경해야
  if (isLoaded) {
    return (
      <CardContainer $isFront={props.isFront}>
        {props.isFront ? (
          // <PictureImage source={require("../../assets/card/fruit/apple.png")} />
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
  width: 135px;
  max-height: 135px;
  background-color: white;
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
