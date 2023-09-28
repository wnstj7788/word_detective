import { IWord, IStage, IUser } from "../types/types";

export const initialWord: IWord = {
  name: "",
  imgSrc: "",
};

export const initialStage: IStage = {
  word: {
    name: "",
    imgSrc: "",
  },
  clear: false,
};

export const initialUser: IUser = {
  userId: 0,
  picture: -1,
  word: -1,
  letter: -1,
};
