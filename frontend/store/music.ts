    import { createSlice } from "@reduxjs/toolkit";

    const musicSlice = createSlice({
        name: "music",
        initialState: {
            currentMusic: null, // 디폴트 기본 음악 만들기
        },
        reducers: {
            setCurrentMusic: (state, action) => {
                state.currentMusic = action.payload;
            },
        },
    });

    export const { setCurrentMusic } = musicSlice.actions;

    export const selectCurrentMusic = (state) => {
        return state.music.currentMusic;
    };

    export default musicSlice.reducer;
