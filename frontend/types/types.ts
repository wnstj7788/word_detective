//단어 정보
export interface IWord {
  name: string;
  imgSrc: string;
}

//단어 스테이지 정보
export interface IStage {
  word: IWord;
  clear: boolean; //스테이지 클리어 여부
}
