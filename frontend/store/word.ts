import { createSlice } from "@reduxjs/toolkit";
import { IWord } from "../types/types";
import { CATEGORY } from "../common/const";

//카테고리 목록이 추가됨에 따라 동적으로 작동하도록
//제너릭으로 구성
// { fruit: IWord[]; animal: IWord[]; thing: IWord[] } 와 같음
// interface IWordList {
//   value: Record<string, IWord[]>;
// }
// const initialState: IWordList = {
//   value: {},
// };
// Object.values(CATEGORY).map(category => {
//   // 각 카테고리에 대한 빈 배열을 추가
//   initialState.value[category] = [];
// });

interface IWordList {
  value: IWord[];
}

const initialState: IWordList = {
  value: [],
};

export const wordListSlice = createSlice({
  name: "wordList",
  initialState,
  reducers: {
    /**
     * category를 key, data를 value로 넣어줌
     * @param state
     * @param action category와 data로 구성됨
     */
    // setCategoryData: (state, action) => {
    //   const { category, data } = action.payload;
    //   state.value[category] = data;
    // },
    // setFruit: (state, action) => {
    //   state.value.fruit = action.payload;
    // },
    // setAnimal: (state, action) => {
    //   state.value.animal = action.payload;
    // },
    // setThing: (state, action) => {
    //   state.value.thing = action.payload;
    // },
    setData: (state, action) => {
      state.value = action.payload;
    },
    pushData: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

//reducer 전체를 export
export default wordListSlice.reducer;
//개별 action 사용을 위한 export
export const { setData, pushData } = wordListSlice.actions;
