import { createSlice } from "@reduxjs/toolkit";
import { IWord } from "../types/types";

interface IWordList {
  value: {
    fruit: IWord[];
    animal: IWord[];
    thing: IWord[];
  };
}

const initialState: IWordList = {
  value: {
    fruit: [],
    animal: [],
    thing: [],
  },
};

export const wordListSlice = createSlice({
  name: "wordList",
  initialState,
  reducers: {
    setFruit: (state, action) => {
      state.value.fruit = action.payload;
    },
    setAnimal: (state, action) => {
      state.value.animal = action.payload;
    },
    setThing: (state, action) => {
      state.value.thing = action.payload;
    },
  },
});

//reducer 전체를 export
export default wordListSlice.reducer;
//개별 action 사용을 위한 export
export const { setFruit, setAnimal, setThing } = wordListSlice.actions;
