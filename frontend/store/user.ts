import { createSlice } from "@reduxjs/toolkit";
import { initialUser } from "../common/initialType";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialUser },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

//reducer 전체를 export
export default userSlice.reducer;
//개별 action 사용을 위한 export
export const { login } = userSlice.actions;
