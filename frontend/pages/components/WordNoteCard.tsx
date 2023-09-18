import React from "react";
import { Text, FlatList } from "react-native";
import { BtnContainer } from "../../styles/globalStyles";
import styled from "styled-components/native";
import { IStage } from "../../types/types";

const WordNoteCard = () => {
  const wordList = ["사과", "오렌지", "수박", "토마토", "체리", "바나나", "딸기", "멜론"];

  return (
    <FlatList
      horizontal={true}
      data={wordList}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <CardContainer>
          <Text>{item}</Text>
        </CardContainer>
      )}
      ItemSeparatorComponent={() => <Gap />}
    />
  );
};

export default WordNoteCard;

const CardContainer = styled(BtnContainer)`
  width: 150px;
  height: 100%;
  background-color: white;
  border-radius: 30px;
  flex-direction: row;
`;

const Gap = styled.View`
  width: 15px;
`;
