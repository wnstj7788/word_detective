import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./music";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    music: musicReducer,
    user: userReducer,
  },
});

export default store;

//리덕스 관련 타입
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
