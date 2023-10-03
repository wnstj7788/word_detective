import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const musicSlice = createSlice({
    name: "music",
    initialState: {
        currentMusicPath: null, // 파일 경로만 저장
    },
    reducers: {
        setCurrentMusicPath: (state, action) => {
            state.currentMusicPath = action.payload;
        },
    },
});

export const { setCurrentMusicPath } = musicSlice.actions;
export const selectCurrentMusicPath = (state) => state.music.currentMusicPath;
export const selectCurrentMusic = state => state.music.currentMusic;
export default musicSlice.reducer;
