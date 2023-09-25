import { Animated } from "react-native";

//LetterGame2의 shakeAnimation
export const shakeAnimation = (index: number, animValues: Animated.Value[]) => {
  const rotate = animValues[index];
  Animated.sequence([
    Animated.timing(rotate, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(rotate, {
      toValue: -1,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(rotate, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(rotate, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]).start();
};
