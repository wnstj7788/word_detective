import { IWord, IStage, IUser } from "../types/types";

export const initialWord: IWord = {
  id: 0,
  name: "",
  url: "",
};

export const initialStage: IStage = {
  word: initialWord,
  clear: false,
};

export const initialUser: IUser = {
  id: 0,
  picture: -1,
  word: -1,
  letter: -1,
  cameraPicture: 0,
  cameraWord: 0,
  cameraLetter: 0,
};
