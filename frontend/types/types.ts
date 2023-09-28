//유저 정보
export interface IUser {
  userId: number; //UUID
  picture: number; //그림 맞추기 클리어 정보
  word: number; //단어 맞추기 클리어 정보
  letter: number; //단어 나누기 클리어 정보
}

//단어 정보
export interface IWord {
  id: number;
  name: string;
  imgSrc: string;
  index?: number;
}

//단어 스테이지 정보
export interface IStage {
  word: IWord;
  clear: boolean; //스테이지 클리어 여부
}

//단어 카드 타입(빈칸 표시용)
export interface ICard {
  pictureHidden: boolean; //그림이 빈칸인가
  wordHidden: boolean; //글씨가 빈칸인가
  wordHiddenIndx: number; //글씨가 빈칸이라면 몇번째 글씨가?
}
