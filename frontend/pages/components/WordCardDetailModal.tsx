import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface WordCardDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  item: string;
}

const WordCardDetailModal: React.FC<WordCardDetailModalProps> = ({ isVisible, onClose, item }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
        <Text>{item}</Text>

        <TouchableOpacity onPress={onClose}>
          <Text>닫기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WordCardDetailModal;
