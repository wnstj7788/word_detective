import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./music";

const store = configureStore({
    reducer: {
        music: musicReducer,
    },
});

export default store;