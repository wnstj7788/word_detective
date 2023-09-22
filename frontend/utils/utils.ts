//여러 곳에서 재사용 하는 각종 유틸 함수들

/**
 * 배열을 넣으면 배열을 섞은 결과를 반환함
 * @param array 아무거나 배열 타입
 * @returns 배열 타입, array를 섞은 것
 */
export const shuffleArray = <T>(array: T[]) => {
  return array.sort(() => Math.random() - 0.5);
};
