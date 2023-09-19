import styled from "styled-components/native";

//전체 컨테이너 스타일
const centerStyles = `
  flex: 1;
  justify-content: center;
  align-items: center;
`;

//전체 컨테이너
export const Container = styled.View`
  ${centerStyles}
`;

//전체 버튼컨테이너(컴포넌트 용)
export const BtnContainer = styled.TouchableOpacity`
  ${centerStyles}
`;

//전체 컨테이너의 배경 이미지
export const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

//메뉴 버튼(홈 화면과 로비 화면에)
export const MenuBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: #f3ca85;
  border: 10px solid #fef8df;
  border-radius: 20px;
  margin: 10px;
`;


