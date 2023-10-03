//여러 곳에서 재사용 하는 각종 유틸 함수들

/**
 * 배열을 넣으면 배열을 섞은 결과를 반환함
 * @param array 아무거나 배열 타입
 * @returns 배열 타입, array를 섞은 것
 */
export const shuffleArray = <T>(array: T[]) => {
  return array.sort(() => Math.random() - 0.5);
};

/**
 * 난수 생성 함수
 * @param min 최솟값(포함)
 * @param max 최댓값(제외)
 * @returns min이상 max 미만의 난수(number타입)
 */
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
};
