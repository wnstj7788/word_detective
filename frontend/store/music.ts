import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
    name: "music",
    initialState: {
        currentMusic: null, // 현재 재생 중인 음악 파일 경로
    },
    reducers: {
        setCurrentMusic: (state, action) => {
            console.log(action.payload);
            state.currentMusic = action.payload;
            console.log(state.currentMusic);
        },
    },
});

export const { setCurrentMusic } = musicSlice.actions;

export default musicSlice.reducer;