import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./music"; // music 리듀서 파일 경로에 맞게 수정
import userReducer from "./user";
import wordListReducer from "./word";

const store = configureStore({
  reducer: {
    music: musicReducer,
    user: userReducer,
    wordList: wordListReducer,
  },
});

export default store;

//리덕스 관련 타입
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
