import { useEffect, useState } from "react";

/**
 * 배열을 넣으면 배열을 섞은 결과를 반환함
 * @param array 아무거나 배열 타입
 * @returns 배열 타입, array를 섞은 것
 */
const useShuffle = <T>(array: T[]) => {
  const [shuffledArray, setShuffledArray] = useState<T[]>(array);
  useEffect(() => {
    setShuffledArray(shuffledArray.sort(() => Math.random() - 0.5));
  }, [array]);

  return shuffledArray;
};
export default useShuffle;
