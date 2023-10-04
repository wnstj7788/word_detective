import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Audio } from "expo-av"; // Audio 타입을 사용하기 위해 import

// Audio.Sound 타입 또는 null을 나타내는 인터페이스 정의
interface MusicState {
  //   currentMusic: Audio.Sound | null;
  currentMusicName: string;
  isPlaying: boolean;
  isMuted: boolean;
}

// 초기 상태 객체 생성
const initialState: MusicState = {
  //   currentMusic: null,
  currentMusicName: "",
  isPlaying: false,
  isMuted: false,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    // setCurrentMusic: (state, action) => {
    //   state.currentMusic = action.payload;
    // },
    setCurrentMusicName: (state, action) => {
      state.currentMusicName = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setIsMuted: (state, action) => {
      state.isMuted = action.payload;
    },
  },
});

export default musicSlice.reducer;
export const { setCurrentMusicName, setIsPlaying, setIsMuted } = musicSlice.actions;
