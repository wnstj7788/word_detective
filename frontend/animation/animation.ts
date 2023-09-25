import { Animated } from "react-native";

//LetterGame1의 shakeAnimation
export const shakeAnimation1 = (
  index: number,
  shakeAnimations: { [key: number]: Animated.Value }
) => {
  Animated.sequence([
    Animated.timing(shakeAnimations[index], { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(shakeAnimations[index], {
      toValue: -10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimations[index], {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimations[index], { toValue: 0, duration: 50, useNativeDriver: true }),
  ]).start();
};

//LetterGame2의 shakeAnimation
export const shakeAnimation2 = (index: number, animValues: Animated.Value[]) => {
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
